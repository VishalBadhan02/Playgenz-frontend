
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Image, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, reciever: string) => void;
  isMobile?: boolean;
  contact: any
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isMobile = false, contact }) => {
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, contact?.userId);
      setNewMessage('');
    }
  };

  return (
    <div className={`p-${isMobile ? '3' : '4'} border-t bg-background`}>
      <div className="flex items-end gap-2">
        {!isMobile && (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
        )}
        {isMobile && (
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Paperclip className="h-5 w-5" />
          </Button>
        )}
        <Textarea
          className="flex-1 min-h-10 max-h-40"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
