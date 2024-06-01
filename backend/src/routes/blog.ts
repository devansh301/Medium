import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@devanshrawat789/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use( "*" ,async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", `${user.id}`);
    await next();
  } else {
    c.status(403);
    return c.json({
      error: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Wrong Inputs",
      })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error" });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Wrong Inputs",
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get("userId");
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error" });
  }
});

// Todo: Add pagenation
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
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
    });
    return c.json(blogs);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error" });
  }
});
