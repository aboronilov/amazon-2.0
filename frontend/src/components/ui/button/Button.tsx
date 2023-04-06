import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';

import cn from "clsx"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant: "orange" | "white"
}

const Button: FC<PropsWithChildren<IButton>> = ({
   children, 
   className,
   variant, 
   ...restProps
}) => {
  return (
    <button 
      {...restProps} 
      className={
         cn(
            "rounded-xl font-medium shadow py-2 px-10", 
            {
               "text-white bg-primary" : variant === "orange",
               "text-primary bg-white": variant === "white"
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