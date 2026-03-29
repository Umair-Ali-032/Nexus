// src/components/chat/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatConversation, Message } from '../../types';

interface ChatWindowProps {
  conversation: ChatConversation;
  currentUser: User;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>(conversation.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

      const message: Message = {
  id: "1",
  senderId: "user123",
  receiverId: "user456",   
  content: "Hello!",
  timestamp: new Date().toISOString(), 
  isRead: false,            
  createdAt: new Date().toISOString() 
};
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200">
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-xs ${
              msg.senderId === currentUser.id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};