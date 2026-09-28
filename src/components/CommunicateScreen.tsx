import React, { useState, useEffect, useRef } from 'react';
import { Venue, Message, AppSettings } from '../types';
import { speechService } from '../services/speechService';
import { SIMULATED_STAFF_PROMPTS } from '../data/mockData';


interface CommunicateScreenProps {
  venue: Venue;
  messages: Message[];
  settings: AppSettings;
  onBackToHome: () => void;
  onOpenClerkMirror: () => void;
  onOpenInstitutionModal: () => void;
  onOpenVisionModal: () => void;
  onAddMessage: (sender: 'staff' | 'user', text: string, extra?: Partial<Message>) => void;
  onSwitchVenue: (venueId: string) => void;
  venues: Venue[];
}

export const CommunicateScreen: React.FC<CommunicateScreenProps> = ({
  venue,
  messages,
  settings,
  onBackToHome,
  onOpenClerkMirror,
  onOpenInstitutionModal,
  onOpenVisionModal,
  onAddMessage,
  onSwitchVenue,
  venues,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  
  const [fontSizeScale, setFontSizeScale] = useState<'standard' | 'large' | 'huge'>(
    settings.fontSize === 'extra-large' ? 'huge' : settings.fontSize === 'large' ? 'large' : 'standard'
  );
  const [showVenueSelector, setShowVenueSelector] = useState(false);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [activeVoice, setActiveVoice] = useState(settings.voice);
  const [audioFeedbackNotice, setAudioFeedbackNotice] = useState<string | null>(null);
  

  // Predictive Response Generator state (Premium MVP)
  const [predictiveReplies, setPredictiveReplies] = useState<string[]>([
    'Dine-in, tolong.',
    'Bisa tolong ulangi lebih lambat?',
    'Berapa total biayanya?',
    'Terima kasih banyak atas bantuannya.',
  ]);
  const [isGeneratingPredictive, setIsGeneratingPredictive] = useState(false);

  // AI Summarize state (Premium MVP)
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<{ summary: string; points: string[] } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const staffMessages = messages.filter((m) => m.sender === 'staff');
  const userMessages = messages.filter((m) => m.sender === 'user');
  const latestStaff = staffMessages[staffMessages.length - 1];
  const latestUser = userMessages[userMessages.length - 1];

  // Auto fetch predictive replies whenever staff speaks
  useEffect(() => {
    if (latestStaff) {
      fetchPredictiveReplies(latestStaff.text);
    }
  }, [latestStaff?.id]);

  const fetchPredictiveReplies = async (staffText: string) => {
    setIsGeneratingPredictive(true);
    try {
      const res = await fetch('/api/ai/predictive-replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffMessage: staffText,
          venueName: venue.name,
          userMode: settings.disabilityFocus,
        }),
      });
      const data = await res.json();
      if (data.replies && Array.isArray(data.replies)) {
        setPredictiveReplies(data.replies);
      }
    } catch {
      // Fallback local smart options
      setPredictiveReplies([
        'Dine-in, tolong.',
        'Bisa bayar pakai QRIS?',
        'Tolong ulangi kalimat terakhir.',
        'Terima kasih banyak.',
      ]);
    } finally {
      setIsGeneratingPredictive(false);
    }
  };

  const handleSummarizeStaffMessage = async (text: string) => {
    setIsSummarizing(true);
    speechService.triggerHaptic(20);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, audience: settings.disabilityFocus }),
      });
      const data = await res.json();
      setCurrentSummary({
        summary: data.summary || 'Instruksi telah diringkas untuk Anda.',
        points: data.bulletPoints || ['Poin instruksi berhasil dipahami.'],
      });

      // Tunanetra screen reader auto-narration if enabled
      if (settings.screenReaderVoice || settings.disabilityFocus === 'tunanetra') {
        speechService.speak(`Ringkasan AI: ${data.summary}`);
      }
    } catch {
      setCurrentSummary({
        summary: 'Ringkasan: Silakan ikuti arahan petugas di konter.',
        points: ['Patuhi alur pelayanan loket.', 'Simpan bukti transaksi Anda.'],
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSpeakToStaff = (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend) return;

    setIsSpeaking(true);
    speechService.triggerHaptic(25);

    // Add to message log (HearMe Voice MVP)
    onAddMessage('user', textToSend);

    // Speak out loud through counter speaker
    speechService.speak(textToSend, {
      rate: settings.speechRate,
      pitch: settings.speechPitch,
      volume: settings.counterVolume / 100,
      voiceName: activeVoice,
      onEnd: () => {
        setIsSpeaking(false);
        setAudioFeedbackNotice('Suara tersampaikan jernih ke speaker konter petugas');
        setTimeout(() => setAudioFeedbackNotice(null), 3500);
      },
      onError: () => setIsSpeaking(false),
    });

    if (!customText) setInputText('');

    // Simulate staff response (HearMe Talk MVP real-time transcription)
    setTimeout(() => {
      const randomPrompt =
        SIMULATED_STAFF_PROMPTS[Math.floor(Math.random() * SIMULATED_STAFF_PROMPTS.length)];
      onAddMessage('staff', randomPrompt, {
        detectedLang: settings.autoDetectLanguage ? 'Bahasa Indonesia (Auto-detected)' : undefined,
      });
      speechService.playChime(680, 160);
      speechService.triggerHaptic(15);
    }, 2400);
  };

  const handleReplay = (text: string) => {
    speechService.triggerHaptic(15);
    speechService.speak(text, {
      voiceName: activeVoice,
      volume: settings.counterVolume / 100,
    });
  };

  const cycleFontSize = () => {
    if (fontSizeScale === 'standard') setFontSizeScale('large');
    else if (fontSizeScale === 'large') setFontSizeScale('huge');
    else setFontSizeScale('standard');
    speechService.triggerHaptic(10);
  };

  const fontClasses = {
    standard: 'text-[20px] leading-[28px]',
    large: 'text-[24px] leading-[32px]',
    huge: 'text-[28px] leading-[38px]',
  }[fontSizeScale];

  return (
    <div className="flex flex-col w-full px-4 pt-18 pb-32 gap-3.5 max-w-md mx-auto">
      {/* ================= VENUE HEADER ROW ================= */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToHome}
            aria-label="Back to Home"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 active:scale-90 transition-transform hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowVenueSelector(!showVenueSelector)}
              className="flex items-center gap-1.5 text-left group"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[19px] font-bold text-[#141b2b] tracking-tight group-hover:text-blue-700 transition-colors">
                    {venue.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                    {venue.counter}
                  </span>
                  <span className="material-symbols-outlined text-slate-400 text-[18px]">
                    arrow_drop_down
                  </span>
                </div>
                {/* <p className="text-[11px] text-[#006a61] font-semibold tracking-tight">
                  {venue.audioMode}
                </p> */}
              </div>
            </button>

            {/* Venue Dropdown */}
            {showVenueSelector && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-30">
                <span className="text-[10px] font-bold uppercase text-slate-400 px-3 py-1 block">
                  Pilih Loket / Konter Aktif
                </span>
                {venues.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSwitchVenue(v.id);
                      setShowVenueSelector(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-xs font-semibold ${
                      v.id === venue.id ? 'text-blue-700 bg-blue-50/70' : 'text-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">storefront</span>
                    <div>
                      <p>{v.name}</p>
                      <p className="text-[10px] text-slate-400">{v.counter}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Audio toggle pill */}
        <button
          onClick={() => {
            setIsListeningMic(!isListeningMic);
            speechService.triggerHaptic(15);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
            isListeningMic
              ? 'bg-teal-50 text-[#006f66] border border-teal-200'
              : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isListeningMic ? 'bg-[#006a61] animate-pulse' : 'bg-slate-400'
            }`}
          />
          {/* <span>{isListeningMic ? 'HearMe Talk (Live)' : 'Audio Jeda'}</span> */}
          <span>
            {isListeningMic
              ? 'Sedang Mendengarkan...'
              : 'Mulai Mendengarkan'}
          </span>
        </button>
      </div>

      {/* ================= ACTION BAR: DUAL FACING & INSTITUTION SOP ================= */}
      {/* <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenClerkMirror}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200/70 text-blue-800 text-xs font-bold transition-all active:scale-98 shadow-2xs"
        >
          <span className="material-symbols-outlined text-[18px]">screen_rotation</span>
          <span>Mirror to Clerk (180°)</span>
        </button>

        <button
          onClick={onOpenInstitutionModal}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200/70 text-purple-800 text-xs font-bold transition-all active:scale-98 shadow-2xs"
        >
          <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
          <span>SOP &amp; Peta Lokasi</span>
        </button>
      </div> */}

      {/* ================= 1. STAFF IS SPEAKING CARD (HearMe Talk MVP) ================= */}
      {isListeningMic && (
      <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-[0_4px_20px_rgba(20,27,43,0.06)] border border-slate-100 flex flex-col gap-3">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-bold text-blue-800 uppercase tracking-wider">
                  Petugas Berbicara
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                  HearMe Talk
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Akurasi Suara · {latestStaff?.confidence || 98}%
                {settings.autoDetectLanguage && ' · Bahasa Indonesia'}
              </span>
            </div>
          </div>

          {/* Equalizer Waveform */}
          <div className="flex items-end gap-1 h-5 px-1">
            <span className="w-1 bg-[#006a61] rounded-full animate-eq-1"></span>
            <span className="w-1 bg-[#006a61] rounded-full animate-eq-2"></span>
            <span className="w-1 bg-[#006a61] rounded-full animate-eq-3"></span>
            <span className="w-1 bg-[#006a61] rounded-full animate-eq-4"></span>
          </div>
        </div>

        {/* Live Staff Speech Content */}
        <div className="py-2">
          <p className={`${fontClasses} font-bold text-[#141b2b] tracking-tight`}>
            {latestStaff ? `“${latestStaff.text}”` : '“Selamat datang di konter! Ada yang bisa kami bantu?”'}
          </p>
        </div>

        {/* AI Summarize Action Button (Premium MVP) */}
        {latestStaff && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <button
              onClick={() => handleSummarizeStaffMessage(latestStaff.text)}
              disabled={isSummarizing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-amber-900 text-xs font-bold hover:shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">
                {isSummarizing ? 'hourglass_top' : 'auto_awesome'}
              </span>
              <span>{isSummarizing ? 'Meringkas...' : 'AI Summarize (Ringkas Cepat)'}</span>
            </button>

            <button
              onClick={cycleFontSize}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold active:scale-95 transition-all"
              title="Perbesar Ukuran Huruf untuk Jarak Jauh"
            >
              <span className="material-symbols-outlined text-[15px]">text_fields</span>
              <span>{fontSizeScale === 'standard' ? 'A+' : fontSizeScale === 'large' ? 'A++' : 'A'}</span>
            </button>
          </div>
        )}

        {/* AI Summary Card Box */}
        {currentSummary && (
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1 text-amber-800">
                <span className="material-symbols-outlined text-[16px]">summarize</span>
                Ringkasan Inti Instruksi Petugas:
              </span>
              <button
                onClick={() => setCurrentSummary(null)}
                className="text-[10px] text-amber-700 font-bold hover:underline"
              >
                Tutup
              </button>
            </div>
            <p className="font-semibold text-slate-900 leading-snug">
              {currentSummary.summary}
            </p>
            {currentSummary.points.length > 0 && (
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                {currentSummary.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      )}

      {/* ================= 2. PREDICTIVE RESPONSE GENERATOR (Premium MVP) ================= */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">psychology</span>
            <span className="text-[13px] font-bold text-[#141b2b]">
              Saran Jawaban Cepat
            </span>
          </div>
          {/* <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            AI Cepat 1-Ketuk
          </span> */}
        </div>

        {/* Predictive Response Pill Carousel */}
        <div className="grid grid-cols-2 gap-2">
          {predictiveReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSpeakToStaff(reply)}
              className="p-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/40 text-left text-xs font-semibold text-slate-800 shadow-2xs active:scale-95 transition-all flex items-center justify-between group"
            >
              <span className="truncate pr-1">“{reply}”</span>
              <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-600 shrink-0">
                send
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= 3. YOU RESPONDED CARD (Replay Conversation MVP) ================= */}
      {latestUser && (
        <div className="relative overflow-hidden rounded-3xl bg-blue-50/50 p-5 border border-blue-100 shadow-[0_2px_12px_rgba(29,78,216,0.04)] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-[12px] font-bold text-blue-900 uppercase tracking-wider">
                Anda Merespons
              </span>
              {/* <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-200/60 text-blue-900">
                HearMe Voice
              </span> */}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#006a61]">
              <span className="material-symbols-outlined text-[15px]">volume_up</span>
              <span>Speaker Konter Aktif</span>
            </div>
          </div>

          <p className="text-[18px] sm:text-[20px] font-bold text-[#141b2b] tracking-tight leading-snug">
            “{latestUser.text}”
          </p>

          <div className="flex items-center justify-between border-t border-blue-100/70 pt-2 text-xs text-slate-500">
            <span>Disampaikan pukul {latestUser.timestamp}</span>
            {/* Replay Conversation Feature */}
            <button
              onClick={() => handleReplay(latestUser.text)}
              className="flex items-center gap-1 text-blue-700 font-bold hover:underline active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">replay</span>
              Replay Suara Konter
            </button>
          </div>
        </div>
      )}

      {/* ================= 4. AUDIO DELIVERY FEEDBACK STRIP ================= */}
      {/* <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-teal-50 border border-teal-200/70 text-[#006f66] text-xs font-semibold shadow-2xs">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#006a61]">check_circle</span>
          <span>{audioFeedbackNotice || 'Audio tersambung ke speaker konter petugas'}</span>
        </div>
        {/* <div className="flex items-center gap-1 font-bold">
          <span>Volume {settings.counterVolume}%</span>
        </div> 
      </div> */}

      {/* ================= 5. RESPONSE INPUT TRAY (HearMe Voice MVP) ================= */}
      <div className="rounded-3xl bg-white p-4 shadow-[0_6px_24px_rgba(20,27,43,0.06)] border border-slate-100 flex flex-col gap-3">
        {/* Input Textarea */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSpeakToStaff();
              }
            }}
            rows={2}
            placeholder="Ketik pesan Anda untuk diucapkan bersuara ke petugas konter..."
            className="w-full p-3.5 pr-8 rounded-2xl bg-slate-50 border border-slate-200/80 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none"
          />

          {inputText && (
            <button
              onClick={() => setInputText('')}
              className="absolute top-3.5 right-3 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs hover:bg-slate-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Voice Selector Pill Row */}
        <div className="flex items-center justify-between text-xs text-slate-600 relative">
          <button
            onClick={() => setShowVoiceSelector(!showVoiceSelector)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-500">tune</span>
            <span className="truncate max-w-[200px]">Suara: {activeVoice}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
          </button>

          {showVoiceSelector && (
            <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-40 max-h-56 overflow-y-auto">
              <span className="text-[10px] font-bold text-slate-400 px-2 uppercase block">
                Pilih Profil Suara TTS
              </span>
              {[
                'Natural Warm (Indonesian / English)',
                'Jernih Ramah (Id-ID)',
                'Suara Sopan Santun (Id-ID)',
                'Calm Clarity (En-GB)',
              ].map((vName, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveVoice(vName);
                    setShowVoiceSelector(false);
                    speechService.speak('Profil suara HearMe aktif', { voiceName: vName });
                  }}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-blue-50 text-slate-800 truncate"
                >
                  {vName}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={onOpenVisionModal}
            className="flex items-center gap-1 text-blue-700 font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Vision / OCR
          </button>
        </div>

        {/* Big Tap to Speak CTA Button */}
        <button
          onClick={() => handleSpeakToStaff()}
          disabled={!inputText.trim()}
          className={`w-full py-3.5 px-4 rounded-full flex flex-col items-center justify-center gap-0.5 shadow-[0_6px_20px_rgba(29,78,216,0.28)] transition-all ${
            inputText.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-98 cursor-pointer'
              : 'bg-blue-600/40 text-white/80 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[22px] ${isSpeaking ? 'animate-bounce' : ''}`}>
              volume_up
            </span>
            <span className="text-[16px] font-bold tracking-tight">HearMe Voice: Ucapkan ke Petugas</span>
          </div>
          <span className="text-[11px] text-blue-100 font-medium">
            Mengonversi teks menjadi suara jernih di meja konter
          </span>
        </button>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};
