/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useSearchParams , useRouter} from 'next/navigation';

import { useEffect, useState } from "react";
import { useAuth } from '../../Authcontext';

import Register from "./register";
import Account from "./account";
import Loading from "../../components/loadingPage";
import { toast } from 'react-toastify';

export default function Accountpage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const loginp = searchParams.get("login");
    const JWTtoken = searchParams.get("token");
    const [accstatus,setaccstatus] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    
    const { user, checkuser, login, isLoggedIn } =  useAuth();
    const Mouting = async()=>{
        checkuser()
        if(loginp && JWTtoken){
            localStorage.setItem('JWT',JWTtoken)
            router.push('/')
            toast.success('Đăng nhập thành công')
            login()
        }
        setIsLoading(false);

        setaccstatus('logedin')
    }
    useEffect(()=>{
        
        Mouting()
    },[])

    return(
    <>
        {isLoading ? <Loading /> : (user && isLoggedIn ? <Account user={user} /> : <Register />)}
    </>
    )
}