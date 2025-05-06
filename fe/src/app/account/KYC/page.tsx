/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react"
import  KYC_Step1   from "../components/step1.component";
import  KYC_Step2   from "../components/step2.component";
import  KYC_Step3   from "../components/step3.component";
import  KYC_Process from "../components/process.component";
import { Button }   from "react-bootstrap";
import axios from "axios";
type Step = "front" | "back" | "video";

export default function KYCPage(){
    const [ step, setStep ] = useState<number>(1)
    const [ process, setprocess ] = useState<Step[]>([])
    // const [ user, setStep ] = useState<number>(3)

    const checkKYC = async()=>{
        const jwt = localStorage.getItem('JWT')
        const fe = await fetch(`http://localhost:9000/user/kyccheck`,{
            method:'GET',
            headers:{
                'authorization': `Bearer ${jwt}`, 
            }
        })
        const re = await fe.json()
        if(fe.ok && re.verification_status){
            setStep(re.verification_status)
        }
    }
    useEffect(()=>{
        checkKYC()
        //call api get step & data
    },[])
    useEffect(()=>{
        switch (step) {
            case 1:
                setprocess([])
                break;
            case 2:
                setprocess(['front'])
                break;
            case 3:
                setprocess(['front','back'])
                break;
        }
    },[step])


    const renderKYCStep = ()=>{
        switch (step) {
            case 1:
                return <KYC_Step1 handleStep={setStep} check={checkKYC} />
            case 2:
                return <KYC_Step2 handleStep={setStep} check={checkKYC} />
            case 3:
                return <KYC_Step3 handleStep={setStep} check={checkKYC} />
            default:
                return <KYC_Step1 handleStep={setStep} check={checkKYC} />
        }
    }
    return <div className="KYC_main">
        <KYC_Process completedSteps={process} />

        {renderKYCStep()}

        {/* <Button onClick={()=>{setStep(1)}}>Step1</Button>
        <Button onClick={()=>{setStep(2)}}>Step2</Button>
        <Button onClick={()=>{setStep(3)}}>Step3</Button> */}
    </div>
}