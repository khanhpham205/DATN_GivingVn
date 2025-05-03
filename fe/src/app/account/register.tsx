/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// import Button from "react-bootstrap/Button";
import Image from 'next/image'

import Button from 'react-bootstrap/Button';
// import { FcGoogle } from 'react-icons/fc';
import Oauthbutton from "../../components/ui/OauthButton";

import { useEffect, useState } from "react";
import { log } from "console";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useAuth } from '../../Authcontext';

const Register=()=>{
    const router = useRouter();
    const { login,checkuser } = useAuth();

    useEffect(()=>{

        document.querySelectorAll('.register input:not([type=submit])').forEach(e=>{
            e.addEventListener('focus',()=>{
                e.classList.add('focused')
            })
        })

    },[])

    const handlelogin = async()=>{
        const email = document.getElementById('lgin_name') as HTMLInputElement
        const password = document.getElementById('lgin_password') as HTMLInputElement

        const data = {
            email: email.value,
            password: password.value
        }
        
        const fe = await fetch(`http://localhost:9000/user/login`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const res = await fe.json()
        if(fe.ok){
            localStorage.setItem('JWT',res)
            toast.success('Đăng nhập thành công')
            login()
            checkuser()
            router.push("/")
        }else{
            toast.warning(res.error)
        }      

    }
    const handlesignin = async()=>{
        const name = document.getElementById('sgnin_name') as HTMLInputElement
        const email = document.getElementById('sgnin_mail') as HTMLInputElement
        const phonenumber = document.getElementById('sgnin_phonenumber') as HTMLInputElement
        const password = document.getElementById('sgnin_pass') as HTMLInputElement

        const data = {
            username: name.value,
            email: email.value,
            phonenumber: phonenumber.value,
            password: password.value
        }
        const fe = await fetch(`http://localhost:9000/user/register`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const res = await fe.json()
        if(fe.ok){
            toast.success('Đăng ký thành công')
            document.getElementById('login')?.click()
        }
        else{
            toast.warning(res.error)
        }
    }

    return (<>
        <div id='register' className="register">
            <div className="register_form register_signin">
                <form 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        handlesignin()
                    }}
                >
                    <h1>Create account</h1>
                    <input 
                        id='sgnin_name'
                        type="text" placeholder="Name" 
                        pattern="^[\p{L}\p{N}\s]{5,20}$" 
                        title="Chiều dài từ 5 đến 20 ký tự" required/>
                    <input 
                        id='sgnin_mail'
                        type="email" placeholder="Email" 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                        title="Vui lòng nhập đúng Email" required/>
                    <input 
                        id='sgnin_phonenumber'
                        type="tel" placeholder="Phone Number" 
                        pattern="\d{10,12}" 
                        title="Số điện thoại chấp nhận từ 10 đến 12 số" required/>
                    <input 
                        id='sgnin_pass'
                        type="password" placeholder="Password" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        title="Phải ít nhất 8 ký tự bao gồm: In thường, In Hoa, Số" required/>

                    <input type="submit" value="Create" />
                    <Oauthbutton />
                </form>
            </div>
            <div className="register_form register_login" >
                <form 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        handlelogin()
                    }} 
                >
                    <h1>Log-In </h1>
                    <input id='lgin_name' type="text" placeholder="Email hoặc số điện thoại" required/>
                    <input id='lgin_password' type="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                    <input type="submit" value="Log In" />
                    <Oauthbutton />
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h2>Log In</h2>
                        <p>Enter your personal details to use all of site features</p>
                        <button 
                            id="login" 
                            onClick={()=>{document.getElementById('register')?.classList.remove('active')}}
                        >login</button>
                        
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h2>Sign In</h2>
                        <p>Register with your personal details to use all of site features</p>
                        <button id="register" onClick={()=>{document.getElementById('register')?.classList.add('active')}}>register</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Register