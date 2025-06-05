import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LayoutComponents } from "../../components/Layouts";
import { Title } from "../../components/Title/Title";
import { LabeledInput, LabeledTextarea } from "../../components/Inputs";
import { DefaultButton } from "../../components/Buttons";

enum Period {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
}

enum System {
  DND5E = "DND5E",
  ORDEM_PARANORMAL = "ORDEM_PARANORMAL",
  CALL_OF_CTHULHU = "CALL_OF_CTHULHU",
  VAMPIRE = "VAMPIRE",
  TORMENTA = "TORMENTA",
  CYBER_DUCK = "CYBER_DUCK",
  OTHER = "OTHER",
}

const sessionSchema = z.object({
  title: z.string().min(3, "Título obrigatório"),
  description: z.string().min(10, "Descrição obrigatória"),
  system: z.nativeEnum(System, {
    errorMap: () => ({ message: "Escolha um sistema" }),
  }),
  period: z.nativeEnum(Period, {
    errorMap: () => ({ message: "Escolha um período" }),
  }),
  min_players: z.coerce.number().min(1, "Mínimo 1 jogador"),
  max_players: z.coerce
    .number()
    .min(2, "O maximo deve ser pelo menos 2 jogadores"),
  requiriments: z.string().optional(),
  possible_dates: z
    .array(z.object({ date: z.string().min(1, "Data obrigatória") }))
    .min(1, "Adicione pelo menos uma data"),
});

type SessionFormData = z.infer<typeof sessionSchema>;

export const MasterSessions = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: "",
      description: "",
      system: "" as System,
      period: "" as Period,
      min_players: 1,
      max_players: 1,
      requiriments: "",
      possible_dates: [{ date: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "possible_dates",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  {
    /* const watchAll = watch();*/
  }

  const onSubmit = async (data: SessionFormData) => {
    setIsSubmitting(true);
    try {
      alert("Sessão emitida com sucesso!\n" + JSON.stringify(data, null, 2));
    } finally {
      setIsSubmitting(false);
    }
  };

  const PeriodLabels: Record<keyof typeof Period, string> = {
    Morning: "Manhã",
    Afternoon: "Tarde",
    Evening: "Noite",
  };

  const SystemLabels: Record<keyof typeof System, string> = {
    DND5E: "D&D 5ª Edição",
    ORDEM_PARANORMAL: "Ordem Paranormal",
    CALL_OF_CTHULHU: "Call of Cthulhu",
    VAMPIRE: "Vampiro: A Máscara",
    TORMENTA: "Tormenta",
    CYBER_DUCK: "Cyber Duck",
    OTHER: "Outro",
  };

  return (
    <LayoutComponents withNavbar={true}>
      {/* <pre className="bg-black/60 text-green-300 p-4 rounded mb-4 text-xs max-w-md mx-auto overflow-x-auto">
        {JSON.stringify(watchAll, null, 2)}
      </pre> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 bg-white/20 rounded-xl border-2 border-indigo-500 shadow-lg"
      >
        <Title name="Emitir Sessão" />

        <LabeledInput
          id="title"
          label="Título"
          {...register("title")}
          error={errors.title?.message}
        />

        <LabeledInput
          id="description"
          label="Descrição"
          {...register("description")}
          error={errors.description?.message}
        />

        <LabeledInput
          id="system"
          label="Sistema"
          options={Object.entries(System).map(([key]) => ({
            value: key,
            label: SystemLabels[key as keyof typeof System],
          }))}
          {...register("system")}
          error={errors.system?.message}
        />

        <LabeledInput
          id="period"
          label="Período"
          options={Object.entries(Period).map(([key]) => ({
            value: key,
            label: PeriodLabels[key as keyof typeof Period],
          }))}
          {...register("period")}
          error={errors.period?.message}
        />

        <div className="flex gap-4">
          <LabeledInput
            id="min_players"
            label="Mínimo de Jogadores"
            type="number"
            min={1}
            {...register("min_players")}
            error={errors.min_players?.message}
          />
          <LabeledInput
            id="max_players"
            label="Máximo de Jogadores"
            type="number"
            min={1}
            {...register("max_players")}
            error={errors.max_players?.message}
          />
        </div>

        <LabeledTextarea
          id="requiriments"
          label="Requisitos (opcional)"
          {...register("requiriments")}
          error={errors.requiriments?.message}
        />

        <div className="mb-4">
          <label className="block text-base font-normal text-white mb-1 font-prompt">
            Datas possíveis
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                type="date"
                {...register(`possible_dates.${index}.date` as const)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 font-bold"
                disabled={fields.length === 1}
              >
                Remover
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ date: "" })}
            className="text-cyan-400 font-bold"
          >
            + Adicionar data
          </button>
          {errors.possible_dates && (
            <p className="mt-1 text-base text-red-600">
              {errors.possible_dates.message as string}
            </p>
          )}
        </div>

        <DefaultButton className="w-full"
          name="EMITIR SESSÃO"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </LayoutComponents>
  );
};
