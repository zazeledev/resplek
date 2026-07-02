import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Welcome! How can we assist you today?',
      options: ['Find Stellenbosch Rooms', 'Flatmate Matching', 'Contact Support']
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text } as Message];
    setMessages(newMessages);
    setInputVal('');

    // Generate bot reply
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(prev => [...prev, reply]);
    }, 600);
  };

  const getBotReply = (text: string): Message => {
    const lower = text.toLowerCase();
    
    if (lower.includes('stellenbosch') || lower.includes('stellie') || lower.includes('bergzicht') || lower.includes('berke')) {
      return {
        sender: 'bot',
        text: 'We have premium accommodations in Stellenbosch! For example, Bergzicht Plaza (2 min from campus) and Die Berke apartment. You can view all details on our Listings page.',
        options: ['View Listings', 'Go to Home']
      };
    }
    
    if (lower.includes('flatmate') || lower.includes('roommate') || lower.includes('match')) {
      return {
        sender: 'bot',
        text: 'Our Flatmate Matching service connects students based on academic year, budget, cleanliness, and sleep schedule. You can complete the profile form to find matches instantly!',
        options: ['Go to Flatmate Page']
      };
    }

    if (lower.includes('price') || lower.includes('rent') || lower.includes('cost') || lower.includes('budget')) {
      return {
        sender: 'bot',
        text: 'Student rooms range from ZAR 3,500/month (Die Berke) to ZAR 12,000/month (Bergzicht Plaza). You can search by custom price ranges in our Listings dashboard.',
        options: ['View Listings']
      };
    }

    if (lower.includes('contact') || lower.includes('support') || lower.includes('email') || lower.includes('phone')) {
      return {
        sender: 'bot',
        text: 'You can email support at info@resplek.com, or fill out the inquiry form on our Contact page. We normally respond within 24 hours.',
        options: ['Contact Us']
      };
    }

    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return {
        sender: 'bot',
        text: 'Hello! I am your ResPlek digital assistant. Ask me anything about our student accommodations, flatmates, or support.',
        options: ['Find Stellenbosch Rooms', 'Flatmate Matching']
      };
    }

    return {
      sender: 'bot',
      text: "Thanks for your message! To get immediate assistance, you can browse verified listings or try our flatmate search service.",
      options: ['View Listings', 'Flatmate Matching', 'Contact Support']
    };
  };

  const handleOptionClick = (option: string) => {
    if (option === 'View Listings') {
      navigate('/listings');
      setIsOpen(false);
    } else if (option === 'Flatmate Matching' || option === 'Go to Flatmate Page') {
      navigate('/flatmate');
      setIsOpen(false);
    } else if (option === 'Contact Support' || option === 'Contact Us') {
      navigate('/contact');
      setIsOpen(false);
    } else if (option === 'Go to Home') {
      navigate('/');
      setIsOpen(false);
    } else {
      handleSend(option);
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      <div className="chatbot-bubble" onClick={() => setIsOpen(!isOpen)} aria-label="Open support chat">
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </div>

      {/* Chat Panel */}
      <div className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>ResPlek Helper</h3>
          <button 
            onClick={() => setIsOpen(false)} 
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div>{msg.text}</div>
              {msg.options && (
                <div className="chatbot-options">
                  {msg.options.map((opt, i) => (
                    <button 
                      key={i} 
                      className="chat-option-btn" 
                      onClick={() => handleOptionClick(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form 
          className="chatbot-input-container" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
        >
          <input 
            type="text" 
            className="chatbot-input" 
            placeholder="Type your question..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="chatbot-send-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};
export default Chatbot;
