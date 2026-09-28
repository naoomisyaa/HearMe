import React, { useState } from 'react';
import { Phrase } from '../types';
import { speechService } from '../services/speechService';

interface PhrasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  phrases: Phrase[];
  onAddPhrase: (phrase: Phrase) => void;
  onDeletePhrase: (id: string) => void;
  onSelectPhrase?: (text: string) => void;
}

export const PhrasesModal: React.FC<PhrasesModalProps> = ({
  isOpen,
  onClose,
  phrases,
  onAddPhrase,
  onDeletePhrase,
  onSelectPhrase,
}) => {
  const [newText, setNewText] = useState('');
  const [category, setCategory] = useState<'general' | 'cafe' | 'pharmacy'>('general');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const phrase: Phrase = {
      id: `p-${Date.now()}`,
      text: newText.trim(),
      category,
      icon: category === 'cafe' ? 'local_cafe' : category === 'pharmacy' ? 'medication' : 'chat',
    };
    onAddPhrase(phrase);
    setNewText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[24px]">bookmark</span>
            <h3 className="text-lg font-bold text-slate-900">Saved Quick Phrases</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Add New Phrase Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-600">Add New Quick Phrase</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="e.g. Can I get the receipt, please?"
              className="flex-1 h-11 px-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-4 h-11 bg-blue-600 text-white rounded-xl font-bold text-xs active:scale-95 transition-transform"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2">
            {(['general', 'cafe', 'pharmacy'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </form>

        {/* List of Phrases */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {phrases.map((phrase) => (
            <div
              key={phrase.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 transition-colors group"
            >
              <button
                onClick={() => {
                  if (onSelectPhrase) {
                    onSelectPhrase(phrase.text);
                    onClose();
                  } else {
                    speechService.speak(phrase.text);
                  }
                }}
                className="flex-1 text-left flex items-center gap-2.5"
              >
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  record_voice_over
                </span>
                <span className="text-sm font-semibold text-slate-800">"{phrase.text}"</span>
              </button>
              <button
                onClick={() => onDeletePhrase(phrase.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
