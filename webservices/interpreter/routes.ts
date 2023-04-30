import express from 'express';
import controller from './controller';
const router = express.Router();

router.post("/interpreter", (req, res, next) => controller.interpreter);
// router.post("/api/interpreter", (req, res, next) => controller.interpreter);
router.post("/api/interpreter", (req, res, next) =>
    controller.interpreter(req, res, next)
);
router.get("*", (req, res, next) => {
    console.log('connection attempt')
    res.status(404).json({ message: 'error 404' })
})

export = router;