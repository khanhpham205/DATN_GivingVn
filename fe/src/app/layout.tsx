import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/Authcontext";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "GivingVn",
    description: "Charity App From VietNam",
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
                <AuthProvider>
                    
                {children}
                <ToastContainer
                    autoClose={3000}
                    position="top-right"
                    pauseOnHover
                />
                </AuthProvider>
            </body>
        </html>
    );
    // return (
    //     <html lang="en">
    //         <body
    //             className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //         >
    //             <AuthProvider>
    //                 <Header />

    //                 {children}
    //             </AuthProvider>
    //             <ToastContainer
    //                 autoClose={3000}
    //                 position="top-right"
    //                 pauseOnHover
    //             />
    //         </body>
    //     </html>
    // );
}
