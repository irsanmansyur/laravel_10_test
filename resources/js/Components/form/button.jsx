import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../icons/spinner";
export default function ButtonCustom({ size = "normal", className, children, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        `px-2 sm:px-3 py-0 sm:py-2 font-medium text-center text-white bg-primary/90 rounded-lg hover:bg-primary focus:ring focus:outline-none focus:ring-primary/70 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary/80 relative`,
        className
      )}
    >
      {children}
      {props.disabled && (
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <Spinner />
        </div>
      )}
    </button>
  );
}
