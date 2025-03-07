
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        password: { label: "Password", type: "password"},
        username: { label: "Username", type: "text"}
      },
      async authorize(credentials) {

        if (credentials.password === process.env.EMAILPASSWORD && credentials.username === "Nikolaj99") {
          return {authenticated: true};
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.id = 'authenticated'
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST}