import express from 'express';
import { prisma } from './lib/prisma.js';

const app = express();


app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;

  await prisma.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
        data:{
            zapId,
            metaData: body
        }
    });
    await tx.zapRunOutbox.create({
        data:{
            zapRunId: run.id
        }
    })
  });

  res.status(202).json({ success: true });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
