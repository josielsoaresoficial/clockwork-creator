import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {Search, Gamepad2, Filter, Download, FolderDown} from 'lucide-react';
import { Header } from './components/Header';
import { GameRow, Game } from './components/GameRow';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { AddGameModal } from './components/AddGameModal';
import { generateRandomKey } from './lib/utils';
import { downloadProjectSource } from './lib/downloader';

// Mock Data
const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    name: 'NARUTO SHIPPUDEN: Ultimate Ninja STORM 4',
    imageUrl: 'https://static.lumi.new/34/34e7cb0363f0591876e1052c03f8aed4.png',
    date: new Date('2025-11-16T20:01:00'),
    price: 100,
    originalPrice: 'R$ 149,90',
    rarity: 'common',
    isRevealed: false
  },
  {
    id: '2',
    name: 'ELDEN RING',
    imageUrl: 'https://static.lumi.new/c9/c9d15573009cd31185fe962b9959c829.png',
    date: new Date('2025-11-15T19:48:00'),
    price: 500,
    originalPrice: 'R$ 299,90',
    rarity: 'legendary',
    isRevealed: false
  },
  {
    id: '3',
    name: "Marvel's Spider-Man: Miles Morales",
    imageUrl: 'https://static.lumi.new/bc/bcec7b8be393005f399a2f5726184b8f.png',
    date: new Date('2025-11-15T18:30:00'),
    price: 300,
    originalPrice: 'R$ 249,90',
    rarity: 'rare',
    isRevealed: false
  },
  {
    id: '4',
    name: 'Dispatch',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: new Date('2025-11-15T09:55:00'),
    price: 100,
    originalPrice: 'R$ 59,90',
    rarity: 'common',
    isRevealed: false
  },
  {
    id: '5',
    name: "Marvel's Spider-Man Remastered",
    imageUrl: 'https://images.unsplash.com/photo-1605218427360-41d459d7e553?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: new Date('2025-11-12T15:39:00'),
    price: 300,
    originalPrice: 'R$ 299,90',
    rarity: 'rare',
    isRevealed: true,
    key: 'X7K9-M2P4-R9L1'
  }
];

function App() {
  const [credits, setCredits] = useState(5922);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'available' | 'used'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRedeem = (id: string) => {
    const game = games.find(g => g.id === id);
    if (!game) return;

    if (credits < game.price) {
      toast.error("Créditos insuficientes!");
      return;
    }

    const newKey = generateRandomKey();

    setCredits(prev => prev - game.price);
    setGames(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, isRevealed: true, key: newKey };
      }
      return g;
    }));

    toast.success((t) => (
      <div className="flex items-center gap-2">
        <span className="font-bold">Chave Gerada!</span>
        <span className="text-sm opacity-80">-{game.price} créditos</span>
      </div>
    ), {
      icon: '🎉',
      style: {
        background: '#1a1c23',
        color: '#fff',
        border: '1px solid #333',
      },
    });
  };

  const handleAddGame = (name: string, imageUrl: string) => {
    const newGame: Game = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      imageUrl,
      date: new Date(),
      price: 100,
      originalPrice: 'R$ 199,90',
      rarity: 'common',
      isRevealed: false
    };
    setGames(prev => [newGame, ...prev]);
    toast.success("Jogo adicionado com sucesso!");
  };

  const handleExportData = () => {
    const data = {
      credits,
      games,
      exportDate: new Date().toISOString(),
      project: "Steam Key Generator"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `steam-key-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Dados exportados (JSON)!");
  };

  const handleDownloadSource = () => {
    downloadProjectSource();
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
      const matchesTab = 
        filterTab === 'all' ? true :
        filterTab === 'available' ? !game.isRevealed :
        filterTab === 'used' ? game.isRevealed : true;
      
      return matchesSearch && matchesTab;
    });
  }, [games, search, filterTab]);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 p-4 md:p-8 font-sans selection:bg-neon selection:text-black relative overflow-hidden">
      {/* Corner Glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-neon/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-neon/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-neon/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-neon/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      
      <Toaster position="bottom-right" />
      
      <div className="max-w-6xl mx-auto">
        <Header credits={credits} />

        {/* Control Area */}
        <div className="flex flex-col items-center md:flex-row gap-4 mb-8">
          <div className="w-full md:flex-1">
            <Input 
              placeholder="Pesquisar jogo..." 
              icon={<Search className="w-5 h-5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button 
            className="h-12 px-6 w-full md:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            <Gamepad2 className="w-5 h-5 mr-2" />
            Adicionar Jogo
          </Button>
          
          <Button 
            variant="outline"
            className="h-12 px-6 border-slate-700 hover:bg-slate-800 text-slate-300 w-full md:w-auto"
            onClick={handleExportData}
          >
            <Download className="w-5 h-5 mr-2" />
            Backup .JSON
          </Button>

          <Button 
            variant="outline"
            className="h-12 px-6 border-slate-700 hover:bg-slate-800 text-slate-300 w-full md:w-auto"
            onClick={handleDownloadSource}
          >
            <FolderDown className="w-5 h-5 mr-2" />
            Baixar Projeto
          </Button>
        </div>

        {/* Listing Area */}
        <div className="bg-dark-card/50 border border-dark-border rounded-3xl p-6 shadow-2xl">
          {/* Filters */}
          <div className="flex flex-col items-center justify-center md:justify-between gap-6 mb-8">
            <div className="flex p-1 bg-dark-bg rounded-xl border border-dark-border">
              {(['all', 'available', 'used'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterTab === tab 
                      ? 'bg-neon text-black shadow-lg shadow-neon/20' 
                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab === 'all' ? 'Todos' : tab === 'available' ? 'Disponíveis' : 'Usadas'}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-auto relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Filtrar por nome..."
                className="bg-dark-bg border border-dark-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-neon/50 w-full md:w-64 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Game Grid */}
          <div className="space-y-3">
            {filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <GameRow 
                  key={game.id} 
                  game={game} 
                  onRedeem={handleRedeem}
                  canAfford={credits >= game.price}
                />
              ))
            ) : (
              <div className="text-center py-20 text-slate-500">
                <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Nenhum jogo encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddGameModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddGame}
      />
    </div>
  )
}

export default App
