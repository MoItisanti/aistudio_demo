import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chatbox */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-theme-primary to-theme-secondary text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Pınarım</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-success shadow-[0_0_4px_rgba(23,173,123,0.8)]"></span> Çevrimiçi
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-[350px] overflow-y-auto bg-gray-50/50 dark:bg-theme-bg-dark/50 flex flex-col gap-4 custom-scrollbar">
            {/* Welcome Message */}
            <div className="flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white dark:bg-theme-card-dark border border-gray-100 dark:border-gray-800 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-theme-text-main dark:text-theme-text-dark-main">
                <p className="mb-3 leading-relaxed">
                  Merhaba, ben <strong className="text-theme-primary dark:text-theme-accent font-semibold">Pınarım</strong>. Verilerinizi analiz etmek ve size içgörüler sunmak için buradayım. Size nasıl yardımcı olabilirim?
                </p>
                <div className="bg-theme-primary/5 dark:bg-theme-bg-dark border border-theme-primary/10 dark:border-gray-800 p-3 rounded-xl">
                  <p className="text-xs text-theme-primary dark:text-theme-accent font-semibold mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-theme-warning" /> Örnek Soru:
                  </p>
                  <p className="text-xs text-theme-text-muted dark:text-gray-400 italic leading-relaxed">
                    "Geçen yılın aynı dönemine göre satışlarımızdaki en büyük değişim hangi SKU'da oldu?"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-theme-card-dark border-t border-gray-100 dark:border-gray-800">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    setInputValue('');
                  }
                }}
                placeholder="Pınarım'a mesaj gönder..."
                className="w-full bg-gray-50 dark:bg-theme-bg-dark border border-gray-200 dark:border-gray-700 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-theme-primary dark:focus:border-theme-accent focus:ring-1 focus:ring-theme-primary dark:focus:ring-theme-accent transition-all text-theme-text-main dark:text-theme-text-dark-main placeholder-gray-400"
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) setInputValue('');
                }}
                className={`absolute right-1.5 p-2 rounded-full transition-all duration-300 ${inputValue.trim() ? 'bg-theme-primary text-white hover:bg-theme-secondary hover:scale-105 shadow-md' : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'}`}
              >
                <Send size={14} className={inputValue.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-white hover:bg-gray-50 text-gray-600 dark:bg-theme-card-dark dark:hover:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700' : 'bg-gradient-to-r from-theme-primary to-theme-secondary text-white shadow-[0_4px_20px_rgba(13,76,84,0.4)]'}`}
      >
        {isOpen ? <X size={24} className="animate-fade-in-up" /> : <Bot size={26} className="animate-fade-in-up" />}
      </button>
    </div>
  );
};

export default AIAssistant;
