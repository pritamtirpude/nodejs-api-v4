import { Router } from "express";
import { body, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getSingleUpdate,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.get("/product/:id", getSingleProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getAllUpdates);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.get("/update/:id", getSingleUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
