import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { PageID } from './types';
import { Header } from './components/Layout';
import HomeContent from './pages/Home';
import ExecutiveContent from './pages/Executive';
import ProfitContent from './pages/Profit';
import MarketContent from './pages/Market';
import SalesContent from './pages/Sales';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageID>('home');
  const [darkMode, setDarkMode] = useState(false);

  // Market sayfası için marka filtresi state'i
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Pınar Süt', 'Rakip 1', 'Rakip 2', 'Rakip 3', 'Rakip 4']);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return <HomeContent onNavigate={setCurrentPage} />;
      case 'executive': return <ExecutiveContent />;
      case 'profit': return <ProfitContent darkMode={darkMode} />;
      case 'market': return <MarketContent selectedBrands={selectedBrands} />;
      case 'sales': return <SalesContent />;
      case 'ops':
      case 'planning':
      case 'milk':
      case 'logistics':
      case 'purchasing':
      case 'hr':
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-400 px-4">
            <Settings size={56} className="mb-4 opacity-10 animate-spin-slow" />
            <h2 className="text-lg font-semibold uppercase tracking-wider text-center">Bölüm Hazırlanıyor</h2>
            <button onClick={() => setCurrentPage('home')} className="mt-6 px-6 py-3 bg-theme-primary text-white rounded-2xl font-semibold hover:bg-theme-secondary transition-all duration-300 shadow-sm">Ana Sayfaya Dön</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme-bg-light dark:bg-theme-bg-dark transition-colors duration-500 overflow-x-hidden text-theme-text-main dark:text-theme-text-dark-main">
      <main className="flex-1 flex flex-col min-w-0 pt-16 transition-all duration-300">
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />
        <div className="flex-1">{renderContent()}</div>
      </main>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;