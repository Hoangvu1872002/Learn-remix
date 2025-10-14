import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Loader: lấy danh sách product
export const loader = async () => {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return json({ products });
};

// Action: thêm, sửa, xóa
export const action = async ({ request }: any) => {
  const form = await request.formData();
  const _action = form.get("_action");

  if (_action === "create") {
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    await prisma.product.create({ data: { title, description } });
  } else if (_action === "update") {
    const id = Number(form.get("id"));
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    await prisma.product.update({
      where: { id },
      data: { title, description },
    });
  } else if (_action === "delete") {
    const id = Number(form.get("id"));
    await prisma.product.delete({ where: { id } });
  }

  return redirect("/app/product");
};

// Component React
export default function Products() {
  const { products } = useLoaderData<typeof loader>();

  // React state để quản lý modal
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      {/* Form thêm product */}
      <Form method="post" style={{ marginBottom: 20 }}>
        <input name="title" placeholder="Title" required />
        <input name="description" placeholder="Description" />
        <button type="submit" name="_action" value="create">
          Add Product
        </button>
      </Form>

      {/* Danh sách product */}
      <ul>
        {products.map((p: any) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            {/* Click vào tên product mở modal */}
            <span
              onClick={() => openModal(p)}
              style={{ cursor: "pointer", fontWeight: "bold", marginRight: 10 }}
            >
              {p.title}
            </span>

            {/* Form sửa nhanh trong list */}
            <Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="id" value={p.id} />
              <input name="title" defaultValue={p.title} />
              <input name="description" defaultValue={p.description || ""} />
              <button type="submit" name="_action" value="update">
                ✏️
              </button>
            </Form>

            <Form method="post" style={{ display: "inline", marginLeft: 10 }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" name="_action" value="delete">
                🗑️
              </button>
            </Form>
          </li>
        ))}
      </ul>

      {/* Modal hiển thị chi tiết product */}
      {isModalOpen && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeModal}
        >
          <div
            style={{ background: "white", padding: 20, minWidth: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>

            {/* Form update trong modal */}
            <Form method="post">
              <input type="hidden" name="id" value={selectedProduct.id} />
              <input name="title" defaultValue={selectedProduct.title} />
              <input
                name="description"
                defaultValue={selectedProduct.description || ""}
              />
              <button type="submit" name="_action" value="update">
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                style={{ marginLeft: 10 }}
              >
                Close
              </button>
            </Form>

            {/* Form xóa trong modal */}
            <Form method="post" style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={selectedProduct.id} />
              <button type="submit" name="_action" value="delete">
                Delete
              </button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
