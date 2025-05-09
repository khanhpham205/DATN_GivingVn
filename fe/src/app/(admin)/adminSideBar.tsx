/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@/Authcontext";
import { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    LayoutDashboard, 
    LogOut, 
    Settings, 
    ChevronDown,
    TableOfContents
} from 'lucide-react';
import './admin.css'



type MenuItem = {
    title: string;
    icon: JSX.Element;
    link?: string;
    children?: { name: string; link: string }[];
};

const menu: MenuItem[] = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard />,
        link: "/admin",
    },
    {
        title: "Quản lý nội dung",
        icon: <TableOfContents />,
        children: [
            { name: "Danh mục"  , link: "/admin/danhmuc" },
            { name: "Chiến dịch", link: "/admin/chiendich" },
        ],
    },
    {
        title: "Settings",
        icon: <Settings />,
        children: [
            { name: "Profile", link: "/admin" },
            { name: "Account", link: "/admin" },
        ],
    },
];

export default function AdminSideBar() {
    const { user, logout } = useAuth();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <aside className="h-full sideBar">
            <div className=" h-100 justify-between rounded-xl w-70 min-w-20 p-3 bg-gray-800 flex flex-col overflow-hidden">
                <div className="">
                    <Link href="/" > 
                        <Image
                            className="w-50"
                            src="/GivingVn.png"
                            width={400}
                            height={400}
                            alt=""
                        />
                    </Link>
                    
                    {menu.map((item, index) => (
                        <div key={index}>
                            {item.children?(
                                <button
                                    className="
                                        flex justify-between items-center
                                        mx-2 w-full 
                                    "
                                    onClick={() => toggle(index)}
                                >
                                    <div className="flex items-center gap-2">{item.icon} {item.title}</div>

                                    <ChevronDown
                                        className={`transition-transform duration-200 ${openIndex===index && "rotate-180"}`}
                                    />

                                </button>
                            ) : (
                                <Link
                                    href={String(item.link)}
                                    className={`
                                        flex items-center 
                                        mx-2 py-2 gap-2 
                                        text-white  
                                        hover:text-white-200
                                    `}
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            )}

                            {item.children && 
                                <div
                                    className={`
                                        overflow-hidden
                                        transition-all duration-200 
                                        text-sm ml-6 

                                        ${ openIndex === index? "max-h-40 py-1": "max-h-0"}
                                    `}
                                >
                                    {item.children.map((sub, i) => (
                                        <Link
                                            key={i}
                                            href={String(sub.link)}
                                            className="block py-1 px-2"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            }
                        </div>
                    ))}


                </div>

                <div className="flex justify-between items-center border-t-1 pt-2">
                    <div className="user rounded flex gap-3 items-center ">
                        <Image
                            className="rounded-full w-10 aspect-square  "
                            src={
                                !!user && user.avatar
                                    ? `${user?.avatar}`
                                    : "/user.png"
                            }
                            height={300}
                            width={300}
                            alt=""
                        />
                        <h4 className="p-0 m-0">{user?.name}</h4>
                    </div>


                    <div
                        className="cursor-pointer rounded-full aspect-square"
                        onClick={logout}
                    >
                        <LogOut />
                    </div>
                </div>
            </div>
        </aside>
    );
}
