import express, { Application, Request, Response } from 'express';
import Connection from '../src/connection'
import HttpError from './http-error';
// import * as cors from "cors";
var cors = require('cors')
import GameRouter from './routers/GameRouter'
import LatterRouter from './routers/LatterRouter';



const application: Application = express();

application.use(cors({
    origin: "http://localhost:3000"
}));

application.use(express.json());

application.use(GameRouter);
application.use(LatterRouter);

application.listen(5000, () => console.log('Server running on port 5000'));