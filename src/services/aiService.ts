export interface AiAskOptions {
  prompt: string;
  role: string;
  classLevel?: string;
  subject?: string;
  taskType?: string;
}

export async function askAiAssistant(options: AiAskOptions): Promise<{ reply: string; source: string }> {
  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error('Error contacting AI service:', error);
    return {
      reply: `Sorry, unable to connect to AI server. (${error.message || 'Network error'}). Please try again.`,
      source: 'error-fallback',
    };
  }
}
