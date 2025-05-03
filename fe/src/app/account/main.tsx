/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useSearchParams , useRouter} from 'next/navigation';

import { useEffect, useState } from "react";
import { useAuth } from '../../Authcontext';

import Register from "./register";
import Account from "./account";
import Loading from "../../components/loadingPage";

export default function Accountpage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const login = searchParams.get("login");
    const JWTtoken = searchParams.get("token");
    const [accstatus,setaccstatus] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    
    const { user, checkuser,isLoggedIn } =  useAuth();
    const Mouting = async()=>{
        setaccstatus('logedin')
        setIsLoading(false);
    }
    useEffect(()=>{
        Mouting()
    },[])
    if(login && JWTtoken){
        checkuser()
        localStorage.setItem('JWT',JWTtoken)
        router.push('/')
    }

    return(
    <>
        {isLoading ? <Loading /> : (user && isLoggedIn ? <Account user={user} /> : <Register />)}
    </>
    )
}