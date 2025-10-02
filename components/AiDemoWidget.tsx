import React, { useState, useEffect, useRef } from 'react';
// FIX: Imported the 'Clock' icon to resolve the 'Cannot find name' error.
import { MessageSquare, Zap, Target, Clock } from './Icons';
import { SkeletonLoader } from './ui/SkeletonLoader';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const knowledgeBase: { [key: string]: string } = {
  'How can AI reduce my customer service costs?': 'AI can handle up to 80% of common customer inquiries instantly, 24/7. This reduces the need for a large support team, cuts down on response times, and frees up your human agents to handle complex issues, leading to significant cost savings and improved customer satisfaction.',
  "What's the ROI timeline for AI implementation?": 'While it varies, most of our clients see a positive ROI within 3 to 6 months. Our solutions are designed for rapid deployment, and the efficiency gains from automation quickly offset the initial investment. Our ROI calculator can give you a more personalized estimate!',
  'Can AI integrate with my existing systems?': 'Absolutely. Our AI solutions are built to be flexible. We specialize in seamless integration with your existing CRM, ERP, and other business software to ensure a smooth workflow and enhance the tools you already use.',
  'default': "That's a great question! While I'm just a demo, a custom-built AI assistant for your business would be trained on your specific data to answer questions like that. Would you like to know more about our custom AI development?"
};

const suggestedQuestions = [
  'How can AI reduce my customer service costs?',
  "What's the ROI timeline for AI implementation?",
  'Can AI integrate with my existing systems?',
];

export const AiDemoWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi! I'm a demo assistant built by Lumin Agency. Ask me how AI can automate your business, save costs, or improve efficiency." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const getAiResponse = (question: string): string => {
    const matchedQuestion = Object.keys(knowledgeBase).find(
      (kbQuestion) => kbQuestion.toLowerCase() === question.toLowerCase().trim()
    );
    return matchedQuestion ? knowledgeBase[matchedQuestion] : knowledgeBase.default;
  };

  const handleSendMessage = (question: string) => {
    if (!question.trim() || isAiTyping) return;

    const userMessage: Message = { sender: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAiTyping(true);

    setTimeout(() => {
      const aiResponseText = getAiResponse(question);
      const aiMessage: Message = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <section id="ai-demo" className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Experience Our AI in Action</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">This isn't just a concept. Interact with our demo AI assistant to understand how it can transform your business communication.</p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid md:grid-cols-3 ai-demo-container">
          {/* Chat Interface */}
          <div className="md:col-span-2 flex flex-col h-[600px]">
            <div className="flex-grow p-4 md:p-6 space-y-6 overflow-y-auto bg-slate-100/50">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">🤖</div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 max-w-md ${msg.sender === 'ai' ? 'bg-slate-200 text-slate-800 rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isAiTyping && (
                 <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">🤖</div>
                  <div className="rounded-2xl px-4 py-3 bg-slate-200 text-slate-500 rounded-bl-none flex items-center">
                     <SkeletonLoader className="h-4 w-20 bg-slate-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex flex-col md:flex-row flex-wrap gap-2 mb-3 suggested-questions">
                {suggestedQuestions.map((q) => (
                  <button key={q} onClick={() => handleSendMessage(q)} className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <label htmlFor="ai-demo-input" className="sr-only">Ask a question to the AI demo</label>
                <input
                  type="text"
                  id="ai-demo-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base chat-input"
                />
                <button type="submit" className="h-12 px-5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-300" disabled={isAiTyping}>
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-slate-50 p-6 border-l border-slate-200 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-4">Key Performance</h4>
              <div className="space-y-4">
                {[
                  { icon: Zap, value: "2.3s", label: "Average Response Time" },
                  { icon: Target, value: "97%", label: "Accuracy Rate" },
                  { icon: Clock, value: "24/7", label: "Always Available" },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{stat.value}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center bg-blue-50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-blue-900">Build Your Own AI Assistant</h4>
              <p className="mt-2 text-sm text-blue-800/80">This technology can be customized for your business needs.</p>
              <a href="#lead-magnet" className="mt-4 cta-primary inline-flex items-center justify-center w-full h-11 px-5 rounded-lg text-white font-semibold">
                Get My Custom AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
