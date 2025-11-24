import React, { useState } from 'react';
import {X} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, imageUrl: string) => void;
}

export const AddGameModal = ({ isOpen, onClose, onAdd }: AddGameModalProps) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && image) {
      onAdd(name, image);
      setName('');
      setImage('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Adicionar Novo Jogo</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Nome do Jogo</label>
            <Input 
              placeholder="Ex: Cyberpunk 2077" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">URL da Imagem</label>
            <Input 
              placeholder="https://..." 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar ao Banco
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
