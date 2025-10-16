// app/routes/products/$id.tsx
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Loader để lấy chi tiết sản phẩm
export const loader = async ({ params }: any) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  if (!product) throw new Response("Not Found", { status: 404 });
  return json({ product });
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Detail</h1>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <Link to="/products">← Back to Products</Link>
    </div>
  );
}
