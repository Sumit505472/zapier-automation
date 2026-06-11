import express from 'express';
import {userRouter} from './router/user.js';
import {zapRouter} from './router/zap.js';
import {actionRouter} from './router/action.js'
import {triggerRouter} from './router/trigger.js'
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/zap', zapRouter);
app.use('/api/v1/trigger', triggerRouter);
app.use('/api/v1/action', actionRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});