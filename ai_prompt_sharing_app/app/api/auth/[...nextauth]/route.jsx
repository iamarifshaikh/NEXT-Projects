import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        });

        session.user.id = sessionUser._id.toString();
    },
    async signIn({ profile }) {
        try {
            await connectToDatabase();
            // Check if user already exist
            const userExist = await User.findOne({
                email: profile.email
            })
            //  If not create a one
            if (!userExist) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
});

export { handler as GET, handler as POST };