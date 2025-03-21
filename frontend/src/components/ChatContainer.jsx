import { useChatStore } from '../store/useChatStore';
import { useEffect, useRef } from 'react';

import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const {
    messages,
    getMessagers,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagers(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessagers,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-6 rounded-lg bg-white dark:bg-zinc-800 shadow-sm max-w-md mx-auto">
              <div className="text-zinc-400 dark:text-zinc-500 mb-2 text-xl">
                👋
              </div>
              <h3 className="font-medium text-zinc-700 dark:text-zinc-300">
                Start a conversation
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Send a message to begin chatting with {selectedUser.fullname}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isUserMessage = message.senderId === authUser._id;
            const showAvatar =
              index === 0 || messages[index - 1].senderId !== message.senderId;

            return (
              <div
                key={message._id}
                className={`chat ${isUserMessage ? 'chat-end' : 'chat-start'}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {showAvatar && (
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
                      <img
                        src={
                          isUserMessage
                            ? authUser.profilePic || '/avatar.png'
                            : selectedUser.profilePic || '/avatar.png'
                        }
                        alt="profile pic"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
                <div className="chat-header mb-1">
                  <time className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div
                  className={`chat-bubble flex flex-col ${
                    isUserMessage
                      ? 'bg-indigo-600 text-white dark:bg-indigo-700'
                      : 'bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 shadow-sm'
                  }`}
                >
                  {message.image && (
                    <div className="rounded-md mb-2 overflow-hidden shadow-md">
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[300px] w-full object-cover"
                      />
                    </div>
                  )}
                  {message.text && (
                    <p className="leading-relaxed">{message.text}</p>
                  )}
                </div>
                <div className="chat-footer opacity-70 text-xs flex gap-1 mt-1">
                  {isUserMessage && message.read && <span>Seen</span>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
