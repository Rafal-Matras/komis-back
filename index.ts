import express from 'express';
import cors from 'cors';

import {config} from "./config/config";
import {userRouter} from "./routers/user";
import {loginRouter} from "./routers/login";
import {carsRouter} from "./routers/cars";
import {branchRouter} from "./routers/branch";

const {corsOrigin, port, hostName} = config
const app = express();

app.use(express.json());
app.use(cors({
    origin: corsOrigin,
}))

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/cars', carsRouter);
app.use('/branches', branchRouter)

app.listen(port, hostName, () => {
    console.log(`server start on http://${hostName}:${port}`);
});
