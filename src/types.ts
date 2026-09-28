export type UserDisabilityProfile = 'tunarungu' | 'tunawicara' | 'tunanetra' | 'multisensory';

export interface Message {
  id: string;
  sender: 'staff' | 'user' | 'system';
  text: string;
  timestamp: string;
  confidence?: number;
  audioPlayed?: boolean;
  summary?: string;
  detectedLang?: string;
  sopReference?: string;
}

export interface VenueInstitutionData {
  institutionCode: string;
  organizationName: string;
  sopHighlights: {
    serviceName: string;
    flow: string[];
    priorityNotice: string;
  }[];
  floorMap: {
    room: string;
    description: string;
    counterLocation: string;
  };
  contactPerson: string;
  internalDatabaseLinked: boolean;
}

export interface Venue {
  id: string;
  name: string;
  counter: string;
  category: 'cafe' | 'pharmacy' | 'bakery' | 'transit' | 'retail' | 'hospital' | 'bank';
  image: string;
  status: 'active' | 'completed';
  lastActive: string;
  messagesCount: number;
  staffName?: string;
  audioMode: string;
  address: string;
  suggestedPhrases: string[];
  institutionData?: VenueInstitutionData;
}

export interface Phrase {
  id: string;
  text: string;
  category: 'general' | 'cafe' | 'pharmacy' | 'emergency' | 'assistive';
  icon?: string;
}

export interface AppSettings {
  voice: string;
  speechRate: number;
  speechPitch: number;
  counterVolume: number;
  fontSize: 'standard' | 'large' | 'extra-large';
  hapticFeedback: boolean;
  binauralAssist: boolean;
  autoTranscribe: boolean;
  highContrast: boolean;
  screenReaderVoice: boolean;
  autoDetectLanguage: boolean;
  disabilityFocus: UserDisabilityProfile;
}

export interface VisionDocumentResult {
  title: string;
  institution: string;
  readText: string;
  importantWarnings: string;
  audioNarration: string;
}
