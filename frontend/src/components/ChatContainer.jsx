import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeletons/MessageSkeleton';

const ChatContainer = () => {
  const { messages, getMessagers, isMessagesLoading, selectedUser } =
    useChatStore();
  useEffect(() => {
    getMessagers(selectedUser._id);
  }, [selectedUser._id, getMessagers]);
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>messages...</p>
      <MessageInput />
    </div>
  );
};
export default ChatContainer;
