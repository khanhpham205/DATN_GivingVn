/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link';

import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../Authcontext";
import { use, useState } from "react";
// import Account_donationList from "./components/A_dntList";
// import Account_tags from "./components/A-tags";

import AccountTags from "./components/A_tags";
import Account_Edit from './components/A_editaccount';
import Account_donationList from './components/A_dntList';




interface accountProp{
    user : M_user;
}


  

const Account = (prop:accountProp)=>{
    const { logout,checkuser } = useAuth();
    const { user } = prop;    

    const [ShowModel,setShowModel] = useState<boolean>(false)

    return (<>
        <div className="gridsys userInfo">
            <Image width={1500} height={1500} src={ user.avatar || '/user.png'} alt='User Avatar'/>

            <h2 id='userInfo_Name'>Name: {user.name}</h2>
            <h3 id='userInfo_Email'>Email: {user.email}</h3>
            <h3 id='userInfo_Phone'>Phone Number: {user.phonenumber}</h3>
            
            <Link href='/account/KYC'>Xác thực KYC</Link>
            {/* <Button id='' onClick={()=>{}}> */}
            {/* </Button> */}
            <Button id='userInfo_Edit' onClick={()=>{setShowModel(true)}} >Edit</Button>
            <Button id='userInfo_Delete' onClick={()=>{logout();checkuser()}} >Log out</Button>
        </div>


        {(user.role==='user')?<div className='gridsys'><Account_donationList/></div>
        :
            <AccountTags />
        }
        <Account_Edit ShowUpdateModel={ShowModel} setShowUpdateModel={setShowModel} user={user} />
    </>)
}
export default Account