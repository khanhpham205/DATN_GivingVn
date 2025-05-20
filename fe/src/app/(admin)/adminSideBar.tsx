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
    const [collapsed, setCollapsed] = useState(false);
    const [hovered, setHovered] = useState(false);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <aside
            className="h-full sideBar transition-all duration-200 h-100 justify-between rounded-xl w-full p-3 bg-gray-800 flex flex-col overflow-hidden"
            style={{ width: hovered ? 300 : 64, minWidth: hovered ? 300 : 64}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div>
                <div className="flex items-center justify-center mb-2">
                    <Link href="/">
                        <Image
                            className={`transition-all duration-200 ${hovered ? 'w-50' : 'w-12'}`}
                            src="/GivingVn.png"
                            width = {hovered ? 400 : 48}
                            height = {hovered ? 400 : 48}
                            alt=""
                        />
                    </Link>
                </div>
                {menu.map((item, index) => (
                    <div key={index}>
                        {item.children ? (
                            <button
                                className={`flex justify-between items-center  w-full ${!hovered ? 'justify-center mx-0' : 'mx-2'}`}
                                onClick={() => hovered && toggle(index)}
                                tabIndex={0}
                                style={{ pointerEvents: hovered ? 'auto' : 'none' }}
                            >
                                <div className={`flex items-center gap-2 ${!hovered ? 'justify-center w-full' : ''}`}>{item.icon}{(hovered) && item.title}</div>
                                {hovered && (
                                    <ChevronDown
                                        className={`transition-transform duration-200 ${openIndex === index && 'rotate-180'}`}
                                    />
                                )}
                            </button>
                        ) : (
                            <Link
                                href={String(item.link)}
                                className={`flex items-center py-2 gap-2 text-white hover:text-white-200 ${!hovered ? 'justify-center mx-0' : 'mx-2'}`}
                            >
                                {item.icon}
                                {hovered && <p className="text-nowrap">{item.title}</p>}
                            </Link>
                        )}
                        {item.children && hovered && openIndex === index && (
                            <div
                                className={`overflow-hidden transition-all duration-200 text-sm ml-6 max-h-40 py-1`}
                            >
                                {item.children.map((sub, i) => (
                                    <Link
                                        key={i}
                                        href={String(sub.link)}
                                        className="block py-1 px-2 text-nowrap"
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center border-t-1 pt-2">
                {hovered && (
                    <div className="user rounded flex gap-3 items-center ">
                        <Image
                            className="rounded-full w-10 aspect-square  "
                            src={!!user && user.avatar ? `${user?.avatar}` : "/user.png"}
                            height={300}
                            width={300}
                            alt=""
                        />
                        <h4 className="text-nowrap p-0 m-0">{user?.name}</h4>
                    </div>
                )}
                <div
                    className="cursor-pointer rounded-full aspect-square"
                    onClick={logout}
                >
                    <LogOut />
                </div>
            </div>
        </aside>    
    );
}
