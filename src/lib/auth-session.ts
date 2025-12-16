import { SignJWT, jwtVerify } from 'jose';

let key: Uint8Array | null = null;

function getKey(): Uint8Array {
  if (!key) {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }
    key = new TextEncoder().encode(SECRET_KEY);
  }
  return key;
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getKey());
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, getKey(), {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
