interface TitleProps {
  name: string;
}

export default function Title({ name }: TitleProps) {
  return (
    <div className="flex justify-center w-full">
      <h1
        className="font-pixelsans font-medium text-white text-[2rem] text-center pb-5"
        style={{ textShadow: '2px 0 #3730a3, 0 2px #4f46e5' }}
      >
        {name}
      </h1>
    </div>
  );
};  

export {default as Title} from "./Title";