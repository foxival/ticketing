import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {NotFoundError, errorHandler, currentUser} from '@kcticket/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';


const app = express();

app.set('trust proxy', 1);

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV != 'test'
    })
);

//Init Middleware
const middlewareOption:any = {extended: false}
app.use(express.json(middlewareOption));

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
