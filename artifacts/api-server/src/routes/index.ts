import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paymentRouter from "./payment";
import postsRouter from "./posts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(paymentRouter);
router.use(postsRouter);

export default router;
