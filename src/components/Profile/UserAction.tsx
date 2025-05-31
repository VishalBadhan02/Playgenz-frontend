import React, { useState } from 'react';
import { Edit, UserPlus, UserCheck, UserX, MessageCircle, Loader } from 'lucide-react';
import useUserService from '@/services/userService';

export const UserActions = ({ userData, handleMessage, loading, refresh }) => {
    const { sendFriendRequest, handleDelete, handleApproval } = useUserService();

    // Individual loading states for each action
    const [loadingState, setLoadingState] = useState({
        addFriend: false,
        undoRequest: false,
        unfriend: false,
        acceptRequest: false,
    });

    const handleAction = async (actionType, action) => {
        setLoadingState((prevState) => ({ ...prevState, [actionType]: true }));
        try {
            const res = await action();
            if (res.status === true || res.data) {
                refresh();
            }
        } catch (error) {
            console.error(`Error during ${actionType}:`, error);
        } finally {
            setLoadingState((prevState) => ({ ...prevState, [actionType]: false }));
        }
    };

    return (
        <div className="flex gap-2">
            {(!userData?.friend || userData?.friend?.status === 2) && (
                <button
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
                    onClick={() => handleAction('addFriend', () => sendFriendRequest(userData._id))}
                    disabled={loadingState.addFriend}
                >
                    {loadingState.addFriend ? (
                        <Loader className="mr-2 inline-block h-4 w-4 animate-spin" />
                    ) : (
                        <UserPlus className="mr-2 inline-block h-4 w-4" />
                    )}
                    Add Friend
                </button>
            )}
            {userData?.friend?.status === 0 && !userData?.friend?.accepter && (
                <button
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
                    onClick={() => handleAction('acceptRequest', () => handleApproval(userData?.friend?._id))}
                    disabled={loadingState.acceptRequest}
                >
                    {loadingState.acceptRequest ? (
                        <Loader className="mr-2 inline-block h-4 w-4 animate-spin" />
                    ) : (
                        <UserCheck className="mr-2 inline-block h-4 w-4" />
                    )}
                    Accept
                </button>
            )}
            {userData?.friend?.status === 0 && userData?.friend?.accepter && (
                <button
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
                    onClick={() => handleAction('undoRequest', () => handleDelete(userData?.friend?._id))}
                    disabled={loadingState.undoRequest}
                >
                    {loadingState.undoRequest ? (
                        <Loader className="mr-2 inline-block h-4 w-4 animate-spin" />
                    ) : (
                        <UserX className="mr-2 inline-block h-4 w-4" />
                    )}
                    Undo
                </button>
            )}
            {userData?.friend?.status === 1 && (
                <button
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
                    onClick={() => handleAction('unfriend', () => handleDelete(userData?.friend?._id))}
                    disabled={loadingState.unfriend}
                >
                    {loadingState.unfriend ? (
                        <Loader className="mr-2 inline-block h-4 w-4 animate-spin" />
                    ) : (
                        <UserX className="mr-2 inline-block h-4 w-4" />
                    )}
                    Unfriend
                </button>
            )}
            <button
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
                onClick={handleMessage}
                disabled={loading}
            >
                {loading ? (
                    <Loader className="mr-2 inline-block h-4 w-4 animate-spin" />
                ) : (
                    <MessageCircle className="mr-2 inline-block h-4 w-4" />
                )}
                Message
            </button>
        </div>
    );
};
