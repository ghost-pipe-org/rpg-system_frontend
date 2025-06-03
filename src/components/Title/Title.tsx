interface TitleProps {
  name: string;
}

export const Title = ({ name }: TitleProps) => {
  return (
    <div className="flex justify-center w-full">
      <h1 className="font-pixelsans font-medium text-white text-[2rem] text-center pb-5
                    [text-shadow:_2px_0_theme(colors.indigo.800),_0_2px_theme(colors.indigo.600)]">
        {name}
      </h1>
    </div>
  );
};  