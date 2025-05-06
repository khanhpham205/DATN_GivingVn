/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import dotenv from 'dotenv';
dotenv.config()
const apiurl = process.env.NEXT_PUBLIC_API_URL;

const BEURL={
    GG:`${apiurl}/user/login/google`,
    FB:`${apiurl}/user/login/facebook`
}

export const OauthbuttonFB = () =>{
    return (
    <button className="google-btn" 
        onClick={(e)=>{e.preventDefault();window.location.href=BEURL.GG}}
    >
        <img src="/GGlogo.png" alt="Google" width="20"/>
        Google
    </button>
    )

}
export const OauthbuttonGG = () =>{
    return (
    <button className="facebook-btn" 
        onClick={(e)=>{e.preventDefault();window.location.href=BEURL.FB}}
    >
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" width="20"/>
        Facebook
    </button>
    )
}

const Oauthbutton = () =>{
    return(
    <div className="OauthButtonList">
        <OauthbuttonGG/>
        <OauthbuttonFB/>
    </div>)

}
export default Oauthbutton