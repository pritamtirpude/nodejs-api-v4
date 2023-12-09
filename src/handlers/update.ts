import { match } from "assert";
import prisma from "../db";

/**
 * GET ALL Updates
 */
export const getAllUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({
    data: updates,
  });
};

/**
 * GET Single Update
 */
export const getSingleUpdate = async (req, res) => {
  const singleUpdate = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    data: singleUpdate,
  });
};

/**
 * POST Create Update
 */
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    return res.json({ message: "nope" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });

  res.json({
    data: update,
  });
};

/**
 * PUT Update
 */
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({
      message: "No Update",
    });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({
    data: updatedUpdate,
  });
};

/**
 * DELETE Update
 */
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({
      message: "No Update",
    });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    data: deleted,
  });
};
