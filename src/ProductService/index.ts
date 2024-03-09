import * as grpc from "@grpc/grpc-js";
import { productDB } from "./db.js";
import { productTable } from "./productSchema.js";
import { productPackage } from "./productPackage.js";
import { InventoryServiceClient } from "../InventoryService/inventoryServiceClient.js";
import crypto from "crypto";
import { ViewProductsRequest__Output } from "./proto/product/ViewProductsRequest.js";
import { ProductList__Output } from "./proto/product/ProductList.js";
import {
  ViewProductByIdResponse,
  ViewProductByIdResponse__Output,
} from "./proto/product/ViewProductByIdResponse.js";
import { ProductServiceHandlers } from "./proto/product/ProductService.js";
import { GetProductInventoryResponse__Output } from "../InventoryService/proto/inventory/GetProductInventoryResponse.js";
import { ViewProductByIdRequest__Output } from "./proto/product/ViewProductByIdRequest.js";
import { ViewProductsByIdRequest__Output } from "./proto/product/ViewProductsByIdRequest.js";
import { ProductRequest__Output } from "./proto/product/ProductRequest.js";
import { ProductResponse__Output } from "./proto/product/ProductResponse.js";

const server = new grpc.Server();

const viewProducts = async (
  call: grpc.ServerUnaryCall<ViewProductsRequest__Output, ProductList__Output>,
  callback: grpc.sendUnaryData<ProductList__Output>
) => {
  const { pageNum } = call.request;

  const productList = await productDB
    .select()
    .from(productTable)
    .limit(10)
    .offset(pageNum * 10);

  callback(null, {
    productList: productList.map((product) => {
      return {
        productUUID: product.productUUID,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productName: product.productName,
        productImage: product.productImage!,
      };
    }),
  });
};

const viewProductsById = async (
  call: grpc.ServerUnaryCall<
    ViewProductsByIdRequest__Output,
    ProductList__Output
  >,
  callback: grpc.sendUnaryData<ProductList__Output>
) => {
  const { productUUID } = call.request;

  if (productUUID!.length > 0) {
    const products = await productDB.query.productTable.findMany({
      where: (product, { inArray }) =>
        //@ts-ignore
        inArray(product.productUUID, productUUID),
    });
    callback(null, {
      productList: products.map((product) => {
        return {
          productUUID: product.productUUID,
          productDescription: product.productDescription,
          productPrice: product.productPrice,
          productName: product.productName,
          productImage: product.productImage!,
        };
      }),
    });
  } else {
    callback(null, {
      productList: [],
    });
  }
};

const viewProductById = async (
  call: grpc.ServerUnaryCall<
    ViewProductByIdRequest__Output,
    ViewProductByIdResponse__Output
  >,
  callback: grpc.sendUnaryData<ViewProductByIdResponse>
) => {
  const { productUUID } = call.request;

  const targetProduct = await productDB.query.productTable.findFirst({
    //@ts-ignore
    where: (product, { eq }) =>
      //@ts-ignore
      eq(product.productUUID, productUUID),
  });

  InventoryServiceClient.getProductInventory(
    {
      productUUID,
    },
    (err, response) => {
      if (err) throw err;

      callback(null, {
        product: targetProduct,
        stocksLeft: response!.productQuantity,
        stocksStatus: response!.productStatus,
      });
    }
  );
};

const addProduct = async (
  call: grpc.ServerUnaryCall<ProductRequest__Output, ProductResponse__Output>,
  callback: grpc.sendUnaryData<ProductResponse__Output>
) => {
  const { productName, productDescription, productPrice, productImage } =
    call.request;

  console.log(productImage);
  const productUUID = crypto.randomUUID();

  const addedProduct = await productDB
    .insert(productTable)
    .values({
      productName,
      productDescription,
      productPrice,
      productUUID,
      productImage,
    })
    .returning();

  InventoryServiceClient.addToInventory(
    {
      productUUID: addedProduct[0].productUUID,
    },
    (err, response) => {
      if (err) throw err;
      console.log(response);
    }
  );

  callback(null, {
    productId: addedProduct[0].productID,
    product: addedProduct[0],
    productUUID,
  });
};
server.addService(productPackage.ProductService.service, {
  addProduct,
  viewProducts,
  viewProductsById,
  viewProductById,
} as ProductServiceHandlers);

server.bindAsync(
  "localhost:5008",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;

    console.log("ProductService Running");
    server.start();
  }
);
