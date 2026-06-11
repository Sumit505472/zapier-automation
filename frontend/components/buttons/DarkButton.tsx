
import { ReactNode } from "react";
export const DarkButton = ({ children, onClick }:
    { children: ReactNode, onClick: () => void, }
) => {
    return <div onClick={onClick} className={`flex flex-col justify-center px-8 py-2 cursor-pointer hover:shadow-md
      bg-purple-500 text-white   `}>
        {children}
    </div>

}