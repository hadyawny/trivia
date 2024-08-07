import NextAuth from "next-auth/next";
import gitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";


export default NextAuth({
  providers: [
    gitHubProvider({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
    }),
    FacebookProvider({
      clientId: process.env.clientIdfb,
      clientSecret: process.env.clientSecretfb,
    })
    
  ],

});
