
import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { Contact, Team, Message } from './types';
import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/use-async';
import useUserService from '@/services/userService';

interface ChatProps {
  contact?: any;
  team?: Team;
  messages: any[];
  loading: boolean;
  onSendMessage: (message: string, reciever: string) => void;
  onBack?: () => void;
  isMobile?: boolean;
}

const Chat: React.FC<ChatProps> = ({
  contact,
  team,
  messages,
  onSendMessage,
  onBack,
  loading,
  isMobile = false
}) => {
  return (
    <div className={`
      ${isMobile ? 'fixed inset-0 z-50' : 'hidden md:flex'}
      flex flex-1 flex-col bg-background
    `}>
      <ChatHeader contact={contact} team={team} onBack={onBack} isMobile={isMobile} />

      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} isLoading={loading} />
      </div>

      <div className="">
        <ChatInput onSendMessage={onSendMessage} isMobile={isMobile} contact={contact} />
      </div>
    </div>
  );
};



export default Chat;
