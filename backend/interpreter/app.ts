import express, { Express } from 'express';
import cors from "cors";
import routes from './routes';

const router: Express = express();

const normalizePort = (val: any) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const PORT = normalizePort(process.env.PORT || '4000');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/', routes);

router.listen(PORT);
console.log(`Running interpreter.ts at https://mayonnaise-ws.onrender.com:${PORT}/interpreter'`);