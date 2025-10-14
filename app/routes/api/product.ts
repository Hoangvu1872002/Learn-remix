import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader = async () => {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return json({ products });
};
