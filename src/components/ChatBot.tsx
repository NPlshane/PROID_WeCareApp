import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your WeCare assistant. How can I help you today? I can assist with health questions, medication reminders, appointment scheduling, and more.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('appointment') || lowerInput.includes('book') || lowerInput.includes('doctor')) {
      return 'I can help you book an appointment! Visit the Appointments tab to schedule with available doctors. You can choose from General Practitioners, Cardiologists, Physiotherapists, and Dentists. Would you like me to guide you through the booking process?';
    }
    
    if (lowerInput.includes('medication') || lowerInput.includes('medicine')) {
      return 'I can help you with medication reminders! Check your home screen for today\'s schedule: Blood pressure pills at 8:00 AM with breakfast, and vitamins at 1:00 PM after lunch. Please consult with your doctor or pharmacist for specific medication advice.';
    }
    
    if (lowerInput.includes('event') || lowerInput.includes('activity')) {
      return 'There are great community events happening! Check the Events tab to see activities in your area like Tai Chi, cooking classes, and health talks. You can filter by location (Bedok, Tampines, etc.) to find nearby events.';
    }
    
    if (lowerInput.includes('food') || lowerInput.includes('restaurant')) {
      return 'Looking for food options? Check the Food Map tab to discover nearby hawker centers, restaurants, and cafes in your area. All locations are elderly-friendly with easy access!';
    }
    
    if (lowerInput.includes('emergency') || lowerInput.includes('help')) {
      return 'For medical emergencies, call 995 immediately. For non-urgent medical help, you can book an appointment through the Appointments tab or call your regular doctor directly.';
    }
    
    return 'Thank you for your message. I\'m here to help with appointments, medication reminders, finding events, food recommendations, and wellness tips. How else can I assist you today?';
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-end justify-center p-4">
      <div className="bg-[#FAF3DD] rounded-t-3xl w-full max-w-4xl h-[85vh] max-h-[85vh] flex flex-col shadow-2xl border-4 border-[#5E6472]/20 mb-20">
        {/* Header */}
        <div className="bg-[#5E6472] p-8 rounded-t-3xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">AI Health Assistant</h3>
              <p className="text-xl text-white/80">Here to help you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="elderly-button bg-white/20 hover:bg-white/30 !p-4 !min-h-16 !min-w-16"
          >
            <X size={28} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-4 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-[#AED9E0]' : 'bg-[#5E6472]'}`}>
                  {message.sender === 'user' ? (
                    <User size={24} className="text-[#5E6472]" />
                  ) : (
                    <Bot size={24} className="text-white" />
                  )}
                </div>
                <div
                  className={`p-6 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#B8F2E6] text-[#5E6472] border border-[#5E6472]/20'
                      : 'bg-white text-[#5E6472] border border-[#5E6472]/20'
                  }`}
                >
                  <p className="text-xl leading-relaxed">{message.text}</p>
                  <p className="text-lg opacity-70 mt-3">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-[#5E6472] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={24} className="text-white" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#5E6472]/20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#5E6472] rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#5E6472] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-[#5E6472] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-8 border-t-2 border-[#5E6472]/20 flex-shrink-0">
          <div className="flex items-center space-x-6">
            <button
              onClick={startVoiceRecognition}
              className={`elderly-button !p-5 !min-h-16 !min-w-16 flex-shrink-0 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#AED9E0] hover:bg-[#AED9E0]/80 text-[#5E6472]'
              }`}
              disabled={isLoading}
            >
              {isListening ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice..."
              className="flex-1 text-xl p-6 bg-white border-2 border-[#5E6472]/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#5E6472]/20 min-w-0 text-[#5E6472]"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="elderly-button bg-[#5E6472] hover:bg-[#5E6472]/80 text-white !p-5 !min-h-16 !min-w-16 flex-shrink-0"
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
