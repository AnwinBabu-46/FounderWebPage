import { NextResponse } from 'next/server';
import { ContactService } from '@/lib/contact-service';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create the message
    const contactMessage = ContactService.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      id: contactMessage.id 
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}