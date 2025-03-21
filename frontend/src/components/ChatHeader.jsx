import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online indicator */}
          <div className="avatar relative">
            <div className="size-12 rounded-full border-2 border-white dark:border-zinc-700 shadow-sm overflow-hidden">
              <img
                src={selectedUser.profilePic || '/avatar.png'}
                alt={selectedUser.fullname}
                className="object-cover w-full h-full"
              />
              {isOnline && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-white dark:ring-zinc-800 animate-pulse"
                />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-zinc-800 dark:text-zinc-100">
              {selectedUser.fullname}
            </h3>
            <p
              className={`text-sm flex items-center gap-1.5 ${
                isOnline
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  isOnline ? 'bg-green-500' : 'bg-zinc-400'
                }`}
              ></span>
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="size-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Close chat"
        >
          <X className="size-5 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
