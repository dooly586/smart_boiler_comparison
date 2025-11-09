
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this environment, we assume it's always available.
  console.warn("API_KEY is not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const summarizeText = async (textToSummarize: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `다음 보고서 내용을 일반 소비자가 이해하기 쉽도록 핵심 내용만 요약해줘. 특히 히트펌프와의 성능 비교(난방 속도, 효율, 혹한기 성능, 소비 전력)에 초점을 맞춰서 설명해줘.:\n\n${textToSummarize}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing text with Gemini API:", error);
    return "AI 요약 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};
