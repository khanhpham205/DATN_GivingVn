/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../Authcontext";
import { use } from "react";

interface accountProp{
    user : M_user;
}
const Account = (prop:accountProp)=>{
    const { user } = prop;
    console.log(user);
    

    const { logout } = useAuth();

    return (
    <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.phonenumber}</h1>
        <img src={user.avatar} alt=''/>
        <h1>{user.phonenumber}</h1>
        <Button onClick={logout} ></Button>
    </div>)
}
export default Account