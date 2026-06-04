import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    // Map your custom columns so Better Auth exposes them to your sessions
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
            },
            phone: {
                type: "string",
                required: false,
            },
            onboardingCompleted: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            isActive: {
                type: "boolean",
                required: false,
                defaultValue: true,
            },
        },
    },
    // Optional: Boost performance by allowing Better Auth to use SQL joins (v1.4+)
    experimental: {
        joins: true, 
    },
    emailAndPassword: {  
        enabled: true,
    }
});
