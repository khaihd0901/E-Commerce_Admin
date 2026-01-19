export default function Modal({ children, onClose, onSubmit }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 "
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 rounded-xl p-6 relative min-w-5xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-xl cursor-pointer"
        >
          ✕
        </button>
        {children}
      </form>
    </div>
  );
}
