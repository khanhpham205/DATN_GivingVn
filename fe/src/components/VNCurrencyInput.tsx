/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface VNDInputProps {
    value: string;
    onChange: (value: string, numberValue: number) => void;
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
}

export default function VNDInput({
    value,
    onChange,
    suffix = " VND",
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    step = 10000,
}: VNDInputProps) {

    const getNumber = (val: string) => Number(val.replace(/[^0-9]/g, "")) || 0;

    // Khi nhập chỉ format số, không nhân step, không ép min/max
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        const formatted = raw ? Number(raw).toLocaleString("vi-VN") : "";
        onChange(formatted, Number(raw || "0"));
    };

    // Khi blur hoặc Enter mới nhân step nếu nhỏ hơn min
    const handleBlurOrEnter = () => {
        let num = getNumber(value);


        if (num > max){num = max}
        else if(num < min){
            
            if (num * 1000 > max) {
                num = min;
                console.log(num);
                
            }else{
                num = num * 1000;
            }
        }
        

        const formatted = num ? num.toLocaleString("vi-VN") : "";
        onChange(formatted, num);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleBlurOrEnter();
        }
    };

    const handleIncrease = () => {
        let num = getNumber(value) + step;
        if (num > max) num = max;
        const formatted = num ? num.toLocaleString("vi-VN") : "";
        onChange(formatted, num);
    };

    const handleDecrease = () => {
        let num = getNumber(value) - step;
        if (num < min) num = min;
        const formatted = num ? num.toLocaleString("vi-VN") : "";
        onChange(formatted, num);
    };

    return (
        <div className="relative flex items-center">
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    inputMode="numeric"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleKeyDown}
                    placeholder={min.toLocaleString("vi-VN")}
                    className="pr-16 pl-2 py-2 border-t border-b border-gray-300 w-full"
                    autoComplete="off"
                />
                <span className="absolute right-3 text-gray-500 pointer-events-none select-none">
                    {suffix}
                </span>
            </div>
            <div>
                <div className="flex flex-col ml-2">
                    <ChevronUp
                        className="text-gray-500 hover:text-black cursor-pointer"
                        onClick={handleIncrease}
                    />
                    <ChevronDown
                        className="text-gray-500 hover:text-black cursor-pointer"
                        onClick={handleDecrease}
                    />
                </div>
            </div>
        </div>
    );
}
