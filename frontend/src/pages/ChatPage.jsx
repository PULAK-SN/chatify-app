import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <button
        className="absolute top-3 right-3 text-red-300 p-2 mb-4 border border-red-300 font-bold rounded-full bg-slate-900"
        onClick={logout}
      >
        Log out
      </button>
      <h2>Chatpage</h2>
    </div>
  );
};

export default ChatPage;
