// config/jsonSecret.ts
import 'dotenv/config';

interface JsonSecretConfig {
  secret: string;
  expiresIn: string;
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no .env');
}

const jsonSecret: JsonSecretConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

export default jsonSecret;