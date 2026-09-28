import { Venue, Phrase, Message } from '../types';

export const HEARME_LOGO = "/src/assets/images/zara_user_avatar_1790588736175.jpg";

export const USER_PROFILE = {
  name: "Zara",
  fullName: "Zara Putri Sahriar",
  avatar: "/src/assets/images/zara_user_avatar_1790588736175.jpg",
  assistMode: "Tunarungu & Tunawicara Multi-Assist",
  hearingProfile: "Severe Bilateral Hearing Loss & Non-vocal",
  preferredVoice: "Natural Warm (Indonesian / English)",
  activeProfile: "tunarungu" as const,
};

export const INITIAL_VENUES: Venue[] = [
  {
    id: "kopi-ruang",
    name: "Kopi Ruang",
    counter: "Counter 01",
    category: "cafe",
    image: "/src/assets/images/kopi_ruang_cafe_1790588654815.jpg",
    status: "active",
    lastActive: "Today, 10:43 AM",
    messagesCount: 4,
    staffName: "Barista Dimas",
    audioMode: "Binaural Assist & Induction Loop",
    address: "Jl. Senopati No. 42, Kebayoran Baru",
    suggestedPhrases: [
      "Dine-in, tolong. Oat milk flat white tanpa gula.",
      "Bisa tolong es batunya dipisah?",
      "Bisa tolong ulangi dengan lebih pelan?",
      "Bisa bayar dengan QRIS atau kartu debit?",
    ],
    institutionData: {
      institutionCode: "INST-KR-01",
      organizationName: "Kopi Ruang Specialty Coffee Roastery",
      internalDatabaseLinked: true,
      contactPerson: "Dimas (Store Manager)",
      floorMap: {
        room: "Lantai 1 - Counter Utama",
        description: "Meja bar espresso terletak 3 meter tepat di depan pintu masuk utama berubin terakota. Toilet aksesibel di sebelah kiri koridor.",
        counterLocation: "Kasir & Pick-up station nomor 1",
      },
      sopHighlights: [
        {
          serviceName: "SOP Layanan Prioritas Disabilitas",
          flow: [
            "1. Sambut dengan kontak mata dan gestur ramah.",
            "2. Aktifkan terminal HearMe Clerk Mirror.",
            "3. Konfirmasi pesanan dan preferensi alergi susu/sirup.",
            "4. Serahkan tanda nomor meja getar (haptic buzzer).",
          ],
          priorityNotice: "Pelanggan disabilitas mendapatkan prioritas meja ramah kursi roda dan layanan pengantaran langsung ke meja.",
        },
      ],
    },
  },
  {
    id: "central-pharmacy",
    name: "Central Pharmacy & Clinic",
    counter: "Consultation Desk 03",
    category: "pharmacy",
    image: "/src/assets/images/central_pharmacy_counter_1790588676302.jpg",
    status: "completed",
    lastActive: "Yesterday, 15:20",
    messagesCount: 6,
    staffName: "Apoteker Sarah, S.Farm",
    audioMode: "Acoustic Partition Sync + Screen Reader Sync",
    address: "Medical Center Plaza, Lantai Dasar",
    suggestedPhrases: [
      "Ini resep dari dokter spesialis saya.",
      "Apakah obat ini menyebabkan rasa kantuk berat?",
      "Saya penyandang disabilitas pendengaran, mohon berhadapan saat bicara.",
      "Berapa kali sehari obat ini diminum?",
    ],
    institutionData: {
      institutionCode: "INST-MED-CP03",
      organizationName: "RSIA & Farmasi Central Healthcare",
      internalDatabaseLinked: true,
      contactPerson: "Apoteker Sarah",
      floorMap: {
        room: "Ruang Konsultasi Khusus & Tebus Resep",
        description: "Loket 03 berada di lorong tenang sebelah barat, bebas polusi bising mesin genset.",
        counterLocation: "Loket Penyerahan Obat & Edukasi Pasien",
      },
      sopHighlights: [
        {
          serviceName: "SOP Pemberian Obat Pasien Tunanetra & Tunarungu",
          flow: [
            "1. Verifikasi barcode resep digital & nama pasien.",
            "2. Gunakan stiker Braille dan kode taktil pada kemasan botol/strip.",
            "3. Bacakan aturan minum dengan audio teks HearMe yang tersimpan di profil pasien.",
            "4. Berikan panduan tactile shape pada kotak obat malam vs siang.",
          ],
          priorityNotice: "Wajib memberikan ringkasan instruksi tertulis dan audio narasi yang bisa diputar ulang di rumah.",
        },
      ],
    },
  },
  {
    id: "nordic-bakery",
    name: "Nordic Bakery & Artisan Cafe",
    counter: "Pick-up Counter",
    category: "bakery",
    image: "/src/assets/images/nordic_bakery_shop_1790588692737.jpg",
    status: "completed",
    lastActive: "May 14, 09:15",
    messagesCount: 3,
    staffName: "Staff Elsa",
    audioMode: "Direct Audio Loop",
    address: "Artisan Lane B4",
    suggestedPhrases: [
      "Satu cinnamon bun dan sourdough gandum utuh.",
      "Apakah roti cardamom hangat baru keluar dari oven?",
      "Tolong diiris tipis sekalian ya.",
      "Minta kantong kertas takeaway.",
    ],
    institutionData: {
      institutionCode: "INST-NB-B4",
      organizationName: "Nordic Artisan Breads",
      internalDatabaseLinked: true,
      contactPerson: "Elsa",
      floorMap: {
        room: "Showcase Bakery",
        description: "Etalase roti hangat berada di sisi kanan dari pintu kaca geser otomatis.",
        counterLocation: "Meja Pemotongan Roti & Kasir",
      },
      sopHighlights: [
        {
          serviceName: "SOP Alergen & Transparansi Bahan",
          flow: [
            "1. Pastikan menginfokan kandungan kacang/gluten bagi pelanggan sensitif.",
            "2. Cetak struk dengan font besar.",
          ],
          priorityNotice: "Melayani pembeli tunarungu dengan papan display interaktif HearMe.",
        },
      ],
    },
  },
  {
    id: "metro-transit",
    name: "Stasiun MRT Bundaran HI",
    counter: "Customer Care Kiosk 02",
    category: "transit",
    image: "/src/assets/images/metro_transit_kiosk_1790588713313.jpg",
    status: "completed",
    lastActive: "May 10, 18:40",
    messagesCount: 5,
    staffName: "Petugas Ryan",
    audioMode: "Induction Hearing Loop & Tactile Paving Sync",
    address: "Underground Concourse Gate 3",
    suggestedPhrases: [
      "Peron mana untuk arah Lebak Bulus?",
      "Kartu uang elektronik saya mengalami kendala tap out.",
      "Di mana letak lift aksesibel prioritas kursi roda & tunanetra?",
      "Terima kasih atas bantuannya.",
    ],
    institutionData: {
      institutionCode: "INST-MRT-BHI02",
      organizationName: "PT MRT Jakarta (Perseroda)",
      internalDatabaseLinked: true,
      contactPerson: "Ryan (Station Operations Supervisor)",
      floorMap: {
        room: "Concourse Bawah Tanah Lantai B1",
        description: "Guiding block tactile warna kuning memandu dari pintu masuk B sampai ke depan Kiosk Layanan 02.",
        counterLocation: "Loket Layanan Pelanggan Pintu Gerbang B",
      },
      sopHighlights: [
        {
          serviceName: "SOP Pendampingan Penumpang Disabilitas",
          flow: [
            "1. Tawarkan bantuan pendampingan hingga masuk ke gerbong ramah disabilitas (kereta ke-3 dan ke-4).",
            "2. Bantu tap tiket darurat jika saldo kurang.",
            "3. Koordinasikan dengan staf stasiun tujuan via handy talky.",
          ],
          priorityNotice: "Petugas dilarang membiarkan penumpang tunanetra/tunarungu berjalan sendiri di area tangga manual tanpa pemandu.",
        },
      ],
    },
  },
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  "kopi-ruang": [
    {
      id: "m-1",
      sender: "staff",
      text: "Selamat pagi! Selamat datang di Kopi Ruang. Ingin memesan apa hari ini?",
      timestamp: "10:41 AM",
      confidence: 99,
      detectedLang: "Bahasa Indonesia",
    },
    {
      id: "m-2",
      sender: "user",
      text: "Dine-in, tolong. Satu oat milk flat white tanpa gula.",
      timestamp: "10:42 AM",
    },
    {
      id: "m-3",
      sender: "staff",
      text: "Baik, flat white dengan oat milk. Mau dine-in di area indoor ber-AC atau outdoor taman?",
      timestamp: "10:43 AM",
      confidence: 98,
      detectedLang: "Bahasa Indonesia",
    },
  ],
  "central-pharmacy": [
    {
      id: "cp-1",
      sender: "staff",
      text: "Halo Mbak Zara, ini obat resep antibiotik dan obat tetes mata sudah siap sesuai arahan dokter.",
      timestamp: "15:18",
      confidence: 96,
      detectedLang: "Bahasa Indonesia",
    },
    {
      id: "cp-2",
      sender: "user",
      text: "Terima kasih banyak. Apakah obat ini harus diminum sesudah makan?",
      timestamp: "15:19",
    },
    {
      id: "cp-3",
      sender: "staff",
      text: "Betul, diminum sehari tiga kali satu tablet sesudah makan ya, dan wajib dihabiskan selama 5 hari agar tidak resisten.",
      timestamp: "15:20",
      confidence: 97,
      detectedLang: "Bahasa Indonesia",
      summary: "Aturan: 3x sehari 1 tablet sesudah makan. Wajib habis dalam 5 hari.",
    },
  ],
  "nordic-bakery": [
    {
      id: "nb-1",
      sender: "staff",
      text: "Halo! Roti sourdough gandum dan cardamom bun kami baru saja keluar hangat dari oven batu.",
      timestamp: "09:14",
      confidence: 95,
      detectedLang: "Bahasa Indonesia",
    },
    {
      id: "nb-2",
      sender: "user",
      text: "Saya pesan 2 buah cardamom bun dan 1 roti sourdough gandum, tolong diiris ya.",
      timestamp: "09:15",
    },
  ],
  "metro-transit": [
    {
      id: "mt-1",
      sender: "staff",
      text: "Loket Layanan Informasi Stasiun Bundaran HI. Ada yang bisa kami bantu perihal tiket atau rute perjalanan Anda?",
      timestamp: "18:38",
      confidence: 98,
      detectedLang: "Bahasa Indonesia",
    },
    {
      id: "mt-2",
      sender: "user",
      text: "Kartu saya tadi tidak terdeteksi saat keluar di gate 3, mohon bantuannya.",
      timestamp: "18:39",
    },
  ],
};

export const DEFAULT_SAVED_PHRASES: Phrase[] = [
  { id: "p-1", text: "Tolong gunakan susu oat (oat milk)", category: "cafe", icon: "coffee" },
  { id: "p-2", text: "Mohon ulangi perkataan Anda", category: "general", icon: "rotate-ccw" },
  { id: "p-3", text: "Mohon bicara lebih pelan dan hadap saya", category: "general", icon: "record_voice_over" },
  { id: "p-4", text: "Tolong bacakan tulisan di kertas ini", category: "assistive", icon: "visibility" },
  { id: "p-5", text: "Saya seorang Tunarungu / Tunawicara", category: "assistive", icon: "hearing_disabled" },
  { id: "p-6", text: "Saya seorang Tunanetra, mohon panduan arah", category: "assistive", icon: "blind" },
  { id: "p-7", text: "Bisa bayar dengan QRIS / non-tunai?", category: "cafe", icon: "receipt" },
];

export const SAMPLE_OCR_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Resep Obat & Instruksi Minum',
    category: 'Farmasi / Medis',
    type: 'prescription' as const,
    institution: 'Central Pharmacy & Clinic',
    snippet: 'Amoxicillin 500mg, 3x1 hari sesudah makan...',
  },
  {
    id: 'doc-2',
    name: 'Karcis Antrean & Estimasi Loket',
    category: 'Layanan Publik / Bank',
    type: 'kiosk_ticket' as const,
    institution: 'Bank Mandiri KCP Senopati',
    snippet: 'No. Antrean C-042, Estimasi tunggu 6 menit...',
  },
  {
    id: 'doc-3',
    name: 'Papan Menu & Daftar Harga',
    category: 'Kafe & Restoran',
    type: 'menu' as const,
    institution: 'Kopi Ruang Specialty Coffee',
    snippet: 'Oat Milk Flat White 42k, Manual Brew 38k...',
  },
];

export const SIMULATED_STAFF_PROMPTS = [
  "Mau pesan dine-in atau dibungkus takeaway hari ini?",
  "Total pesanannya Rp 42.000, silakan tap kartu debit atau QRIS di mesin ini.",
  "Mau ukuran Regular (12oz) atau Large (16oz)?",
  "Pilihan susu tersedia oat milk, almond milk, dan susu segar.",
  "Nomor antrean Anda adalah 24, nanti pesanan akan diantar langsung ke meja Anda!",
  "Ada tambahan menu pastry atau roti hangat yang ingin dipesan sekalian?",
];

