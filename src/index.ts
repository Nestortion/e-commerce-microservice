import express, { Request, Response } from "express";
import {
  ProductList,
  ProductResponse,
  ViewProductByIdResponse,
} from "./ProductService/product.pb.js";
import { ProductServiceClient } from "./ProductService/productServiceClient.js";
import { OrderServiceClient } from "./OrderService/orderServiceClient.js";
import { CartServiceClient } from "./cartService/cartServiceClient.js";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import path from "path";

const port = 5000;

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("ProductImages"));

app.post("/addProduct", (req: Request, res: Response) => {
  const { productName, productDescription, productPrice } = req.body;

  const productImage = req!.files!.productImage as UploadedFile;

  if (!productImage) throw new Error("not image uploaded");

  if (!productName || !productDescription || !productPrice)
    throw new Error("Invalid inputs!");

  productImage.mv(
    path.join(
      __dirname,
      "..",
      "ProductImages",
      `${productName}.${productImage.mimetype.split("/")[1]}`
    )
  );

  ProductServiceClient.addProduct(
    {
      productName,
      productDescription,
      productPrice,
      productImage: `${productName}.${productImage.mimetype.split("/")[1]}`,
    },
    (err: Error, response: ProductResponse) => {
      if (err) throw err;
      res.status(200).send(response.product);
    }
  );
});

app.get("/product/:productID", (req: Request, res: Response) => {
  const { productID } = req.params;

  try {
    ProductServiceClient.viewProductById(
      {
        productUUID: [productID],
      },
      (err: Error, response: ViewProductByIdResponse) => {
        if (err) throw err;
        res.status(200).send(response);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/order", (req: Request, res: Response) => {
  const { customerID, orderDetails } = req.body;

  OrderServiceClient.createOrder(
    {
      customerID,
      orderDetails,
    },
    (err: Error, response: any) => {
      if (err) throw err;
      console.log("order received");
      res.status(200).send({
        message: "order received",
      });
    }
  );
});

app.get("/products/:pageNum", (req: Request, res: Response) => {
  const { pageNum } = req.params;

  ProductServiceClient.viewProducts(
    {
      pageNum,
    },
    (err: Error, response: any) => {
      res.send(response);
    }
  );
});

app.post("/addToCart", (req: Request, res: Response) => {
  const { customerID, productUUID, productPrice, productQuantity } = req.body;

  CartServiceClient.addToCart(
    {
      productUUID,
      customerID,
      productPrice,
      productQuantity,
    },
    (err: Error, response: any) => {
      console.log("product added to cart");
      res.status(200).send({
        product: response,
      });
    }
  );
});

app.get("/viewCart/:customerID", (req: Request, res: Response) => {
  const { customerID } = req.params;
  CartServiceClient.viewCart(
    {
      customerID,
    },
    (err: Error, response: any) => {
      if (err) throw err;
      res.status(200).send(response);
    }
  );
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
