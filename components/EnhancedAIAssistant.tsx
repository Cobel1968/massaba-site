'use client'
import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, MessageSquare, X, Minimize2, Maximize2, Bot, User, Zap, TrendingUp, GraduationCap, Briefcase, Plane, Truck, FileText } from 'lucide-react'
import { aiKnowledgeBase, findBestAnswer } from '@/lib/aiKnowledgeBase'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
  suggestions?: string[]
}

export default function EnhancedAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis l'assistant virtuel de Massaba Consulting. Je peux vous renseigner sur nos services, nos partenaires universitaires, les visas, l'importation de véhicules, et bien plus. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date(),
      suggestions: ["B2B Consultancy", "Études à l'étranger", "Visa pour les Émirats", "Importation de véhicule"]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isUser: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const answer = findBestAnswer(text)
      
      // Generate suggestions based on the question
      let suggestions: string[] = []
      const lowerText = text.toLowerCase()
      
      if (lowerText.includes('b2b') || lowerText.includes('consulting')) {
        suggestions = ['Partenariats B2B', 'Stratégie de croissance', 'Entrée sur le marché']
      } else if (lowerText.includes('education') || lowerText.includes('université')) {
        suggestions = ['RVU Arménie', 'AURAK Émirats', 'CBTC Côte d\'Ivoire', 'Bourses disponibles']
      } else if (lowerText.includes('visa')) {
        suggestions = ['Visa touriste', 'Visa business', 'Golden Visa', 'Documents requis']
      } else if (lowerText.includes('omra')) {
        suggestions = ['Forfaits Omra', 'Hébergement VIP', 'Guides professionnels', 'Périodes recommandées']
      } else if (lowerText.includes('voiture') || lowerText.includes('vehicle')) {
        suggestions = ['Droits de douane (5%)', 'Transport maritime', 'Assurance', 'Modèles disponibles']
      } else {
        suggestions = ['B2B Consultancy', 'Éducation', 'Visa', 'Omra', 'Importation véhicule']
      }
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: answer,
        isUser: false,
        timestamp: new Date(),
        suggestions: suggestions
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-full p-4 shadow-lg transition-all duration-300 group"
      >
        <div className="relative">
          <Sparkles className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col transition-all duration-300 ${isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-slate-900" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant Massaba</h3>
            <p className="text-slate-400 text-xs">En ligne  Réponse instantanée</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4 text-slate-400" /> : <Minimize2 className="w-4 h-4 text-slate-400" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  {!message.isUser && (
                    <div className="flex items-center gap-1 mb-1">
                      <Bot className="w-3 h-3 text-amber-500" />
                      <span className="text-slate-500 text-xs">Massaba AI</span>
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl ${message.isUser ? 'bg-amber-500 text-slate-900 rounded-br-sm' : 'bg-slate-800 text-slate-200 rounded-bl-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  {!message.isUser && message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full transition"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {message.isUser && (
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center ml-2 order-1">
                    <User className="w-3 h-3 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-sm p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button onClick={() => sendMessage("Présentez-vous")} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full transition whitespace-nowrap">
                <Zap className="w-3 h-3 text-amber-500" /> Présentation
              </button>
              <button onClick={() => sendMessage("Tarifs des services")} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full transition whitespace-nowrap">
                <TrendingUp className="w-3 h-3 text-amber-500" /> Tarifs
              </button>
              <button onClick={() => sendMessage("Partenaires universitaires")} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full transition whitespace-nowrap">
                <GraduationCap className="w-3 h-3 text-amber-500" /> Universités
              </button>
              <button onClick={() => sendMessage("Visas UAE")} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-full transition whitespace-nowrap">
                <FileText className="w-3 h-3 text-amber-500" /> Visas
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-500 text-xs text-center mt-2">
              L'IA peut répondre sur les services, tarifs, universités partenaires, visas, et plus.
            </p>
          </div>
        </>
      )}
    </div>
  )
}