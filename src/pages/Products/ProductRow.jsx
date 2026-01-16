export default function ProductRow({ product, onDelete, onView }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3">{product.name}</td>
      <td className="px-4 py-3">${product.price}</td>
      <td className="px-4 py-3 text-right space-x-3">
        <button
          onClick={() => onView(product)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
