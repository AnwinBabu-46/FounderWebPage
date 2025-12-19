import fs from 'fs';
import path from 'path';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

const DATA_FILE = path.join(process.cwd(), 'src/data/contact-messages.json');

// Helper to read messages
function readMessages(): ContactMessage[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contact messages:', error);
    return [];
  }
}

// Helper to write messages
function writeMessages(messages: ContactMessage[]) {
  try {
    // Ensure directory exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error writing contact messages:', error);
    throw new Error('Failed to save contact message');
  }
}

export const ContactService = {
  getAll: (): ContactMessage[] => {
    const messages = readMessages();
    return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getById: (id: number): ContactMessage | undefined => {
    const messages = readMessages();
    return messages.find(msg => msg.id === id);
  },

  create: (messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const messages = readMessages();
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    
    const newMessage: ContactMessage = {
      id: newId,
      ...messageData,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    messages.push(newMessage);
    writeMessages(messages);
    return newMessage;
  },

  updateStatus: (id: number, status: ContactMessage['status']) => {
    const messages = readMessages();
    const messageIndex = messages.findIndex(msg => msg.id === id);
    
    if (messageIndex === -1) {
      throw new Error('Message not found');
    }

    messages[messageIndex].status = status;
    writeMessages(messages);
    return messages[messageIndex];
  },

  delete: (id: number) => {
    const messages = readMessages();
    const filteredMessages = messages.filter(msg => msg.id !== id);
    
    if (filteredMessages.length === messages.length) {
      throw new Error('Message not found');
    }

    writeMessages(filteredMessages);
  },

  getStats: () => {
    const messages = readMessages();
    return {
      total: messages.length,
      new: messages.filter(m => m.status === 'new').length,
      read: messages.filter(m => m.status === 'read').length,
      replied: messages.filter(m => m.status === 'replied').length
    };
  }
};