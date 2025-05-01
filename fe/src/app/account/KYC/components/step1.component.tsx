/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "react-bootstrap";



export default function KYC_Step1() {

    const [isverified,setisverified] = useState<boolean>(false)



    const imgRef = useRef<HTMLImageElement>(null);

    const changeImg = (e:HTMLInputElement)=>{
        if(e.files instanceof FileList){
            imgRef.current!.src = URL.createObjectURL(e.files[0])
        }
    }

    return (<>
        <div className="KYC_f_img" style={{ textAlign: "center", padding: "20px" }}>
            <h2>Step 1 KYC</h2>
            <div className="f_img">

                <input id='f_img_input' capture="environment" 
                    type="file" accept="image/*" hidden
                    onChange={(e)=>{changeImg(e.currentTarget)}} 
                />

                <label id='f_img_label' htmlFor="f_img_input">
                    <img id='f_img_preview'  ref={imgRef} 
                        src="/images/KYC_f_imgholder_light.png" 
                        alt="Front cccd Img" 
                    />
                    <div id="f_img_input_fakeBt">Front Img</div>
                </label>
            </div>



        </div>
    </>);
}
