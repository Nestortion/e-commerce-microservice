import * as grpc from "@grpc/grpc-js";
import { productDB } from "./db.js";
import { productTable } from "./productSchema.js";
import { productPackage } from "./productPackage.js";
import { InventoryServiceClient } from "../InventoryService/inventoryServiceClient.js";
import {
  GetProductInventoryResponse,
  InventoryResponse,
} from "../InventoryService/inventory.pb.js";
import crypto from "crypto";
import { ProductUUID, ViewProductsRequest } from "./product.pb.js";

const server = new grpc.Server();

const viewProducts = async (call: any, callback: Function) => {
  const { pageNum } = call.request as ViewProductsRequest;

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
        productImage: product.productImage,
      };
    }),
  });
};

const viewProductsById = async (call: any, callback: Function) => {
  const { productUUID } = call.request as ProductUUID;

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
          productImage: product.productImage,
        };
      }),
    });
  } else {
    callback(null, {
      productList: [],
    });
  }
};

const viewProductById = async (call: any, callback: Function) => {
  const { productUUID } = call.request as ProductUUID;

  const targetProduct = await productDB.query.productTable.findFirst({
    //@ts-ignore
    where: (product, { eq }) =>
      //@ts-ignore
      eq(product.productUUID, productUUID[0] as string[]),
  });

  InventoryServiceClient.getProductInventory(
    {
      productUUID,
    },
    (err: Error, response: GetProductInventoryResponse) => {
      if (err) throw err;

      callback(null, {
        product: targetProduct,
        stocksLeft: response.productQuantity,
        stocksStatus: response.productStatus,
      });
    }
  );
};

const addProduct = async (call: any, callback: Function) => {
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
    (err: Error, response: InventoryResponse) => {
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
//@ts-ignore
server.addService(productPackage.ProductService.service, {
  addProduct,
  viewProducts,
  viewProductsById,
  viewProductById,
});

server.bindAsync(
  "localhost:5008",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;

    console.log("ProductService Running");
    server.start();
  }
);
