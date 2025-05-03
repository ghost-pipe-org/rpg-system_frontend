import { useState, useCallback } from "react";
import { LayoutComponents } from "../../components/LayoutComponents/LayoutComponents";
import { LabeledInput } from "../../components/LabeledInput/LabeledInput";
import { Button } from "../../components/Button/Button";
import {Title} from "../../components/Title/Title";

interface FormData {
  username: string;
  phoneNumber: string;
  email: string;
  masterConfirm: boolean;
  enrollment: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    phoneNumber: "",
    email: "",
    masterConfirm: false,
    enrollment: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formatPhoneNumber = useCallback((value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 11);

    if (limited.length <= 2) return limited;
    if (limited.length <= 7) return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`;
  }, []);

  const formatEnrollment = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 9);
    
    if (limited.length <= 4) return limited;
    if (limited.length <= 7) return `${limited.slice(0, 4)}.${limited.slice(4)}`;
    return `${limited.slice(0, 4)}.${limited.slice(4, 7)}.${limited.slice(7, 9)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const handleEnrollmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatEnrollment(e.target.value);
    setFormData((prev) => ({ ...prev, enrollment: formatted }));
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError("Nome é obrigatório");
      return false;
    }

    const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
    if (!phoneDigits) {
      setError("Telefone é obrigatório");
      return false;
    } else if (phoneDigits.length < 11) {
      setError("Telefone incompleto (precisa de 11 dígitos)");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email é obrigatório");
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Email inválido");
      return false;
    }

    if (formData.masterConfirm) {
      const enrollmentDigits = formData.enrollment.replace(/\D/g, "");
      if (!enrollmentDigits) {
        setError("Matrícula é obrigatória para mestres");
        return false;
      } else if (enrollmentDigits.length !== 9) {
        setError("Matrícula deve ter 9 dígitos no formato 0000.000.00");
        return false;
      }
    }

    if (!formData.password) {
      setError("Senha é obrigatória");
      return false;
    } else if (formData.password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }

    setError("");
    return true;
  };

  const submitForm = async (): Promise<void> => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      console.log("Dados enviados:", {
        username: formData.username.trim(),
        phoneNumber: formData.phoneNumber.replace(/\D/g, ""),
        email: formData.email.trim(),
        masterConfirm: formData.masterConfirm,
        enrollment: formData.enrollment.replace(/\D/g, ""),
      });

      alert("Cadastro realizado com sucesso!");
      
      setFormData({
        username: "",
        phoneNumber: "",
        email: "",
        masterConfirm: false,
        enrollment: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Ocorreu um erro inesperado";
      setError(`Falha no cadastro: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LayoutComponents>
      <form className="max-w-md mx-auto p-6 bg-white/20 rounded-xl border-2 border-indigo-500 shadow-lg">

      <Title name="Cadastro"/>
      
        {error && (
          <div className="block text-base font-normal font text-red-500 mb-1 font-prompt">
            {error}
          </div>
        )}

        <LabeledInput
          id="username"
          name="username"
          label="Nome*"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Insira seu nome"
          required={true}
        />

        <LabeledInput
          id="phone-number"
          name="phoneNumber"
          label="Telefone*"
          type="tel"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(00) 00000-0000"
          pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
          maxLength={15}
          required={true}
          onBlur={() => {
            const digits = formData.phoneNumber.replace(/\D/g, "");
            if (digits.length > 0 && digits.length < 11) {
              setError("Telefone incompleto (precisa de 11 dígitos)");
            }
          }}
        />

        <LabeledInput
          id="email"
          name="email"
          label="Email*"
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

        <div className="flex flex-col mb-4">
          <div className="flex items-baseline gap-2">
            <LabeledInput
              id="masterConfirm"
              name="masterConfirm"
              label=""
              type="checkbox"
              checked={formData.masterConfirm}
              onChange={handleChange}
              className="mt-0.5"
            />
            <label
              htmlFor="masterConfirm"
              className="block leading-tight text-white"
            >
              Desejo Mestrar
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-[-12px] pl-7 whitespace-normal">
            Ao selecionar esta opção, você confirma que{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              deseja emitir mesas de RPG.
            </span>
          </p>
        </div>

        <LabeledInput
          id="enrollment"
          name="enrollment"
          label={formData.masterConfirm ? "Matrícula*" : "Matrícula"}
          type="text"
          value={formData.enrollment}
          onChange={handleEnrollmentChange}
          placeholder="0000.000.00"
          required={formData.masterConfirm}
          maxLength={11} 
          onBlur={() => {
            if (formData.masterConfirm) {
              const digits = formData.enrollment.replace(/\D/g, "");
              if (digits.length !== 9) {
                setError("Matrícula deve ter 9 dígitos no formato 0000.000.00");
              }
            }
          }}
        />

        <LabeledInput
          id="password"
          name="password"
          label="Senha*"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Insira sua senha"
          required={true}
          minLength={6}
        />

        <LabeledInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar senha*"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme sua senha"
          required={true}
          minLength={6}
        />

        <Button
          name="CRIAR CONTA"
          onClick={async (e) => {
            e.preventDefault();
            await submitForm();
          }}
          type="submit"
          isLoading={isSubmitting}
          className="w-full justify-center mt-6 py-3"
        />
      </form>
    </LayoutComponents>


  );
};