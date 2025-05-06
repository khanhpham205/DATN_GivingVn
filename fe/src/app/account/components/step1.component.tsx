/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

interface KYC_Step1_Props{
    handleStep : (step:number)=>void;
    check : ()=>void;
}

export default function KYC_Step1(prop:KYC_Step1_Props) {   

    const imgRef = useRef<HTMLImageElement>(null);
    const imgInoutRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState({})

    const changeImg = (e:HTMLInputElement)=>{
        if(e.files instanceof FileList){
            imgRef.current!.src = URL.createObjectURL(e.files[0])
            setFile(e.files[0])
        }
    }

    const handleSubmit = async()=>{
        
        if(file && file instanceof Blob){
            const formData = new FormData();
            const jwt = localStorage.getItem('JWT') 
            formData.append('f_img',file)

            console.log(123123);
            const fe = await fetch(`http://localhost:9000/user/userkyc1`,{
                method:'POST',
                headers:{
                    'authorization': `Bearer ${jwt}`,
                },
                body:formData
            })
            if(fe.ok){
                toast.success('Lưu ảnh thành công')
                prop.handleStep(2)
            }
        }else{
            toast.warning('Vui lòng chọn ảnh')
        }
    }
    // useEffect()
    return (<>
        <div className="KYC_tab KYC_f_img" style={{ textAlign: "center", padding: "20px" }}>
            <h2>Step 1 KYC</h2>
            <div className="f_img">

                <input id='f_img_input' capture="environment" 
                    type="file" accept="image/*" hidden
                    onChange={(e)=>{changeImg(e.currentTarget)}} 
                />
                
                <label  id='f_img_label' htmlFor="f_img_input">
                    <img id='f_img_preview'  ref={imgRef} 
                        src="/images/KYC_f_imgholder_dark.png" 
                        alt="Front cccd Img" 
                    />
                    <div id="f_img_input_fakeBt">Front Img</div>
                </label>
            </div>
            <Button onClick={handleSubmit}>Next</Button>



        </div>
    </>);
}
