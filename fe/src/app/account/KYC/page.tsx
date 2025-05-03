"use client"
import { useState, useEffect } from "react"
import  KYC_Step1   from "./components/step1.component";
import  KYC_Step2   from "./components/step2.component";
import  KYC_Step3   from "./components/step3.component";
import  KYC_Process from "./components/process.component";
import { Button }   from "react-bootstrap";


export default function KYCPage(){
    const [ step, setStep ] = useState<number>(3)
    useEffect(()=>{
        //call api get step & data
    },[])


    const renderKYCStep = ()=>{
        switch (step) {
            case 1:
                return <KYC_Step1/>
            case 2:
                return <KYC_Step2/>
            case 3:
                return <KYC_Step3/>
            default:
                return <KYC_Step1/>
        }
    }
    return <div className="KYC_main">

        <h2 className="mt-4" style={{textAlign:"center"}}>KYC PAGE</h2>

        <Button onClick={()=>{setStep(1)}}>Step1</Button>
        <Button onClick={()=>{setStep(2)}}>Step2</Button>
        <Button onClick={()=>{setStep(3)}}>Step3</Button>

        <KYC_Process/>
        {renderKYCStep()}
    </div>
}