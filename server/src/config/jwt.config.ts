import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  host: process.env.DB_HOST,
}));
