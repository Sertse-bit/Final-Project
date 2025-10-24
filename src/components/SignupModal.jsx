export default function SignupModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md mt-2"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
