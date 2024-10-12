import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import GoogleProvider from 'next-auth/providers/google';
import { Session, NextAuthOptions, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { Adapter } from 'next-auth/adapters';

const prisma = new PrismaClient();

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: string | undefined;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? '',
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }: { user?: any; token: JWT }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard/setting/`;
      } else if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      return url;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
};
