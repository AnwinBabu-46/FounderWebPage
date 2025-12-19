import { NextResponse } from 'next/server';
import { ContactService } from '@/lib/contact-service';

export async function GET() {
  try {
    const messages = ContactService.getAll();
    const stats = ContactService.getStats();
    
    return NextResponse.json({ messages, stats });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}