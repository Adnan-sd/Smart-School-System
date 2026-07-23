import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI client lazy/safely
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// AI Study & School Assistant API Endpoint
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, role, classLevel, subject, taskType } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGenAI();

    let systemInstruction = `You are an expert AI Educational Assistant integrated into Smart School Management System.
You assist Students, Teachers, Parents, and School Administrators.
Role context: ${role || 'Student'}.
${classLevel ? `Grade/Class Level: ${classLevel}.` : ''}
${subject ? `Subject: ${subject}.` : ''}

Behavioral Guidelines:
- Explain concepts clearly according to student grade level.
- Support multilingual queries (e.g. English, Urdu, Roman Urdu, Hindi, Spanish, etc.).
- When asked to explain in Urdu or any specific language, provide accurate language responses.
- If asked to generate MCQs or Quizzes, structure them neatly with options (A, B, C, D), correct answer key, and brief explanations.
- If asked to summarize chapters, structure key bullet points and key definitions.
- Always maintain an encouraging, academic, polite tone.
- If unsure or missing textbook context, state facts accurately without fabricating details.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text,
        source: 'gemini-3.6-flash',
      });
    } else {
      // Fallback smart response when API key is not configured
      let fallbackText = `[AI Assistant Offline Mode]
Query: "${prompt}"

Note: To enable live Gemini AI responses, please add your GEMINI_API_KEY in the Secrets panel.

Here is a preview response:
Class Level: ${classLevel || 'Class 9'} | Subject: ${subject || 'General'}
The concept described in your query involves core principles of ${subject || 'Science & Academics'}.
Key Takeaways:
1. Fundamental Definitions & Core Concepts.
2. Practical Applications in modern school curricula.
3. Summary & Quiz Highlights.`;

      // Custom offline response logic for typical demo inputs (e.g. Photosynthesis in Urdu, Quiz, etc.)
      const lowerP = prompt.toLowerCase();
      if (lowerP.includes('photosynthesis') && lowerP.includes('urdu')) {
        fallbackText = `**Photosynthesis (شعاعی ترکیب) -  Urdu Explanation:**

شعاعی ترکیب (Photosynthesis) وہ عمل ہے جس کے ذریعے پودے سورج کی روشنی، پانی، اور کاربن ڈائی آکسائیڈ (CO2) کو استعمال کرتے ہوئے اپنی خوراک (گلوکوز) اور آکسیجن بناتے ہیں۔

**اہم اجزاء (Key Components):**
1. **سورج کی روشنی (Sunlight)** - توانائی کا بنیادی ذریعہ۔
2. **کلوروفل (Chlorophyll)** - پودوں کے سبز پتوں میں پایا جانے والا مادّہ جو روشنی جذب کرتا ہے۔
3. **پانی (Water - H2O)** - جڑوں سے جذب ہوتا ہے۔
4. **کاربن ڈائی آکسائیڈ (CO2)** - ہوا سے حاصل کی جاتی ہے۔

**معاملہ (Chemical Equation):**
6CO2 + 6H2O + (Suraj ki Roshni) ➔ C6H12O6 (Glucose) + 6O2 (Oxygen)

آکسیجن انسانوں اور جانوروں کے سانس لینے کے لیے خارج کی جاتی ہے!`;
      } else if (lowerP.includes('mcq') || lowerP.includes('quiz')) {
        fallbackText = `**Class 9 Biology Quiz - Photosynthesis & Cell Structure:**

**Q1. What is the primary pigment responsible for trapping light during photosynthesis?**
A) Carotene
B) Chlorophyll
C) Hemoglobin
D) Xanthophyll
*Answer:* B) Chlorophyll

**Q2. What gas is released as a byproduct during photosynthesis?**
A) Nitrogen
B) Carbon Dioxide
C) Oxygen
D) Hydrogen
*Answer:* C) Oxygen

**Q3. In which cell organelle does photosynthesis take place?**
A) Mitochondria
B) Ribosome
C) Chloroplast
D) Nucleus
*Answer:* C) Chloroplast

**Q4. Which gas is absorbed by plants from the air during photosynthesis?**
A) Carbon Dioxide
B) Oxygen
C) Argon
D) Methane
*Answer:* A) Carbon Dioxide`;
      } else if (lowerP.includes('summarize chapter') || lowerP.includes('summary')) {
        fallbackText = `**Chapter Summary: Chapter 3 - Cell Biology & Function**

**Key Highlights:**
- **Cell Theory:** All living organisms are composed of one or more cells. Cells are the fundamental unit of life.
- **Prokaryotes vs Eukaryotes:** Eukaryotes contain membrane-bound organelles (e.g. Nucleus, Mitochondria) whereas Prokaryotes lack a distinct nucleus.
- **Organelle Functions:**
  - *Nucleus:* Contains DNA, controls cell activity.
  - *Mitochondria:* Powerhouse of the cell (ATP energy production).
  - *Ribosomes:* Protein synthesis.
- **Cell Transport:** Passive diffusion, osmosis, and active ATP transport mechanisms.`;
      }

      return res.json({
        reply: fallbackText,
        source: 'offline-preview',
      });
    }
  } catch (err: any) {
    console.error('AI API Error:', err);
    res.status(500).json({ error: err?.message || 'Failed to generate AI response' });
  }
});

// Setup Vite middleware in dev or serve static dist in prod
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Smart School Management System running on http://localhost:${PORT}`);
  });
}

setupServer();
