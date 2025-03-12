process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import express from "express";
import cors from "cors"

const app=express();

app.use(cors({
    origin:"*"
}));


app.use(express.json());


export default app;