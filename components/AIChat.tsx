'use client';
import { useState, useRef, useEffect } from 'react';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  leadScore?: number;
  category?: string;
  pageUrl?: string;
  isLoading?: boolean;
}
export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('ai_chat_session');
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('ai_chat_session', id);
      }
      return id;
    }
    return '';
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = input;
    setInput('');
    setIsLoading(true);
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      text: 'Typing...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    }]);
    try {
      const response = await fetch('https://wdvidnhqzomdsiirizla.supabase.co/functions/v1/create-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion,
          sessionId: sessionId
        })
      });
      const data = await response.json();
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));
      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
          leadScore: data.lead_score,
          category: data.matched_category,
          pageUrl: data.destination_page,
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Sorry, I encountered an error. Please try again or contact our support team.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }
  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Massaba AI Assistant</h3>
          <p className="text-xs opacity-90">Ask about our services</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-lg mb-2">👋 Hello! I'm here to help you.</p>
              <p className="text-sm">Ask me about:</p>
              <ul className="text-xs mt-2 space-y-1 text-left">
                <li>• Vehicle import to Ivory Coast</li>
                <li>• Omra travel packages</li>
                <li>• University placements</li>
                <li>• B2B consultancy services</li>
              </ul>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              } ${msg.isLoading ? 'opacity-50' : ''}`}
            >
              {msg.isLoading ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <>
                  <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
                  {!msg.isUser && msg.leadScore && msg.leadScore >= 7 && (
                    <div className="mt-2 text-xs text-orange-600">
                      🔥 High interest detected
                    </div>
                  )}
                  {!msg.isUser && msg.pageUrl && (
                    <a
                      href={msg.pageUrl}
                      className="block mt-2 text-sm text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more →
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}