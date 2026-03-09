import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUser } from "./server-utils";
import { authSchema } from "./validations";
import { prisma } from "./prisma";

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
          hasAccess: user.hasAccess,
        };
      },
    }),
  ],

  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const pathname = request.nextUrl.pathname;

      const isLoggedIn = !!auth?.user;
      const hasAccess = !!auth?.user?.hasAccess;

      const isAppRoute = pathname.startsWith("/app");
      const isAuthPage =
        pathname.startsWith("/login") || pathname.startsWith("/signup");

      // user not logged in
      if (!isLoggedIn) {
        return !isAppRoute;
      }

      // unpaid user accessing protected routes
      if (!hasAccess && isAppRoute) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      // paid user should not see auth pages or payment
      if (hasAccess && (isAuthPage || pathname === "/payment")) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.hasAccess = user.hasAccess;
      }
      if (trigger === "update") {
        const userFromDb = await prisma.user.findUnique({
          where: { id: token.id as string },
        });
        console.log("JWT update triggered");
        console.log("DB hasAccess:", userFromDb?.hasAccess);

        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.hasAccess = token.hasAccess as boolean;
      return session;
    },
  },
});
