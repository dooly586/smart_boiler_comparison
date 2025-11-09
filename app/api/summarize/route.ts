import { NextResponse } from 'next/server';
import { summarizeText } from '../../../services/geminiService';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text to summarize is required' }, { status: 400 });
    }

    const summary = await summarizeText(text);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error in summarize API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
