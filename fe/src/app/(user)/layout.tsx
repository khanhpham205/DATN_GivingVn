import Header from "@/components/header";

export default function UserLayout({children}: {children: React.ReactNode;}) {
    return (<>
        <Header />

        {children}
    </>);
}
