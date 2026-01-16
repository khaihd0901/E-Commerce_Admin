import Modal from "./Modal";

export default function ProductDetailModal({ product, onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Product Detail</h2>

      <p className="mb-2">
        <strong>Name:</strong> {product.name}
      </p>
      <p className="mb-2">
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-gray-100 px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
