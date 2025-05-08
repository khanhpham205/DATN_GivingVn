/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link';

import Button from "react-bootstrap/esm/Button";
import ButtonMUI from '@mui/material/Button';

import { useAuth } from "@/Authcontext";
import {  useState } from "react";

import AccountTags from "./components/A_tags";
import Account_Edit from './components/A_editaccount';
import Account_donationList from './components/A_dntList';
import Account_changepass from './components/A_changepass';

interface accountProp{
    user : M_user;
}
  

const Account = (prop:accountProp)=>{
    const { logout, checkuser } = useAuth();
    const { user } = prop;    
    
    const [ShowModel,setShowModel] = useState<boolean>(false)
    const [ShowchangepassModel,setShowchangepassModel] = useState<boolean>(false)

    return (<>
        <div className="gridsys userInfo">
            <Image width={1500} height={1500} src={ user.avatar || '/user.png'} alt='User Avatar'/>

            <h2 id='userInfo_Name'>Name: {user.name}</h2>
            <h3 id='userInfo_Email'>Email: {user.email}</h3>
            <h3 id='userInfo_Phone'>Phone Number: {user.phonenumber}</h3>
            <h3 id='userInfo_Role' > Role: {user.role}</h3>
            {(!user.flag) && <Link href='/account/KYC'>Xác thực KYC</Link>}
            
            {/* <ButtonMUI 
                variant="outlined" 
                id='userInfo_ChangePass' 
                onClick={()=>{setShowchangepassModel(true)}}
            >
                Đổi mật khẩu
            </ButtonMUI>

            <ButtonMUI 
                variant="contained" 
                id='userInfo_Edit' 
                onClick={()=>{setShowModel(true)}}
                color={'info'}
            >
                Edit
            </ButtonMUI>

            <ButtonMUI 
                variant="outlined"  
                id='userInfo_Delete' 
                color="error"
                // size='lar'
                onClick={()=>{logout();checkuser()}}
            >
                Log out
            </ButtonMUI> */}

            <Button variant="outline-primary"  id='userInfo_ChangePass' onClick={()=>{setShowchangepassModel(true)}} >Đổi mật khẩu</Button>
            <Button variant='primary' id='userInfo_Edit' onClick={()=>{setShowModel(true)}} >Edit</Button>
            <Button variant='outline-danger' id='userInfo_Delete' onClick={()=>{logout();checkuser()}} >Log out</Button>
        </div>


        {(user.role==='user')?<div className='gridsys'><Account_donationList/></div>
        :
            <AccountTags />
        }
        <Account_Edit 
            ShowUpdateModel={ShowModel} 
            setShowUpdateModel={setShowModel} user={user} 
        />
        <Account_changepass 
            ShowChangepassModel={ShowchangepassModel} 
            setShowChangepassModel={setShowchangepassModel}
        />


    </>)
}
export default Account