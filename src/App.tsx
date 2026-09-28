/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CommunicateScreen } from './components/CommunicateScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ClerkMirrorModal } from './components/ClerkMirrorModal';
import { QrScannerModal } from './components/QrScannerModal';
import { EnterCodeModal } from './components/EnterCodeModal';
import { PhrasesModal } from './components/PhrasesModal';
import { ProfileModal } from './components/ProfileModal';
import { InstitutionModal } from './components/InstitutionModal';
import { VisionModal } from './components/VisionModal';
import {
  INITIAL_VENUES,
  INITIAL_MESSAGES,
  DEFAULT_SAVED_PHRASES,
} from './data/mockData';
import { Venue, Message, Phrase, AppSettings } from './types';
import { speechService } from './services/speechService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'talk' | 'history' | 'settings'>('home');
  const [venues, setVenues] = useState<Venue[]>(INITIAL_VENUES);
  const [selectedVenue, setSelectedVenue] = useState<Venue>(INITIAL_VENUES[0]);
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [savedPhrases, setSavedPhrases] = useState<Phrase[]>(DEFAULT_SAVED_PHRASES);

  // App Settings tailored for Tunarungu, Tunawicara, and Tunanetra
  const [settings, setSettings] = useState<AppSettings>({
    voice: 'Natural Warm (Indonesian / English)',
    speechRate: 1.0,
    speechPitch: 1.0,
    counterVolume: 85,
    fontSize: 'standard',
    hapticFeedback: true,
    binauralAssist: true,
    autoTranscribe: true,
    highContrast: false,
    screenReaderVoice: true,
    autoDetectLanguage: true,
    disabilityFocus: 'tunarungu',
  });

  // Modal States
  const [isClerkMirrorOpen, setIsClerkMirrorOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isEnterCodeOpen, setIsEnterCodeOpen] = useState(false);
  const [isPhrasesModalOpen, setIsPhrasesModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInstitutionModalOpen, setIsInstitutionModalOpen] = useState(false);
  const [selectedInstitutionVenue, setSelectedInstitutionVenue] = useState<Venue>(INITIAL_VENUES[0]);
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false);

  // Add Message Handler (HearMe Talk & HearMe Voice)
  const handleAddMessage = (sender: 'staff' | 'user', text: string, extra?: Partial<Message>) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: sender === 'staff' ? 98 : undefined,
      ...extra,
    };

    setMessagesMap((prev) => {
      const currentList = prev[selectedVenue.id] || [];
      return {
        ...prev,
        [selectedVenue.id]: [...currentList, newMessage],
      };
    });

    // Update Venue stats
    setVenues((prev) =>
      prev.map((v) =>
        v.id === selectedVenue.id
          ? {
              ...v,
              lastActive: 'Baru saja',
              messagesCount: (messagesMap[selectedVenue.id] || []).length + 1,
            }
          : v
      )
    );
  };

  // Switch Venue
  const handleSelectVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setActiveTab('talk');
  };

  const handleOpenInstitutionModal = (venue: Venue) => {
    setSelectedInstitutionVenue(venue);
    setIsInstitutionModalOpen(true);
  };

  const handleUpdateSettings = (newVals: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newVals }));
  };

  const handleAddPhrase = (phrase: Phrase) => {
    setSavedPhrases((prev) => [phrase, ...prev]);
  };

  const handleDeletePhrase = (id: string) => {
    setSavedPhrases((prev) => prev.filter((p) => p.id !== id));
  };

  const currentMessages = messagesMap[selectedVenue.id] || [];

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#141b2b] flex flex-col relative select-none">
      {/* Persistent App Header */}
      <Header
        activeTab={activeTab}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col w-full">
        {activeTab === 'home' && (
          <HomeScreen
            venues={venues}
            savedPhrases={savedPhrases}
            onStartConversation={(v) => {
              if (v) setSelectedVenue(v);
              setActiveTab('talk');
              speechService.triggerHaptic(15);
            }}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
            onOpenEnterCode={() => setIsEnterCodeOpen(true)}
            onOpenPhrasesModal={() => setIsPhrasesModalOpen(true)}
            onOpenClerkMirror={() => setIsClerkMirrorOpen(true)}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
            onOpenInstitutionModal={handleOpenInstitutionModal}
            onSeeAllHistory={() => setActiveTab('history')}
          />
        )}

        {activeTab === 'talk' && (
          <CommunicateScreen
            venue={selectedVenue}
            venues={venues}
            messages={currentMessages}
            settings={settings}
            onBackToHome={() => setActiveTab('home')}
            onOpenClerkMirror={() => setIsClerkMirrorOpen(true)}
            onOpenInstitutionModal={() => handleOpenInstitutionModal(selectedVenue)}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
            onAddMessage={handleAddMessage}
            onSwitchVenue={(id) => {
              const target = venues.find((v) => v.id === id);
              if (target) setSelectedVenue(target);
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoryScreen
            venues={venues}
            messagesMap={messagesMap}
            onSelectVenue={(v) => {
              setSelectedVenue(v);
              setActiveTab('talk');
            }}
            onOpenInstitutionModal={handleOpenInstitutionModal}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenVisionModal={() => setIsVisionModalOpen(true)}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ================= Interactive Modals ================= */}
      <ClerkMirrorModal
        isOpen={isClerkMirrorOpen}
        onClose={() => setIsClerkMirrorOpen(false)}
        venue={selectedVenue}
        messages={currentMessages}
        onAddMessage={handleAddMessage}
      />

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        venues={venues}
        onSelectVenue={handleSelectVenue}
      />

      <EnterCodeModal
        isOpen={isEnterCodeOpen}
        onClose={() => setIsEnterCodeOpen(false)}
        venues={venues}
        onSelectVenue={handleSelectVenue}
      />

      <PhrasesModal
        isOpen={isPhrasesModalOpen}
        onClose={() => setIsPhrasesModalOpen(false)}
        phrases={savedPhrases}
        onAddPhrase={handleAddPhrase}
        onDeletePhrase={handleDeletePhrase}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <InstitutionModal
        isOpen={isInstitutionModalOpen}
        onClose={() => setIsInstitutionModalOpen(false)}
        venueName={selectedInstitutionVenue.name}
        data={selectedInstitutionVenue.institutionData}
      />

      <VisionModal
        isOpen={isVisionModalOpen}
        onClose={() => setIsVisionModalOpen(false)}
      />
    </div>
  );
}
