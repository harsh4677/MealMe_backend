import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get("/order", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurantOrders);
router.patch("/order/:orderId/status", jwtCheck, jwtParse, MyRestaurantController.updateOrderStatus);
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);
router.post("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.createMyRestaurant);
router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse,  MyRestaurantController.updateMyRestaurant);

export default router;

/* 
For the other HTTP methods (POST, GET, PUT), 
the target is the restaurant as a whole,
not a specific element within it. Hence,
no additional parameters like :orderId are required. 
When you create or update the restaurant, you're dealing with a
 single resource (the restaurant itself), and that's why the path remains simple. */