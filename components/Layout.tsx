import React, { useState, useRef, useEffect } from 'react';
import { Home, Filter, ChevronDown, Sun, Moon, Check, ChevronRight, Plus, Minus } from 'lucide-react';
import { PinarLogo } from './Shared';
import { HIERARCHY_DATA } from '../data';

// --- Reusable Header Components ---

const HeaderSelect = ({ value, label, icon: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const handleToggle = () => {
    if (!isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left, width: Math.max(rect.width, 160) });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={handleToggle}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 border
          ${isOpen
            ? 'bg-theme-accent text-white border-theme-accent shadow-lg shadow-theme-accent/20'
            : 'bg-theme-card-light dark:bg-theme-secondary text-theme-text-main dark:text-theme-text-dark-main border-slate-200 dark:border-white/10 shadow-sm hover:border-theme-accent'}
        `}
      >
        {Icon && <Icon size={14} className={isOpen ? 'text-white' : 'text-theme-accent'} />}
        <span className="opacity-70 font-normal">{label}:</span>
        <span>{value}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-100' : 'opacity-50'}`} />
      </button>
      {isOpen && (
        <div
          className="fixed z-[9999] bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden"
          style={{ top: coords.top, left: coords.left, minWidth: coords.width }}
        >
          <div className="px-4 py-2.5 text-[10px] font-bold text-theme-text-muted/80 uppercase tracking-wider bg-theme-bg-light/50 dark:bg-black/20 border-b border-slate-200 dark:border-slate-700/50">Seçiniz</div>
          <button onClick={() => setIsOpen(false)} className="w-full text-left px-4 py-2.5 text-[12px] hover:bg-theme-bg-light dark:hover:bg-theme-card-light/5 dark:text-white font-medium transition-colors border-l-2 border-transparent hover:border-theme-secondary">Seçenek 1</button>
          <button onClick={() => setIsOpen(false)} className="w-full text-left px-4 py-2.5 text-[12px] hover:bg-theme-bg-light dark:hover:bg-theme-card-light/5 dark:text-theme-text-muted font-medium transition-colors border-l-2 border-transparent hover:border-theme-secondary">Seçenek 2</button>
        </div>
      )}
    </div>
  );
};

const HeaderMultiSelect = ({ label, options, selected, onChange }: { label: string, options: string[], selected: string[], onChange: (val: string[]) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleToggle = () => {
    if (!isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target) && !target.closest('.fixed-dropdown-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={handleToggle}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 border
          ${isOpen
            ? 'bg-theme-accent text-white border-theme-accent shadow-lg shadow-theme-accent/20'
            : 'bg-theme-card-light dark:bg-theme-secondary text-theme-text-main dark:text-theme-text-dark-main border-slate-200 dark:border-white/10 shadow-sm hover:border-theme-accent'}
        `}
      >
        <span className="opacity-70 font-normal">{label}</span>
        <span className="bg-theme-bg-light/80 dark:bg-theme-card-light/10 px-1.5 py-0.5 rounded-md text-[10px] min-w-[18px] text-center">{selected.length}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-100' : 'opacity-50'}`} />
      </button>
      {isOpen && (
        <div
          className="fixed z-[9999] bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden fixed-dropdown-menu"
          style={{ top: coords.top, left: coords.left, minWidth: '200px' }}
        >
          <div className="px-4 py-2.5 text-[10px] font-bold text-theme-text-muted/80 uppercase tracking-wider bg-theme-bg-light/50 dark:bg-black/20 border-b border-slate-200 dark:border-slate-700/50">Markalar</div>
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {options.map(option => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className="w-full text-left px-4 py-2.5 text-[12px] hover:bg-theme-bg-light dark:hover:bg-theme-card-light/5 dark:text-white font-medium flex items-center justify-between border-b border-gray-50 dark:border-theme-primary/40/50 last:border-0 transition-colors group"
              >
                <span className={selected.includes(option) ? 'text-theme-secondary font-bold' : ''}>{option}</span>
                {selected.includes(option) && <Check size={14} className="text-theme-secondary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Recursive Tree Node for Hierarchy Filter ---
const TreeNode: React.FC<{ node: any, level: number, onSelect: (node: any) => void, currentSelection: any }> = ({ node, level, onSelect, currentSelection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = currentSelection?.id === node.id;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    onSelect(node);
    if (hasChildren && !isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div>
      <div
        className={`
                    flex items-center gap-2 px-3 py-2 text-[12px] cursor-pointer transition-all border-l-2
                    ${isSelected
            ? 'bg-theme-secondary/10 border-theme-secondary text-theme-secondary font-bold'
            : 'border-transparent hover:bg-theme-bg-light dark:hover:bg-slate-200/20 text-theme-text-muted dark:text-theme-text-dark-muted'}
                `}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <button
            onClick={handleExpand}
            className="p-0.5 rounded-md hover:bg-slate-200/30 dark:hover:bg-theme-card-light/10 text-theme-text-muted/80 transition-colors"
          >
            {isExpanded ? <Minus size={10} /> : <Plus size={10} />}
          </button>
        ) : (
          <span className="w-3.5 h-3.5 flex items-center justify-center">
            <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-theme-secondary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
          </span>
        )}
        <span className="truncate flex-1">{node.label}</span>
        {isSelected && <Check size={14} className="text-theme-secondary" />}
      </div>

      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child: any) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              currentSelection={currentSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Hierarchy Filter (Accordion/Tree Style) ---
const HierarchicalFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleToggle = () => {
    if (!isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target) && !target.closest('.hierarchy-dropdown')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={handleToggle}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 border
          ${isOpen
            ? 'bg-theme-accent text-white border-theme-accent shadow-lg shadow-theme-accent/20'
            : 'bg-theme-card-light dark:bg-theme-secondary text-theme-text-main dark:text-theme-text-dark-main border-slate-200 dark:border-white/10 shadow-sm hover:border-theme-accent'}
        `}
      >
        <Filter size={14} className={isOpen ? 'text-white' : 'text-theme-accent'} />
        <span className="opacity-70 font-normal">Ürün Hiyerarşisi:</span>
        <span>{selectedNode ? selectedNode.label : 'Tümü'}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-100' : 'opacity-50'}`} />
      </button>

      {isOpen && (
        <div
          className="fixed z-[9999] bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden hierarchy-dropdown flex flex-col"
          style={{ top: coords.top, left: coords.left, minWidth: '280px', maxHeight: '400px' }}
        >
          <div className="px-4 py-3 text-[10px] font-bold text-theme-text-muted/80 uppercase tracking-wider bg-theme-bg-light/50 dark:bg-black/20 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
            <span>Kategoriler</span>
            <button onClick={() => setSelectedNode(null)} className="text-theme-secondary hover:text-[#15707a] hover:underline text-[10px] lowercase transition-colors">temizle</button>
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 py-1">
            {HIERARCHY_DATA.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                level={0}
                onSelect={(n) => {
                  setSelectedNode(n);
                  // Optional: close on selection if it's a leaf node or keep open
                  // setIsOpen(false); 
                }}
                currentSelection={selectedNode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ToggleYtdMtd = () => (
  <div className="flex bg-theme-bg-light/80/50 dark:bg-black/20 p-1 rounded-full border border-slate-200/40/50 dark:border-white/5 shrink-0">
    <button className="px-3 py-1.5 text-[10px] font-bold bg-theme-card-light dark:bg-theme-secondary text-theme-text-main dark:text-theme-text-dark-main rounded-full shadow-sm transition-all">YTD</button>
    <button className="px-3 py-1.5 text-[10px] font-bold text-theme-text-muted/80 hover:text-theme-secondary/80 dark:hover:text-theme-text-muted transition-colors">MTD</button>
  </div>
);

const ToggleTlTon = () => (
  <div className="flex bg-theme-bg-light/80/50 dark:bg-black/20 p-1 rounded-full border border-slate-200/40/50 dark:border-white/5 shrink-0 mr-1">
    <button className="px-3 py-1.5 text-[10px] font-bold bg-theme-card-light dark:bg-theme-secondary text-theme-text-main dark:text-theme-text-dark-main rounded-full shadow-sm transition-all">TL</button>
    <button className="px-3 py-1.5 text-[10px] font-bold text-theme-text-muted/80 hover:text-theme-secondary/80 dark:hover:text-theme-text-muted transition-colors">TON</button>
  </div>
);

// --- Main Header ---

export const Header = ({ darkMode, toggleDarkMode, currentPage, onNavigate, selectedBrands, setSelectedBrands }: any) => {

  const renderFilters = () => {
    // 1. Ana Sayfa Filtreleri
    if (currentPage === 'home') {
      return (
        <>
          <HeaderSelect label="Şirket" value="Pınar Süt" />
        </>
      );
    }

    // 2. Karlılık ve Yönetici Özeti Filtreleri
    if (currentPage === 'profit' || currentPage === 'executive') {
      return (
        <>
          <ToggleTlTon />
          <ToggleYtdMtd />
          <div className="w-px h-6 bg-theme-bg-light dark:bg-theme-card-light/10 mx-1"></div>
          <HeaderSelect label="Dönem" value="2024 - Q3" />
          <HeaderSelect label="Kanal" value="Tümü" />
          <HeaderSelect label="Fabrika" value="Tümü" />
          <HeaderSelect label="Ana Ürün" value="Tümü" />
        </>
      );
    }

    // 3. Sales Filtreleri
    if (currentPage === 'sales') {
      return (
        <>
          <ToggleTlTon />
          <ToggleYtdMtd />
          <div className="w-px h-6 bg-theme-bg-light dark:bg-theme-card-light/10 mx-1"></div>
          <HeaderSelect label="Dönem" value="2024 - Q3" />
          <HeaderSelect label="Kanal" value="Tümü" />
          <HierarchicalFilter />
        </>
      )
    }

    // 4. Market Filtreleri
    if (currentPage === 'market') {
      return (
        <>
          <ToggleTlTon />
          <ToggleYtdMtd />
          <div className="w-px h-6 bg-theme-bg-light dark:bg-theme-card-light/10 mx-1"></div>
          <HeaderSelect label="Şirket" value="Pınar Süt" />
          <HeaderMultiSelect
            label="Marka"
            options={['Pınar Süt', 'Rakip 1', 'Rakip 2', 'Rakip 3', 'Rakip 4']}
            selected={selectedBrands}
            onChange={setSelectedBrands}
          />
          <HeaderSelect label="Market" value="Tümü" />
          <HeaderSelect label="Bölge" value="Türkiye Geneli" />
          <HeaderSelect label="Ana Ürün" value="SKU Bazlı" />
        </>
      );
    }

    // Varsayılan
    return <HeaderSelect label="Filtre" value="Varsayılan" />;
  };

  return (
    <header className="h-20 px-6 flex items-center justify-between fixed top-0 right-0 left-0 z-50 transition-all duration-300 pointer-events-none">

      {/* Glass Container */}
      <div className="absolute inset-x-4 top-2 bottom-2 bg-theme-card-light/80 dark:bg-theme-primary/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg shadow-black/5 rounded-2xl pointer-events-auto flex items-center justify-between px-4">

        {/* Left: Home Button */}
        <div className="flex items-center shrink-0 mr-4 border-r border-theme-secondary/30 dark:border-white/10 pr-4 h-10">
          <button
            onClick={() => onNavigate('home')}
            className={`p-2 rounded-xl transition-all duration-300 group ${currentPage === 'home'
              ? 'bg-theme-accent text-white shadow-md shadow-pinarMedium/20'
              : 'text-theme-text-main/80 dark:text-theme-text-muted hover:bg-theme-bg-light dark:hover:bg-slate-200/20 hover:text-theme-text-main dark:hover:text-white'
              }`}
          >
            <Home size={20} strokeWidth={currentPage === 'home' ? 2.5 : 2} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Center: Scrollable Filters */}
        <div className="flex-1 flex items-center justify-start overflow-x-auto no-scrollbar mask-gradient px-2 gap-3 w-full h-full">
          {renderFilters()}
        </div>

        {/* Right: Dark Mode & Logo */}
        <div className="flex items-center gap-4 shrink-0 ml-4 pl-4 border-l border-theme-secondary/30 dark:border-white/10 h-10">
          <button onClick={toggleDarkMode} className="p-2 hover:bg-theme-bg-light/80 dark:hover:bg-theme-card-light/10 rounded-xl transition-all duration-300 text-theme-text-main/80 dark:text-amber-400 hover:rotate-12">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="hidden sm:block opacity-90 hover:opacity-100 transition-opacity">
            <PinarLogo collapsed={false} />
          </div>
          <div className="sm:hidden w-8 h-8 flex items-center justify-center bg-theme-secondary rounded-lg text-white font-bold text-xs shadow-md">
            P
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
};