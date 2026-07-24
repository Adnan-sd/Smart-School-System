import React, { useState } from 'react';
import { User, AiChatMessage } from '../../types';
import { askAiAssistant } from '../../services/aiService';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  Copy,
  Check,
  Globe2,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface AiAssistantModuleProps {
  currentUser: User;
}

export const AiAssistantModule: React.FC<AiAssistantModuleProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello ${currentUser.name}! I am your Gemini-powered AI Educational Assistant for Smart School Management.

I can help you with:
• Explaining difficult academic topics in **Urdu** or English
• Generating multiple-choice quizzes & MCQs with answer keys
• Summarizing textbook chapters & exam study notes
• Providing grade-level lesson plans for teachers

How can I assist your study or teaching today?`,
      timestamp: '08:00 AM',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Class 9');
  const [selectedSubject, setSelectedSubject] = useState('Biology');
  const [selectedLanguage, setSelectedLanguage] = useState('English & Urdu');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    { label: 'Explain Photosynthesis in Urdu', prompt: 'Explain Photosynthesis in simple Urdu with chemical formula and key points.' },
    { label: 'Generate Class 9 Biology Quiz', prompt: 'Generate a 4-question MCQ quiz for Class 9 Biology on Photosynthesis with answer key.' },
    { label: 'Summarize Chapter 3 (Cell Biology)', prompt: 'Summarize Chapter 3 on Cell Biology and organelle functions in bullet points.' },
    { label: 'Explain Quadratic Formula', prompt: 'Explain the quadratic formula (-b ± √(b² - 4ac)) / 2a with a step-by-step example.' },
  ];

  const handleSend = async (customPrompt?: string) => {
    const promptToSubmit = customPrompt || inputPrompt;
    if (!promptToSubmit.trim() || loading) return;

    const userMsg: AiChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputPrompt('');
    setLoading(true);

    const fullPrompt = `${promptToSubmit} (Target Language: ${selectedLanguage}, Class Level: ${selectedClass}, Subject: ${selectedSubject})`;

    const response = await askAiAssistant({
      prompt: fullPrompt,
      role: currentUser.role,
      classLevel: selectedClass,
      subject: selectedSubject,
    });

    const aiMsg: AiChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: response.reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-blue-800/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">AI Study & Teaching Assistant</h2>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                  Gemini 3.6 Flash
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Multilingual academic assistant for concept explanation, quiz generation & study summaries.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10">
              <Globe2 className="w-3.5 h-3.5 text-blue-300" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="English & Urdu" className="text-slate-800">Urdu & English</option>
                <option value="Urdu Only" className="text-slate-800">Urdu (اردو)</option>
                <option value="English Only" className="text-slate-800">English</option>
                <option value="Roman Urdu" className="text-slate-800">Roman Urdu</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10">
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="Class 9" className="text-slate-800">Class 9</option>
                <option value="Class 10" className="text-slate-800">Class 10</option>
                <option value="Class 11" className="text-slate-800">Class 11 (F.Sc)</option>
                <option value="Class 12" className="text-slate-800">Class 12 (F.Sc)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
          Quick AI Prompts:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.prompt)}
            disabled={loading}
            className="shrink-0 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs hover:border-blue-300 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';

          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-2xs ${
                  isAi ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' : 'bg-slate-800'
                }`}
              >
                {isAi ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${isAi ? '' : 'items-end'}`}>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                  <span className="font-bold">{isAi ? 'Gemini AI Assistant' : currentUser.name}</span>
                  <span>• {m.timestamp}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed font-normal whitespace-pre-wrap ${
                    isAi
                      ? 'bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs'
                      : 'bg-blue-600 text-white font-medium shadow-xs'
                  }`}
                >
                  {m.text}
                </div>

                {isAi && (
                  <div className="flex items-center gap-2 pt-1 px-1">
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="text-[10px] font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs text-slate-500 font-semibold flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600 animate-bounce" />
              <span>Gemini AI is analyzing textbook context and generating response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Prompt Controls */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask AI anything (e.g., 'Explain Photosynthesis in Urdu', 'Generate Quiz for Physics')..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
