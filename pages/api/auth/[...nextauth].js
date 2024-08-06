import NextAuth from "next-auth/next";
import gitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";


export default NextAuth({
  providers: [
    gitHubProvider({
      clientId: process.env.client_Id,
      clientSecret: process.env.client_Secret,
    }),
    FacebookProvider({
      clientId: process.env.client_Id_fb,
      clientSecret: process.env.client_Secret_fb,
    })
    
  ],
});
