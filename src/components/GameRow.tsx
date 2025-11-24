import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {Copy, Check, Lock, Key} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { cn, formatDate, generateRandomKey } from '@/lib/utils';
import toast from 'react-hot-toast';

export interface Game {
  id: string;
  name: string;
  imageUrl: string;
  date: Date;
  price: number;
  originalPrice: string;
  rarity: 'common' | 'rare' | 'legendary';
  isRevealed: boolean;
  key?: string;
}

interface GameRowProps {
  game: Game;
  onRedeem: (id: string) => void;
  canAfford: boolean;
}

export const GameRow = ({ game, onRedeem, canAfford }: GameRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [displayKey, setDisplayKey] = useState('');
  const [copied, setCopied] = useState(false);

  // Gacha animation effect
  useEffect(() => {
    if (game.isRevealed && !game.key) {
      // If revealed but key not set in UI yet (transition state), handle it
    }
  }, [game.isRevealed]);

  const handleRedeemClick = async () => {
    if (!canAfford) {
      toast.error("Créditos insuficientes!");
      return;
    }

    setRevealing(true);
    
    // Gacha animation simulation
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      setDisplayKey(generateRandomKey());
      step++;
      if (step >= steps) {
        clearInterval(timer);
        onRedeem(game.id);
        setRevealing(false);
      }
    }, interval);
  };

  const handleCopy = () => {
    if (game.key) {
      navigator.clipboard.writeText(game.key);
      setCopied(true);
      toast.success("Chave copiada!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rarityColor = {
    common: "border-slate-700",
    rare: "border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    legendary: "border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-xl bg-dark-card border transition-all duration-300",
        isHovered ? "border-slate-600 bg-slate-800/50" : "border-dark-border",
        game.isRevealed ? "border-l-4 border-l-neon" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Date */}
      <div className="md:col-span-2 flex flex-col">
        <span className="text-xs font-mono text-slate-500">{formatDate(game.date)}</span>
        <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider mt-1">
          ID: #{game.id.slice(0, 6)}
        </span>
      </div>

      {/* Game Info */}
      <div className="md:col-span-5 flex items-center gap-4">
        <div className={cn("relative w-16 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0", rarityColor[game.rarity])}>
          <img src={game.imageUrl} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-white group-hover:text-neon transition-colors truncate pr-4">
            {game.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant={game.rarity}>{game.rarity}</Badge>
            <span className="text-xs text-slate-500 line-through">{game.originalPrice}</span>
          </div>
        </div>
      </div>

      {/* Key / Action Area */}
      <div className="md:col-span-5 flex items-center justify-end gap-3">
        {game.isRevealed ? (
          <div className="flex items-center gap-3 w-full justify-end animate-in fade-in slide-in-from-bottom-2">
            <div className="flex-1 max-w-[240px] bg-black/40 rounded-lg border border-neon/30 px-4 py-2 font-mono text-neon text-center tracking-widest text-lg relative overflow-hidden group/key">
              {game.key}
              <div className="absolute inset-0 bg-neon/10 translate-x-[-100%] group-hover/key:translate-x-[100%] transition-transform duration-1000" />
            </div>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={handleCopy}
              className={cn("transition-all", copied ? "text-green-400 border-green-400" : "")}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        ) : (
          revealing ? (
            <div className="flex items-center gap-3 w-full justify-end">
              <div className="font-mono text-neon animate-pulse tracking-widest text-lg">
                {displayKey}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 w-full justify-end">
              <div className="hidden md:block flex-1 h-10 bg-slate-800/50 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center gap-2">
                  <span className="text-slate-600 text-xs font-mono tracking-[0.2em]">••••-••••-••••</span>
                </div>
              </div>
              <Button 
                onClick={handleRedeemClick}
                disabled={!canAfford}
                className={cn("min-w-[120px]", !canAfford && "opacity-50")}
              >
                {canAfford ? (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Resgatar
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Locked
                  </>
                )}
              </Button>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};
