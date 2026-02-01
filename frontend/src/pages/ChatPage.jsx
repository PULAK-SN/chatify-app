import { useChatStore } from "../store/useChatStore";
import {
  ProfileHeader,
  ActivetTabSwitch,
  ChatsList,
  ContactList,
  BorderAnimatedContainer,
  ChatConteiner,
  NoConversationPlaceholder,
} from "../components";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-900/30 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActivetTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatConteiner /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
