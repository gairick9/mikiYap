import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/m09D0cq.gif')" }}
      ></div>

      {/* Glass Container */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-xl p-4 max-w-6xl w-full h-[calc(100vh-8rem)] backdrop-blur-lg border border-white border-opacity-20 mt-12">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
