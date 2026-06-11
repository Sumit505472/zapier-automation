import { Router } from 'express';
import { authMiddleware } from '../middleware.js';
import { SignupSchema, SigninSchema } from '../types/index.js';
import { prisma } from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
const router = Router();
router.post('/signup', async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Invalid  input data",
        });
    }
    const userExists = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        });
    }
    await prisma.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    //await sendVerificationEmail(parsedData.data.username);
    return res.json({
        message: "please verify your email to complete the signup process"
    });
});
router.post('/signin', async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Invalid  input data",
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        return res.status(403).json({
            message: "Invalid username or password"
        });
    }
    const token = jwt.sign({
        id: user.id,
    }, process.env["JWT_SECRET"], {
        expiresIn: "24h"
    });
    return res.json({
        token
    });
});
router.get('/', authMiddleware, async (req, res) => {
    console.log(req.id);
    console.log(req.headers.authorization);
    if (req.id === undefined) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const id = req.id;
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user
    });
});
export const userRouter = router;
//# sourceMappingURL=user.js.map