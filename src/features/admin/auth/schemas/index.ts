import z from 'zod';

export const loginForm = z.object({
    email: z.email("Email no válido"),
    password: z.string().min(1, "Password obligatorio")
})