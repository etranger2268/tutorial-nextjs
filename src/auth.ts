import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import { sql } from '@/app/lib/db';
import type { User } from '@/app/lib/definitions';
import { authConfig } from '@/auth.config';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const getUser = async (email: string): Promise<User | undefined> => {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return undefined;
  }
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Invalid credentials format');
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) {
          return null;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          console.log('Invalid password');
          return null;
        }

        return user;
      },
    }),
  ],
});
