import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';

import cn from "clsx"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant: "orange" | "white"
   size?: "sm" | "md" | "lg"
}

const Button: FC<PropsWithChildren<IButton>> = ({
   children, 
   className,
   variant,
   size="md", 
   ...restProps
}) => {
  return (
    <button 
      {...restProps} 
      className={
         cn(
            "rounded-xl font-medium py-2 px-10 hover:shadow-lg hover:opacity-95 transition", 
            {
               "text-white bg-primary" : variant === "orange",
               "text-primary bg-white": variant === "white",
               "px-5 py-1 text-sm": size === "sm"
            },
            className,
         )
      }
   >
      {children}
   </button>
  )
}

export default Button