import { useState } from "react";
import Modal from "../../components/TableModal/Modal";
import { Upload } from "lucide-react";
import CustomerInput from "../../components/CustomerInput";

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
      {/* Add product */}
      <div className="p-4 bg-gray-100 min-w-5xl">
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT: PRODUCT IMAGE */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-xl p-4">
              <h3 className="font-semibold mb-3">Product Image</h3>
              <div className="relative rounded-xl overflow-hidden bg-gray-200 h-56 flex items-center justify-center">
                <img
                  src="../../../public/images/profile.png"
                  alt="product"
                  className="object-contain h-full"
                />

                <div className="absolute flex flex-col gap-2">
                  <button className="bg-white px-4 py-1 rounded shadow">
                    Replace
                  </button>
                  <button className="bg-white text-red-500 px-4 py-1 rounded shadow">
                    Remove
                  </button>
                </div>
              </div>

              <button className="mt-4 px-2 py-2 bg-gray-100 border shadow border-gray-200 rounded flex items-center gap-2 text-sm">
                <Upload className="w-4 h-4" />
                Add Another Image
              </button>
            </div>
          </div>

          {/* RIGHT: GENERAL INFO */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* GENERAL INFORMATION */}
            <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">General Information</h3>
              </div>

              <div className="space-y-4">
                <CustomerInput
                  type="text"
                  label="product name"
                  i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  placeholder="Product Name"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">Product type</span>
                    <select
                      className="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                    >
                      <option className="">Phone</option>
                      <option className="px-2 py-2">Phone</option>
                    </select>
                  </div>
                  <CustomerInput
                    type="text"
                    label="product tag"
                    placeholder="Type and enter"
                    i_class="w-full mb-3 pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <CustomerInput
                    type="text"
                    label="price"
                    defaultValue="$100.00"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  />
                  <CustomerInput
                    type="text"
                    label="discount"
                    defaultValue="20%"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  />
                  <CustomerInput
                    type="text"
                    label="discount price"
                    defaultValue="$80.00"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  />
                </div>

                <textarea
                  maxLength={200}
                  className="border rounded-xl px-3 py-2 w-full min-h-50 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  placeholder="Description"
                />

                <div className="grid grid-cols-2 gap-4">
                  <CustomerInput
                    type="date"
                    label="expiration date"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  />
                  <CustomerInput
                  defaultValue={1}
                    min={1}
                    max={1000}
                    type="number"
                    label="stock"
                    i_class="w-full pl-4 pr-4 py-2.5 bg-gray-100 border border-gray-300
            rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Btn function */}
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
