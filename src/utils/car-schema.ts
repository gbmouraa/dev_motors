import z from "zod";

export const carSchema = z.object({
  name: z.string().nonempty("Campo obrigatório*"),
  model: z.string().nonempty("Campo obrigatório*"),
  color: z.string().nonempty("Campo obrigatório*"),
  year: z.string().nonempty("Campo obrigatório*"),
  km: z.string().nonempty("Campo obrigatório*"),
  phone: z.string().min(11, "Número de telefone inválido*"),
  city: z.string().nonempty("Campo obrigatório*"),
  price: z.string().nonempty("Campo obrigatório*"),
  category: z.string().nonempty("Campo obrigatório*"),
  description: z.string().nonempty("Campo obrigatório*"),
});

export type FormData = z.infer<typeof carSchema>;
