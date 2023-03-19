import express from 'express';
import controller from './controller';
const router = express.Router();

router.post("/interpreter", (req, res, next) => controller.interpreter);

export = router;