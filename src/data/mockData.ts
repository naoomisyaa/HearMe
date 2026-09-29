import { Venue, Phrase, Message } from '../types';

// export const HEARME_LOGO = "/src/assets/images/zara_user_avatar_1790588736175.jpg";

// export const USER_PROFILE = {
//   name: "Zara",
//   fullName: "Zara Putri Sahriar",
//   avatar: "/src/assets/images/zara_user_avatar_1790588736175.jpg",
//   assistMode: "Tunarungu & Tunawicara Multi-Assist",
//   hearingProfile: "Severe Bilateral Hearing Loss & Non-vocal",
//   preferredVoice: "Natural Warm (Indonesian / English)",
//   activeProfile: "tunarungu" as const,
// };

export const HEARME_LOGO = "/images/logo_hearme.png";

export const USER_PROFILE = {
  name: "Zara",
  fullName: "Zara Putri Sahriar",
  avatar: "/images/zara_user_avatar_1790588736175.jpg",
  assistMode: "Tunarungu & Tunawicara Multi-Assist",
  hearingProfile: "Severe Bilateral Hearing Loss & Non-vocal",
  preferredVoice: "Natural Warm (Indonesian / English)",
  activeProfile: "tunarungu" as const,
};


export const INITIAL_VENUES: Venue[] = [
  {
  id: "feb-unesa",
  name: "Gedung FEB UNESA",
  counter: "Layanan Akademik",
  category: "education",
  image: "/images/gedung_feb_unesa.png",
  status: "active",
  lastActive: "Today, 13:00",
  messagesCount: 5,
  staffName: "Staff Akademik FEB",
  audioMode: "Accessibility Communication Assist",
  address: "Fakultas Ekonomika dan Bisnis UNESA",

  suggestedPhrases: [
    "Saya ingin bertanya tentang jadwal konsultasi akademik.",
    "Di mana lokasi pengambilan formulir administrasi?",
    "Saya ingin mengurus surat aktif kuliah.",
    "Mohon jelaskan alur pengajuan berkas akademik.",
  ],

  institutionData: {
    institutionCode: "FEB-UNESA-ADM-03",
    organizationName: "Fakultas Ekonomika dan Bisnis Universitas Negeri Surabaya",
    internalDatabaseLinked: true,
    contactPerson: "Petugas Akademik FEB",

    floorMap: {
      room: "Gedung FEB - Lantai 2",
      description:
        "Loket layanan akademik berada di lantai 2 dekat ruang administrasi mahasiswa.",
      counterLocation:
        "Loket Akademik dan Administrasi Mahasiswa",
    },

    sopHighlights: [
      {
        serviceName: "SOP Layanan Administrasi Akademik",

        flow: [
          "1. Ambil nomor antrean administrasi.",
          "2. Tunggu hingga nomor antrean dipanggil.",
          "3. Serahkan berkas yang diperlukan kepada petugas.",
          "4. Lakukan verifikasi data dan proses administrasi.",
        ],

        priorityNotice:
          "Mahasiswa penyandang disabilitas dapat menggunakan HearMe untuk memperoleh instruksi layanan yang lebih mudah dipahami.",
      },
    ],
  },
},
  {
    id: "central-pharmacy",
    name: "Central Pharmacy & Clinic",
    counter: "Consultation Desk 03",
    category: "pharmacy",
    // image: "/src/assets/images/central_pharmacy_counter_1790588676302.jpg",
    image: "/images/central_pharmacy_counter_1790588676302.jpg",
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
    // image: "/src/assets/images/nordic_bakery_shop_1790588692737.jpg",
    image: "/images/nordic_bakery_shop_1790588692737.jpg",
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
    // image: "/src/assets/images/metro_transit_kiosk_1790588713313.jpg",
    image: "/images/metro_transit_kiosk_1790588713313.jpg",
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
  "feb-unesa": [
  {
    id: "feb-1",
    sender: "user",
    text: "Saya ingin bertanya tentang jadwal konsultasi akademik.",
    timestamp: "13:00",
  },

  {
    id: "feb-2",
    sender: "staff",
    text: "Konsultasi akademik berikutnya dimulai pukul 13.00 di ruang konsultasi lantai dua.",
    timestamp: "13:01",
    confidence: 99,
    detectedLang: "Bahasa Indonesia",
  },

  {
    id: "feb-3",
    sender: "user",
    text: "Bagaimana prosedur pengurusan administrasi mahasiswa?",
    timestamp: "13:02",
  },

  {
    id: "feb-4",
    sender: "staff",
    text: "Silakan menuju lantai dua gedung fakultas untuk mengambil formulir administrasi, kemudian menunggu hingga nomor antrean Anda dipanggil dan kembali ke loket tiga.",
    timestamp: "13:03",
    confidence: 98,
    detectedLang: "Bahasa Indonesia",

    summary:
      "1. Pergi ke lantai 2. 2. Ambil formulir administrasi. 3. Tunggu nomor antrean dipanggil. 4. Kembali ke loket 3.",
  },
],
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
  { id: "p-8", text: "Ringkas instruksi menjadi langkah-langkah yang mudah dipahami", category: "education", icon: "auto_awesome"
},
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
  "Silakan menuju lantai dua untuk mengambil formulir administrasi.",
  "Nomor antrean Anda akan dipanggil melalui layar informasi.",
  "Jadwal konsultasi akademik berikutnya dimulai pukul 13.00.",
  "Silakan kembali ke loket tiga setelah formulir selesai diisi.",
  "Apakah ada dokumen tambahan yang ingin Anda urus hari ini?",
  "Mau pesan dine-in atau dibungkus takeaway hari ini?",
  "Total pesanannya Rp 42.000, silakan tap kartu debit atau QRIS di mesin ini.",
  "Mau ukuran Regular (12oz) atau Large (16oz)?",
  "Pilihan susu tersedia oat milk, almond milk, dan susu segar.",
  "Nomor antrean Anda adalah 24, nanti pesanan akan diantar langsung ke meja Anda!",
  "Ada tambahan menu pastry atau roti hangat yang ingin dipesan sekalian?",
];

