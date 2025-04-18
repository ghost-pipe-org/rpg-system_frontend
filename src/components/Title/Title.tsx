interface TitleProps {
  name: string;
}

export const Title = ({ name }: TitleProps) => {
  return (
    <h1
      className="flex justify-center items-center font-pixelsans font-medium text-white text-[2.5rem]
               [text-shadow:_2px_0_theme(colors.indigo.800),_0_2px_theme(colors.indigo.600)]"
    >
      {name}
    </h1>
  );
};
