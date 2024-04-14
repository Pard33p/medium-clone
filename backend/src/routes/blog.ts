import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@pard33p/common-app";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>()

blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization')
    if (!jwt) {
        c.status(401)
        return c.json({ error: "Unauthorized" })
    }
    const token = jwt.split(' ')[1]
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
        c.status(401)
        return c.json({ error: "Unauthorized" })
    }
    c.set('userId', payload.id)
    await next()
})

blogRouter.post('/', async (c) => {
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const success = createPostInput.safeParse(body)
    if (!success) {
        c.status(400);
		return c.json({ error: "invalid input" })
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        id: post.id
    })
})

blogRouter.put('/', async (c) => {
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const success = updatePostInput.safeParse(body)
    if (!success) {
        c.status(400);
		return c.json({ error: "invalid input" })
    }
    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.text("Updated post")
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        where: {},
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                } 
            }
        }
    })
    return c.json({posts})
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const post = await prisma.post.findUnique({
        where: { id },
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                } 
            }
        }
    })
    return c.json({post})
})

