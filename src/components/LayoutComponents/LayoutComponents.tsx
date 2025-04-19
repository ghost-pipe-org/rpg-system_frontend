import { ReactNode } from "react";

interface LayoutComponentsProps {
  children: ReactNode;
}

export const LayoutComponents = ({ children }: LayoutComponentsProps) => {
  return (
    <div className="bg-gray-900 bg-[url('')] bg-cover bg-center">
      <div className="w-full min-h-screen flex flex-wrap items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};
