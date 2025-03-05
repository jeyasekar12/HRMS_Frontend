import clsx from "clsx";
import React from "react";


const Textarea = React.forwardRef(

    ({
        type, placeholder, label, register, name, errors, className, value, onchange
    }, ref) => {
        return (
            <div className="w-full flex flex-col gap-1">


                {label && (
                    <label htmlFor={name} className="flex justify-between items-center text-slate-800 text-start">
                        <span>{label}</span>
                        {name === "log_password" && (
                            <a
                                href="/forgot-password"
                                className="text-sm text-red-500 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        )}
                    </label>
                )}




                <div>
                    <input type={type}
                        name={name}
                        placeholder={placeholder}
                        ref={ref}
                        {...register}
                        value={value}
                        onChange={onchange}
                        aria-invalid={errors ? "true" : "false"}
                        className={clsx("bg-transparent px-3 pt-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 outline-none text-base focus:right-2 ring-blue-300", className)} />



                </div>

                {
                    errors && (
                        <span className="text-sm text-red-500 mt-0.5 text-start">{errors}</span>
                    )
                }
            </div>
        );
    }
)



export default Textarea