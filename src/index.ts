import express, { NextFunction, Request, Response } from "express";
import { ProductServiceClient } from "./ProductService/productServiceClient.js";
import { CartServiceClient } from "./cartService/cartServiceClient.js";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import path from "path";
import { errorHandler } from "./Middleware/errorHandler.js";

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
    (err, response) => {
      if (err) throw err;
      return res.status(200).send(response!.product);
    }
  );
});

app.get("/product/:productID", (req: Request, res: Response) => {
  const { productID } = req.params;

  try {
    ProductServiceClient.viewProductById(
      {
        productUUID: productID,
      },
      (err, response) => {
        if (err) throw err;
        return res.status(200).send(response);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
});

// app.post("/order", (req: Request, res: Response) => {
//   const { customerID, orderDetails } = req.body;

//   OrderServiceClient.createOrder(
//     {
//       customerID,
//       orderDetails,
//     },
//     (err, response) => {
//       if (err) throw err;
//       console.log("order received");
//       return res.status(200).send({
//         message: "order received",
//       });
//     }
//   );
// });

app.get("/products/:pageNum", (req: Request, res: Response) => {
  const { pageNum } = req.params;

  ProductServiceClient.viewProducts(
    {
      pageNum: parseInt(pageNum),
    },
    (err, response) => {
      if (err) throw err;
      return res.send(response);
    }
  );
});

app.post("/addToCart", (req: Request, res: Response, next: NextFunction) => {
  const { customerID, productUUID, productQuantity } = req.body;

  CartServiceClient.addToCart(
    {
      productUUID,
      customerID,
      productQuantity,
    },
    (err, response) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send({
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
    (err, response) => {
      if (err) throw err;
      return res.status(200).send(response);
    }
  );
});

app.delete("/cartItem", (req: Request, res: Response) => {
  const { customerID, productUUID } = req.body;

  CartServiceClient.removeCartItem(
    {
      customerID,
      productUUID,
    },
    (err, response) => {
      if (err) throw err;

      return res.status(200).send({
        productUUID: response!.productUUID,
      });
    }
  );
});

app.put("/cartItem", (req: Request, res: Response, next: NextFunction) => {
  const { customerID, productUUID, productQuantity } = req.body;

  CartServiceClient.updateCartItemQuantity(
    {
      customerID,
      productQuantity,
      productUUID,
    },
    (err, response) => {
      if (err) return next(err);
      return res.status(200).send(response);
    }
  );
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
