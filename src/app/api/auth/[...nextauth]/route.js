import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Optional: helps with debugging during development
  pages: {
    signIn: '/auth/signin', // Optional: Customize login page if you have one
  },
});

export { handler as GET, handler as POST };
