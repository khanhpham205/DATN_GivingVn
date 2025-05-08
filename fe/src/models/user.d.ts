interface M_user{
    _id:string;
    name: string;
    email: string
    phonenumber: string;
    avatar: string;
    role:string
}

//KYC
interface KYC_user_dt{
    front : string | null | undefined;
    back  : string | null | undefined;
}
interface KYC_Step_Props{
    handleStep : (step:number)=>void;
    move       : (page:number)=>void;
    check      : ()=>void;
    done       : number;
    dturl      : KYC_user_dt | null;
}