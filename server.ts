import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
// Use port 3001 specifically for the internal API proxy
const port = 3001;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Summarize Endpoint: Meringkas instruksi atau penjelasan panjang secara instan
app.post('/api/ai/summarize', async (req, res) => {
  try {
    const { text, audience = 'general' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for summarization' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Offline fallback summary
      const sentences = text.split(/[.!?]+/).filter(Boolean);
      const offlineSummary = sentences.slice(0, 2).join('. ') + '.';
      return res.json({
        summary: offlineSummary,
        bulletPoints: [
          'Instruksi inti telah dipahami.',
          'Siap ditindaklanjuti pada loket terkait.',
        ],
      });
    }

    const prompt = `Anda adalah asisten aksesibilitas komunikasi HearMe untuk penyandang disabilitas (Tunarungu, Tunawicara, dan Tunanetra).
Tolong ringkas teks/instruksi lisan berikut ini menjadi ringkasan yang SANGAT JELAS, SINGKAT, dan MUDAH DIBACA/DIPAHAMI sekilas di layar konter layanan publik.
Berikan juga 2-3 poin tindakan kunci (key action points).

Format output JSON valid dengan keys:
- "summary": string ringkasan 1-2 kalimat lugas
- "bulletPoints": array string berisi 2-3 poin penting tindakan/arahan

Teks asli:
"${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error summarizing text:', error);
    return res.status(500).json({
      error: 'Failed to summarize text',
      fallback: 'Instruksi: Silakan tunggu nomor antrean Anda dipanggil di loket 1.',
    });
  }
});

// Predictive Response Generator Endpoint
app.post('/api/ai/predictive-replies', async (req, res) => {
  try {
    const { staffMessage, venueName, userMode = 'tunarungu' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        replies: [
          'Ya, saya setuju dengan opsi tersebut.',
          'Bisa tolong tuliskan atau ketikkan harganya?',
          'Mohon tunggu sebentar, terima kasih.',
          'Dine-in di sini saja, terima kasih.',
        ],
      });
    }

    const prompt = `Kamu adalah generator respons cepat untuk aplikasi aksesibilitas HearMe.
Staf/Petugas di tempat "${venueName || 'Layanan Publik'}" baru saja berbicara:
"${staffMessage || 'Ada yang bisa kami bantu hari ini?'}"

Mode pengguna: ${userMode} (Tunarungu/Tunawicara/Tunanetra).
Buatkan 4 opsi respon singkat, sopan, dan langsung to-the-point yang bisa diklik pengguna untuk langsung diucapkan lewat speaker atau ditampilkan.

Keluarkan format JSON valid:
{
  "replies": ["respon 1", "respon 2", "respon 3", "respon 4"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating predictive replies:', error);
    return res.json({
      replies: [
        'Dine-in, tolong.',
        'Bisa tolong diulangi lebih lambat?',
        'Berapa total biayanya?',
        'Terima kasih banyak atas bantuannya.',
      ],
    });
  }
});

// HearMe Vision Demo / Document OCR translation
app.post('/api/ai/vision-ocr', async (req, res) => {
  try {
    const { imagePrompt = 'Resep obat dan instruksi dosis', sampleType = 'prescription' } = req.body;

    // Returns formatted OCR reading with high accessibility audio narration description
    const results: Record<string, any> = {
      prescription: {
        title: 'Lembar Resep Dokter & Dosis Obat',
        institution: 'Klinik Medika Sejahtera',
        readText: 'Amoxicillin 500mg - Minum 3x sehari 1 kaplet setelah makan selama 5 hari berturut-turut sampai habis. Paracetamol 500mg - Minum jika demam/nyeri saja.',
        importantWarnings: 'Harus dihabiskan. Jangan diminum bersamaan dengan produk susu.',
        audioNarration: 'Terdeteksi resep Amoksisilin 500 miligram, diminum tiga kali sehari setelah makan sampai habis, dan Parasetamol untuk pereda nyeri jika perlu.',
      },
      kiosk_ticket: {
        title: 'Karcis Antrean Bank Mandiri KCP Senopati',
        institution: 'Bank Mandiri',
        readText: 'Nomor Antrean: C-042. Layanan: Customer Service / Pembukaan Rekening. Jumlah antrean di depan Anda: 2 orang. Perkiraan waktu tunggu: 6 menit.',
        importantWarnings: 'Silakan siapkan KTP asli dan NPWP.',
        audioNarration: 'Nomor antrean Anda adalah C nol empat dua untuk Customer Service. Ada dua orang antrean di depan Anda.',
      },
      menu: {
        title: 'Papan Menu Kopi Ruang',
        institution: 'Kopi Ruang Specialty Coffee',
        readText: 'Espresso: 28k, Americano: 32k, Flat White Oat Milk: 42k, Manual Brew V60: 38k, Croissant Butter: 25k.',
        importantWarnings: 'Susu nabati oat milk & almond tersedia tanpa biaya tambahan hari ini.',
        audioNarration: 'Papan menu menampilkan Flat White Oat Milk seharga empat puluh dua ribu dan Croissant seharga dua puluh lima ribu.',
      },
    };

    return res.json(results[sampleType] || results.prescription);
  } catch (error: any) {
    return res.status(500).json({ error: 'Vision OCR processing failed' });
  }
});

app.listen(port, () => {
  console.log(`HearMe accessibility backend running on port ${port}`);
});
