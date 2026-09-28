import React, { useState } from 'react';
import { Venue, Message } from '../types';
import { speechService } from '../services/speechService';

interface HistoryScreenProps {
  venues: Venue[];
  messagesMap: Record<string, Message[]>;
  onSelectVenue: (venue: Venue) => void;
  onOpenInstitutionModal: (venue: Venue) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  venues,
  messagesMap,
  onSelectVenue,
  onOpenInstitutionModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeExpandedVenue, setActiveExpandedVenue] = useState<string | null>(venues[0]?.id || null);

  const filteredVenues = venues.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.counter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'Semua Loket' },
    { id: 'cafe', label: 'Kafe' },
    { id: 'pharmacy', label: 'Farmasi & Medis' },
    { id: 'transit', label: 'Transportasi' },
    { id: 'bakery', label: 'Bakery' },
  ];

  const handleReplayConversationAudio = (text: string) => {
    speechService.triggerHaptic(15);
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-28 gap-4 max-w-md mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-[26px] font-extrabold text-[#141b2b] tracking-tight">
            Riwayat Percakapan
          </h2>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
            Replay MVP
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Putar ulang rekaman suara, lihat ringkasan instruksi, dan akses data institusi.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama tempat, nomor loket, atau kata kunci..."
          className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Venues & Transcripts List */}
      <div className="flex flex-col gap-3">
        {filteredVenues.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">history</span>
            <p className="text-sm font-semibold text-slate-700">Tidak ada riwayat ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Gunakan kata kunci pencarian lain</p>
          </div>
        ) : (
          filteredVenues.map((venue) => {
            const isExpanded = activeExpandedVenue === venue.id;
            const messages = messagesMap[venue.id] || [];

            return (
              <div
                key={venue.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
              >
                {/* Header card info */}
                <div
                  onClick={() => setActiveExpandedVenue(isExpanded ? null : venue.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-13 h-13 rounded-2xl object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-bold text-slate-900">{venue.name}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {venue.counter}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {venue.lastActive} · {messages.length} pesan
                      </p>
                      <p className="text-[11px] text-[#006a61] font-semibold">{venue.audioMode}</p>
                    </div>
                  </div>

                  <span className="material-symbols-outlined text-slate-400">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                {/* Expanded Transcript Log with Replay Functionality */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Transkrip Tersimpan (Replay Conversation):
                      </span>
                      {venue.institutionData && (
                        <button
                          onClick={() => onOpenInstitutionModal(venue)}
                          className="text-[11px] text-purple-700 font-bold flex items-center gap-0.5 hover:underline"
                        >
                          <span className="material-symbols-outlined text-[14px]">apartment</span>
                          Basis Data Institusi
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-2xl text-xs ${
                            msg.sender === 'staff'
                              ? 'bg-white border border-slate-200 text-slate-900 mr-3'
                              : 'bg-blue-600 text-white ml-3'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1 opacity-80 text-[10px]">
                            <span className="font-bold uppercase tracking-wider">
                              {msg.sender === 'staff' ? 'Petugas Konter' : 'Zara (Anda)'}
                            </span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p className="font-semibold text-sm leading-snug">"{msg.text}"</p>

                          {/* Replay Conversation Button */}
                          <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReplayConversationAudio(msg.text);
                              }}
                              className={`flex items-center gap-1 text-[11px] font-bold ${
                                msg.sender === 'user'
                                  ? 'text-white/90 hover:text-white underline'
                                  : 'text-blue-700 hover:text-blue-900 underline'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">replay</span>
                              Replay Audio Percakapan
                            </button>
                            {msg.detectedLang && (
                              <span className="text-[10px] opacity-75">{msg.detectedLang}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Resume / Connect Button */}
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => onSelectVenue(venue)}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-98"
                      >
                        <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
                        Buka di Mode HearMe Talk
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
