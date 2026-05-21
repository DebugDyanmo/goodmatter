import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paymentRouter from "./payment";
import postsRouter from "./posts";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(paymentRouter);
router.use(postsRouter);

export default router;
