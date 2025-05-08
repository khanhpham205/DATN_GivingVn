/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import { Button } from "react-bootstrap";

// export default function KYC_process() {

//     return (<>
//         <div className="KYC_process" style={{ textAlign: "center", padding: "20px" }}>

//         </div>
//     </>);
// }

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

type Step = "front" | "back" | "video";

interface StepData {
    label: string;
    key: Step;
    lvl: number;
}

const steps: StepData[] = [
    { key: "front", label: "Front" ,   lvl:1},
    { key: "back", label: "Back" ,     lvl:2},
    { key: "video", label: "Verify" ,  lvl:3},
];

interface ProcessStepsProps {
    completedSteps: Step[];
    isIn: number;
}

export default function ProcessSteps({ completedSteps,isIn }: ProcessStepsProps) {
    const getWavePath = (index: number) => {
        if (index === 0) {
            // Đoạn 1: 1 sóng (mềm)
            return "M0,25 C25,0 75,50 100,25";
        } else if (index === 1) {
            // Đoạn 2: 1.5 sóng
            return `
                M0,25 
                C16.6,0 33.3,50 50,25 
                C66.6,0 83.3,25 100,25
            `;
        }
        return "";
    };
    return (
        <div className="flex items-center justify-center mt-4 fullcol">
            {steps.map((step, index) => {
                const isDone = completedSteps.includes(step.key);
                const isprocess = (isIn == index)

                const isLast = index === steps.length - 1;

                const lineprocess =  isDone && (step.lvl <= isIn ) 

                return (
                    <div className="flex items-center" key={step.key}>
                        {/* Vòng tròn bước */}
                        <motion.div
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-medium border-4 transition-colors duration-300 
                                ${isDone? 
                                    "border-green-500 text-green-600": "border-gray-300 text-gray-500"
                                }
                                ${isprocess?"border-yellow-500":""}
                                `
                            }
                        >
                            {isDone ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : (
                                step.label
                            )}
                        </motion.div>

                        {/* Đường cong nối */}
                        {!isLast && (
                            <div className="w-24 h-12 relative mx-2">
                                <svg
                                    viewBox="0 0 100 50"
                                    preserveAspectRatio="none"
                                    className="w-full h-full"
                                >
                                    <path
                                        d={getWavePath(index)}
                                        stroke={(lineprocess)?'#4CAF50':"#ccc"}
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
