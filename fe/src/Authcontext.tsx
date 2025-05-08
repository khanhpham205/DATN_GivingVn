/* eslint-disable @typescript-eslint/no-unused-vars */
// context/AuthContext.tsx
"use client"
import {
    createContext, 
    useContext, 
    useState, 
    ReactNode, 
    useEffect, 
} from 'react';
import { useRouter} from 'next/navigation';

import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()
const apiurl = process.env.NEXT_PUBLIC_API_URL;

type AuthContextType = {
  isLoggedIn: boolean;
  isadmin: boolean|string|undefined;
  login: () => void;
  logout: () => void;
  checkuser:()=> void;
  user: M_user|null;
};

const roleWhiteList = [
    "adminlvl1_Bac",
    "adminlvl1_Trung",
    "adminlvl1_Nam", 
    "admin"
]

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setuser] = useState(null);
    const [isadmin, setisadmin] = useState<boolean|string|undefined>();
    const [admin, setadmin] = useState<boolean|string>(false);

    
    const checkuser = async()=>{
        const jwt = localStorage.getItem('JWT')
        try {
            const a = await axios.get(`${apiurl}/user/check`,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
            if(a.status==200 && a.data.userId){
                setIsLoggedIn(true)
                setuser(a.data)
                
                if(roleWhiteList.includes(a.data.role)){
                    setisadmin(a.data.role)
                }else{
                    setisadmin(false)
                }
            }
            return;
        } catch (error){throw error}
    }

    const login = () => {
        setIsLoggedIn(true)
        checkuser()
    };

    const logout = async() => {
        localStorage.removeItem('JWT')
        setIsLoggedIn(false)
        setisadmin(false)
        setuser(null)
        // await checkuser()
    };
    const Mount=async()=>{
        await checkuser()
    }
    
    useEffect(()=>{
        Mount()
    },[])

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isadmin, login, logout, checkuser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
