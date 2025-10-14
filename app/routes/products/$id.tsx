import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Loader: lấy product theo id
export const loader = async ({ params }: any) => {
  const id = Number(params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Response("Not Found", { status: 404 });
  return json({ product });
};

// Action: update hoặc delete product từ trang detail
export const action = async ({ request, params }: any) => {
  const id = Number(params.id);
  const form = await request.formData();
  const _action = form.get("_action");

  if (_action === "update") {
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    await prisma.product.update({
      where: { id },
      data: { title, description },
    });
  } else if (_action === "delete") {
    await prisma.product.delete({ where: { id } });
    return redirect("/products");
  }

  return redirect(`/products/${id}`);
};

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Detail</h1>

      <Form method="post" style={{ marginBottom: 20 }}>
        <input name="title" defaultValue={product.title} required />
        <input name="description" defaultValue={product.description || ""} />
        <button type="submit" name="_action" value="update">
          Save
        </button>
        <button
          type="submit"
          name="_action"
          value="delete"
          style={{ marginLeft: 10 }}
        >
          Delete
        </button>
      </Form>

      <Link to="/products">← Back to products</Link>
    </div>
  );
}
