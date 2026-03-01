import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUser } from "./server-utils";
import { authSchema } from "./validations";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    Credentials({
      name: "credentials",

      async authorize(credentials) {
        // validation
        const validatedCredentials = authSchema.safeParse(credentials);
        if (!validatedCredentials.success) {
          console.log(validatedCredentials.error);
          return null;
        }

        const { email, password } = validatedCredentials.data;

        if (!email || !password) return null;

        const user = await getUser(email);

        if (!user) {
          console.log("User not found");
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!isPasswordValid) {
          console.log("Invalid Credentials");
          return null;
        }
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = request.nextUrl.pathname.startsWith("/app");

      if (!isLoggedIn && isProtectedRoute) {
        return false;
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
