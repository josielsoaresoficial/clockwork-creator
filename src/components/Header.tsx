import {ShoppingCart} from 'lucide-react';
import { Button } from './ui/Button';
import steamLogo from '@/assets/steam-logo.png';
import { Clock } from './Clock';

interface HeaderProps {
  credits: number;
}

export const Header = ({ credits }: HeaderProps) => {
  return (
    <header className="w-full py-4 md:py-6 flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8 px-4">
      {/* Logo and Clock */}
      <div className="flex flex-col items-center gap-3 md:gap-4 w-full md:flex-row md:w-auto">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-neon blur-lg opacity-20 rounded-full"></div>
            <img src={steamLogo} alt="Steam Logo" className="w-14 h-14 md:w-16 md:h-16 relative z-10" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none text-center md:text-left">
              Steam<br /><span className="text-neon">Key Generator</span>
            </h1>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
              Premium Access v2.4
            </span>
          </div>
        </div>
        <Clock />
      </div>

      {/* Credits Display */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-dark-card border border-dark-border rounded-full px-3 md:px-4 py-2 shadow-lg w-full max-w-sm md:w-auto md:max-w-none">
        <span className="text-xs md:text-sm text-slate-400 font-medium">Créditos disponíveis:</span>
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-bold text-neon tabular-nums">
            {credits.toLocaleString('pt-BR')}
          </span>
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-neon" />
        </div>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500 hover:text-white">
          +
        </Button>
      </div>
    </header>
  );
};
