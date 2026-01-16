import { useState } from "react";
import Modal from "./Modal";

export default function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const submit = () => {
    if (!form.name || !form.price) return;
    onAdd({ ...form, price: Number(form.price) });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add Product</h2>

      <input
        className="w-full border rounded-lg px-3 py-2 mb-3"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        className="w-full border rounded-lg px-3 py-2 mb-3"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        className="w-full border rounded-lg px-3 py-2 mb-4"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="border px-4 py-2 rounded-lg">
          Cancel
        </button>
        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </Modal>
  );
}
