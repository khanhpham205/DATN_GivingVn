/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react"
import  KYC_Step1   from "../components/step1.component";
import  KYC_Step2   from "../components/step2.component";
import  KYC_Step3   from "../components/step3.component";
import  KYC_Process from "../components/process.component";
import { Button }   from "react-bootstrap";
import axios from "axios";
import { useRouter} from 'next/navigation';
import { toast } from "react-toastify";
type Step = "front" | "back" | "video";

export default function KYCPage(){
    const router = useRouter()

    const [ step, setStep ] = useState<number>(0)
    const [ isIn, setisIn ] = useState<number>(0)
    
    const [ fimg, setfimg ] = useState<KYC_user_dt|null>(null)
    
    const [ process, setprocess ] = useState<Step[]>([])

    const checkKYC = async()=>{
       
        const jwt = localStorage.getItem('JWT')
        const fe = await fetch(`http://localhost:9000/user/kyccheck`,{
            method:'GET',
            headers:{
                'authorization': `Bearer ${jwt}`, 
            }
        })
        const re = await fe.json()
        
        if(fe.ok && re.usercheck.verification_status){
            setStep(re.usercheck.verification_status)
            setfimg({
                front:re.usercheck?.dt_front_cccd,
                back:re.usercheck?.dt_back_cccd
            })
        }
        if(re.usercheck.verification_status == 3 && re.usercheck.flag){
            router.push('/account')
            toast.success('Bạn đã xác thực KYC')
        }
    }
    useEffect(()=>{
        checkKYC()
    },[])

    useEffect(()=>{
        switch (step) {
            case 0:
                setprocess([])
                break;
            case 1:
                setprocess(['front'])
                break;
            case 2:
                setprocess(['front','back'])
                break;
        }
        setisIn(step)
    },[step])


    const renderKYCStep = ()=>{
        switch (isIn) {
            case 0:
                return <KYC_Step1 dturl={fimg} done={step} move={setisIn} handleStep={setStep} check={checkKYC} />
            case 1:
                return <KYC_Step2 dturl={fimg} done={step} move={setisIn} handleStep={setStep} check={checkKYC} />
            case 2:
                return <KYC_Step3 dturl={null} done={step} move={setisIn} handleStep={setStep} check={checkKYC} />
            default:
                return <KYC_Step1 dturl={null} done={step} move={setisIn} handleStep={setStep} check={checkKYC} />
        }
    }
    return <div className="KYC_main gridsys">
        <KYC_Process isIn={isIn} completedSteps={process} />

        {renderKYCStep()}

        {/* <Button onClick={()=>{setisIn(0)}}>Step1</Button>
        <Button onClick={()=>{setisIn(1)}}>Step2</Button>
        <Button onClick={()=>{setisIn(2)}}>Step3</Button> */}
    </div>
}