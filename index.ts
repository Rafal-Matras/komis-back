import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import {config} from './config/config';
import {userRouter} from './routers/user';
import {loginRouter} from './routers/login';
import {carsRouter} from './routers/car';
import {branchRouter} from './routers/branch';
import {consumerRouter} from './routers/consumer';
import {companyRouter} from './routers/company';

const {corsOrigin, port, hostName} = config;
const app = express();

app.use(express.json());
app.use(cors({
    origin: corsOrigin,
}));
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

app.use('/apikomis/login', loginRouter);
app.use('/apikomis/users', userRouter);
app.use('/apikomis/cars', carsRouter);
app.use('/apikomis/branches', branchRouter);
app.use('/apikomis/consumers', consumerRouter);
app.use('/apikomis/company', companyRouter);

app.listen(port, hostName, () => {
    console.log(`server start on http://${hostName}:${port}`);
});
