const { z } = require("zod");

const userRegistrationSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Full name must only contain letters and spaces"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address")
        .max(254, "Email address is too long"),

    dateOfBirth: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
        .refine((val) => {
            const age = (Date.now() - new Date(val).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
            return age >= 16;
        }, "You must be at least 16 years old to register"),

    mobileNumber: z
        .string()
        .trim()
        .transform((val) => val.replace(/[\s\-()]/g, ""))
        .transform((val) => {
            if (val.startsWith("+91")) return val.slice(3);
            if (val.startsWith("91") && val.length === 12) return val.slice(2);
            if (val.startsWith("0")) return val.slice(1);
            return val;
        })
        .refine((val) => /^[6-9]\d{9}$/.test(val), "Please enter a valid 10-digit Indian mobile number")
        .transform((val) => `+91${val}`),

    gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
        errorMap: () => ({ message: "Gender must be male, female, or other" }),
    }),

    role: z.enum(["STUDENT", "ADMIN",], {
        errorMap: () => ({ message: "Invalid role specified" }),
    }),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/~`]/, "Password must contain at least one special character"),
});

const zodSchemas = {
    userRegistrationSchema
};

module.exports = zodSchemas;