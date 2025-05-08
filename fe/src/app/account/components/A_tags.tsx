/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "react-bootstrap/esm/Button";
import Account_donationList from "./A_dntList";
import Account_ownpjList from "./A_ownpjList";
import { useState } from "react";
import { useAuth } from "@/Authcontext";
import GooeyNav from '@/components/ui/GooeyNav'


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

    const items = [
        { label: "Danh sách từ thiện" , func: ()=>{settab(1);} },
        { label: "Chiến dịch đã tạo"  , func: ()=>{settab(2);} },
    ];

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

            <div className="fullcol" style={{paddingTop:20}}>
                <GooeyNav
                    items={items}
                    particleCount={8}
                    particleDistances={[50, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                />
            </div>
            {render()}

        </main>
    );
};

export default AccountContent;
