import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Loader: lấy danh sách product
export const loader = async () => {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return json({ products });
};

// Action: thêm, sửa, xóa — trả về JSON thay vì redirect
export const action = async ({ request }: any) => {
  try {
    const form = await request.formData();
    const _action = String(form.get("_action") ?? "");

    if (_action === "create") {
      const title = String(form.get("title") ?? "").trim();
      const description = String(form.get("description") ?? "").trim();
      if (!title)
        return json(
          { success: false, error: "Title required" },
          { status: 400 },
        );
      await prisma.product.create({ data: { title, description } });
    } else if (_action === "update") {
      const id = Number(form.get("id"));
      const title = String(form.get("title") ?? "").trim();
      const description = String(form.get("description") ?? "").trim();
      await prisma.product.update({
        where: { id },
        data: { title, description },
      });
    } else if (_action === "delete") {
      const id = Number(form.get("id"));
      await prisma.product.delete({ where: { id } });
    }

    // trả về success; client sẽ gọi fetcher.load(...) để reload loader
    return json({ success: true });
  } catch (err: any) {
    console.error("action error:", err);
    return json({ success: false, error: String(err) }, { status: 500 });
  }
};

// Component React
export default function Products() {
  const { products: initialProducts } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  // local state quản lý danh sách (cập nhật từ loader qua fetcher)
  const [products, setProducts] = useState(initialProducts);

  // modal state
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

  // Khi fetcher trả về success (action hoàn thành) -> reload loader cho route hiện tại
  // Khi fetcher chứa loader data ({ products }) -> cập nhật state products
  useEffect(() => {
    const data = fetcher.data as any;
    if (!data) return;

    // Nếu action trả về success -> gọi load để lấy lại loader data cho route hiện tại
    // Chỉ gọi khi fetcher chưa đang load để tránh loop
    if (data.success) {
      if (fetcher.state !== "loading") {
        fetcher.load(window.location.pathname);
      }
      return;
    }

    // Nếu fetcher chứa products (khi load loader) -> cập nhật danh sách products
    if (data.products) {
      setProducts(data.products);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      {/* Form thêm product (dùng fetcher.Form để gọi action không redirect) */}
      <fetcher.Form method="post" style={{ marginBottom: 20 }}>
        <input name="title" placeholder="Title" required />
        <input name="description" placeholder="Description" />
        <button type="submit" name="_action" value="create">
          Add Product
        </button>
      </fetcher.Form>

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
            <fetcher.Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="id" value={p.id} />
              <input name="title" defaultValue={p.title} />
              <input name="description" defaultValue={p.description || ""} />
              <button type="submit" name="_action" value="update">
                ✏️
              </button>
            </fetcher.Form>

            <fetcher.Form
              method="post"
              style={{ display: "inline", marginLeft: 10 }}
            >
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                name="_action"
                value="delete"
                onClick={(e) => {
                  if (!confirm("Delete this product?")) e.preventDefault();
                }}
              >
                🗑️
              </button>
            </fetcher.Form>
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
            <fetcher.Form method="post">
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
            </fetcher.Form>

            {/* Form xóa trong modal */}
            <fetcher.Form method="post" style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={selectedProduct.id} />
              <button
                type="submit"
                name="_action"
                value="delete"
                onClick={(e) => {
                  if (!confirm("Delete this product?")) e.preventDefault();
                }}
              >
                Delete
              </button>
            </fetcher.Form>
          </div>
        </div>
      )}
    </div>
  );
}
