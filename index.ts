import express from 'express';
import cors from 'cors';

import {userRouter} from "./routers/user";
import {loginRouter} from "./routers/login";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use('/login', loginRouter)
app.use('/users', userRouter)

app.listen(3001, '0.0.0.0', () => {
    console.log('server start on http://localhost:3001');
})
