import { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users, Search } from 'lucide-react';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesOnline = showOnlineOnly
      ? onlineUsers.includes(user._id)
      : true;
    const matchesSearch = user.fullname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesOnline && matchesSearch;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-zinc-50 dark:bg-zinc-900">
      <div className="border-b border-base-300 w-full p-5 bg-zinc-50 dark:bg-zinc-900 shadow-sm">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold hidden lg:block text-zinc-800 dark:text-zinc-100">
            Contacts
          </span>
        </div>

        {/* Search Input */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-700 dark:text-gray-300 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-9 text-sm bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400"
            />
          </div>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Show online only
            </span>
          </label>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-indigo-500 dark:border-indigo-400'
                  : 'border-l-4 border-transparent'
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-white dark:border-zinc-800 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-white dark:ring-zinc-800 animate-pulse"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 transition-all">
              <div className="font-medium truncate text-zinc-800 dark:text-zinc-100">
                {user.fullname}
              </div>
              <div
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? 'text-green-600 dark:text-green-400 font-medium'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-8 px-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Users className="size-8 text-zinc-400 dark:text-zinc-600" />
              <p className="text-sm">
                {searchQuery ? 'No users found' : 'No users available'}
              </p>
              {showOnlineOnly && (
                <button
                  onClick={() => setShowOnlineOnly(false)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
                >
                  Show all users
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
