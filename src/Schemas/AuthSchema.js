import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty("Username Cannot be Empty")
    .min(3, "Username must be of minimum length of 3")
    .max(15, "Username must not exceed length 15"),
  password: z.string().nonempty("Password Cannot be Empty"),
});

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .nonempty("Name Cannot be Empty")
    .min(3, "Name must be of minimum length of 3")
    .max(15, "Name must not exceed length 15"),

  username: z
    .string()
    .nonempty("username Cannot be Empty")
    .min(3, "Username must be of minimum length of 3")
    .max(15, "Username must not exceed length 15"),

  email: z.email().nonempty("Email Cannot be Empty"),

  password: z.string().nonempty("Password Cannot be Empty"),
});
