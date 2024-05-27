import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

import {authRouter} from "./src/routes/authorizationRouter.js";
import {hubRouter} from "./src/routes/hubRouter.js";
import {pathRouter} from "./src/routes/pathRouter.js";
import {shipmentRouter} from "./src/routes/shipmentRouter.js";
import {userRouter} from "./src/routes/userRouter.js";

const app = express();

process.env.TZ = "Europe/Greenwich";

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use("/auth", authRouter)
app.use("/hub", hubRouter)
app.use("/path", pathRouter)
app.use("/shipment", shipmentRouter)
app.use("/user", userRouter)


app.listen(5000, (error) => {
    if (error) {
        return console.error(error.message);
    }

    console.info(`Сервер почав роботу на http://localhost 5000`);
});

app.use('*', (_req, res) => {
    res.status(404).json({ error: 'Направильний шлях запиту' });
});


