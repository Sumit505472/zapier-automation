import { ReactNode } from "react";
export const PrimaryButton = ({ children, onClick, size = "small" }:
    { children: ReactNode, onClick: () => void, size?: "big" | "small" }
) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"}
     ${size === "small" ? "px-4 pt-2 pb-2" : "px-6 py-2 pt-4" } cursor-pointer hover:shadow-md
      bg-[#FF4F00] text-white  rounded-full  `}>
        {children}
    </div>

}