import { ReactNode } from "react";
export const SecondaryButton = ({ children, onClick, size = "small" }:
    { children: ReactNode, onClick: () => void, size?: "big" | "small" }
) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"}
     ${size === "small" ? "px-4 pt-2 pb-2" : "px-5 pb-4 pt-4" } cursor-pointer hover:shadow-md
      bg-white text-black border-2 border-gray-700 focus:border-pink-600  rounded-full  `}>
        {children}
    </div>

}