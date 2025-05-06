/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "react-bootstrap/esm/Button";
import Account_donationList from "./A_dntList";
import Account_ownpjList from "./A_ownpjList";
import { useState } from "react";
import { useAuth } from "@/Authcontext";


const AccountContent = () => {
    // const { user } = useAuth();

    const [tab, settab] = useState<number>(1);
    const render = ()=>{
        switch (tab) {
            case 1:
                return <Account_ownpjList    />;
            case 2:
                return <Account_donationList />;
            default:
                return <Account_ownpjList    />;
        }
    }

    return (
        <main className="gridsys">
            <div className="fullcol tags_handle">
                <Button
                    className={(tab===1)?'active':''}
                    onClick={(e) => {
                        e.preventDefault();
                        settab(1);
                    }}
                >
                    Danh sách từ thiện
                </Button>
                <Button
                    className={(tab===2)?'active':''}
                    onClick={(e) => {
                        e.preventDefault();
                        settab(2);
                    }}
                >
                    Chiến dịch đã tạo
                </Button>
            </div>
            {render()}

        </main>
    );
};

export default AccountContent;
