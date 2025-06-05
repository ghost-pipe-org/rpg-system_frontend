import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutComponents } from "../../components/Layouts";
import { LabeledInput } from "../../components/Inputs";
import { Title } from "../../components/Title";
import { DefaultButton } from "../../components/Buttons";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .nonempty({ message: "Senha é obrigatória" })
    .min(6, { message: "Senha deve ter no mínimo 6 " })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message:
        "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número",
    }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const Login = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const watchAll = watch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(data: LoginFormInputs) {
    setIsSubmitting(true);
    setError("");
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      console.log("Dados enviados:", {
        email: data.email.trim(),
      });

      alert("Login realizado com sucesso!");
    } catch {
      setError("Erro ao realizar login.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Simular um usuário admin

  const mockedAdmin = {
    email: "admin@email.com",
    password: "Admin123",
  };
  if (
    watchAll.email === mockedAdmin.email &&
    watchAll.password === mockedAdmin.password && isSubmitting === true
  )
    return <Navigate to="/admin" />;

  return (
    <LayoutComponents withNavbar={true}>
      
      {/*Verificar output*/}
      <pre className="bg-black/60 text-green-300 p-4 rounded mb-4 text-xs max-w-md mx-auto overflow-x-auto">
        {JSON.stringify(watchAll, null, 2)}
      </pre>

      <form
        className="mx-auto w-[370px] min-w-[290px] p-6 bg-white/20 rounded-xl border-2 border-indigo-500 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title name="Login" />

        <LabeledInput
          id="email"
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <LabeledInput
          id="password"
          label="Senha"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <DefaultButton
          name="LOGIN"
          type="submit"
          isLoading={isSubmitting}
          className="w-full justify-center mt-2 py-3"
        />

        <div className="flex justify-center items-center mt-4">
          <span className="text-sm text-[#adadad] leading-6 pr-1.5">
            Não possuí uma conta?
          </span>
          <Link
            to="/cadastro"
            className="text-sm text-indigo-400 hover:text-cyan-500 leading-6 no-underline"
          >
            Criar conta.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};
