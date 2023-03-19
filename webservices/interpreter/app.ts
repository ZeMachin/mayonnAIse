import express, { Express } from 'express';
import cors from "cors";
import routes from './routes';

const PORT = 4000;
const router: Express = express();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/', routes);

router.listen(PORT);
console.log(`Running interpreter.js at http://localhost:${PORT}/interpreter'`);