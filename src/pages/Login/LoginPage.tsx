import { useState, useContext, FormEvent } from "react";
import { Link } from "react-router-dom";
import { LayoutComponents } from "../../components/Layouts";
import { LabeledInput } from "../../components/Inputs";
import { DefaultButton } from "../../components/Buttons";
import { Title } from "../../components/Title";
import { AuthContext } from "../../context/auth";
import { Navigate } from "react-router-dom";

// Esse login só Deus sabe como eu vou fazer funcionar quando otimizar o código

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signed } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError("Email é obrigatório");
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Email inválido");
      return false;
    }

    if (!formData.password) {
      setError("Senha é obrigatória");
      return false;
    } else if (formData.password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres");
      return false;
    }

    setError("");
    return true;
  };

  const handleSignIn = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
  
    const userData = {
      email: formData.email.trim(),
      password: formData.password,
    };
  
    try {
      await signIn(userData.email, userData.password);
      alert("Login realizado com sucesso!");
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };



  const submitForm = async (): Promise<void> => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      console.log("Dados enviados:", {
        email: formData.email.trim(),
        password: formData.password,
      });

      alert("Login realizado com sucesso!");

      setFormData({
        email: "",
        password: "",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado";
      setError(`Falha no login: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (signed) {
    return <Navigate to="/" />;
  }
  else {
    return (
      <LayoutComponents withNavbar={true}>	
        <form className="mx-auto p-6 bg-white/20 rounded-xl border-2 border-indigo-500 shadow-lg">
          <Title name="Login" />
  
          {error && (
            <div className="block text-base font-normal font text-red-500 mb-1 font-prompt">
              {error}
            </div>
          )}
  
          <LabeledInput
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Insira seu@email.com"
            required={true}
            minLength={6}
            onBlur={() => {
              if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
                setError("Email inválido");
              }
            }}
          />
  
          <LabeledInput
            id="password"
            name="password"
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Insira sua senha"
            required={true}
            minLength={6}
          />
  
          <DefaultButton
            name="LOGIN"
            onClick={async (e) => {
              e.preventDefault();
              await submitForm();
            }}
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

          
          <div className="flex justify-center items-center mt-1">
            <Link
              to="/admin"
              className="text-sm text-indigo-400 hover:text-cyan-500 leading-6 no-underline"
            >
              Acessar área administrativa.
            </Link>
          </div>
        </form>
      </LayoutComponents>
    );
  }
};