import { Router } from 'express';
const router = Router();
import { authMiddleware } from '../middleware.js';
import { ZapCreateSchema } from '../types/index.js';

import { prisma } from '../lib/prisma.js';
router.post('/', authMiddleware, async (req, res) => {
  //@ts-ignore
  const id: string = req.id;


  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(400).json({ message: 'Invalid request data' });
  }
  const zapId = await prisma.$transaction(async tx => {
    const zap = await prisma.zap.create({
      data: {
        userId: parseInt(id),

        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index
          }))
        }
      }
    })
    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      }
    })

    await tx.zap.update({
      where: {
        id: zap.id
      },
      data: {
        triggerId: trigger.id
      }
    })
    return zap.id;
  })
   return res.json({
        zapId
    })





});

router.get('/', authMiddleware, async (req, res) => {
  const id = req.id;
  if (!id) {
    return res.status(400).json({ message: "Invalid user(unauthorised" })
  }
  const zaps = await prisma.zap.findMany({
    where: {
      userId: id
    },
    include: {
      actions: {
        include: {
          type: true
        }

      },
      trigger: {
        include: {
          type: true
        }
      }

    }

  })
  return res.json({
    zaps
  });
})



router.get('/:zapId', authMiddleware, async (req, res) => {

  const id = req.id;
  if (!id) {
    return res.status(400).json({
      message: "Invalid user(unauthorised)"
    })
  }
  const zapId = req.params.zapId;
  const zap = await prisma.zap.findFirst({
    where: {
      zapId: zapId,
      userId: id
    },
    include: {
      actions: {
        include: {
          type: true
        }
      },
      trigger: {
        include: {
          type: true
        }
      }
    }
  })
  return res.json(zap);

});
export const zapRouter = router;