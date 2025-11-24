import {ShoppingCart} from 'lucide-react';
import { Button } from './ui/Button';
import steamLogo from '@/assets/steam-logo.png';
import { Clock } from './Clock';

interface HeaderProps {
  credits: number;
}

export const Header = ({ credits }: HeaderProps) => {
  return (
    <header className="w-full py-6 flex flex-col items-center justify-center md:flex-row md:justify-between gap-4 mb-8">
      {/* Logo and Clock */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center w-full md:w-auto">
        <div className="flex items-center gap-3 justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-neon blur-lg opacity-20 rounded-full"></div>
            <img src={steamLogo} alt="Steam Logo" className="w-16 h-16 relative z-10" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
              Steam <span className="text-neon">Key Generator</span>
            </h1>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
              Premium Access v2.4
            </span>
          </div>
        </div>
        <Clock />
      </div>

      {/* Credits Display */}
      <div className="flex items-center gap-4 bg-dark-card border border-dark-border rounded-full px-6 py-2 shadow-lg w-full md:w-auto justify-center">
        <span className="text-sm text-slate-400 font-medium">Créditos disponíveis:</span>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-neon tabular-nums">
            {credits.toLocaleString('pt-BR')}
          </span>
          <ShoppingCart className="w-4 h-4 text-neon" />
        </div>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full ml-2 text-slate-500 hover:text-white">
          +
        </Button>
      </div>
    </header>
  );
};
