/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import './style/Banner.css'
const Banner: React.FC = () => {

    const [currentBanner, setCurrentBanner] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const timerRef = useRef(0);  

    const cursorRef = useRef<HTMLDivElement>(null);

    const banners: string[] = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
    ];


    const changeBanner = (index?: number, step: number = 1) => {
        if (isAnimating) return;
        setIsAnimating(true);
        const cursor = document.getElementById('bannercursor')
        cursor!.children[0].children[0].classList.remove("active");
        setTimeout(() => {
            cursor!.children[0].children[0].classList.add("active")
            setCurrentBanner((prev) => {
                if (index !== undefined) {
                    return index
                }else{
                    return (prev + step + banners.length) % banners.length;
                }
            });
            timerRef.current = 0;
        }, 10);
        //rebound 1s (sau it nhat 1s moi co the changebanner tiep tuc)
        setTimeout(() => {setIsAnimating(false)}, 1000);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - cursor.offsetWidth / 2;
        const y = e.clientY - rect.top - cursor.offsetHeight / 2;

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.opacity = "1";
        cursor.style.display = "block";
        // if(cursor.id=='bannercursor'){
        //     cursor.addEventListener('click',()=>{
        //         changeBanner(undefined,Number(cursor.ariaValueText))
        //     })
        // }
        cursor.ariaValueText = x < rect.width / 2 ? "-1" : "1";
        cursor.children[1].textContent = x < rect.width / 2 ? "<" : ">";
    };

    const handleMouseLeave = () => {
        const cursor = cursorRef.current;
        if (cursor) {
            cursor.style.opacity = "0";
        }
    };
    
    const bannercursorclick = () => {
        const t = document.getElementById('bannercursor')?.ariaValueText
        changeBanner(undefined,Number(t))
    };

    useEffect(() => {
        const interval = setInterval(() => {
            timerRef.current += 1;
            if (timerRef.current >= 20) {
                changeBanner();
                timerRef.current = 0; // Reset bộ đếm
            }
        }, 200);

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
    }, []);

    return (
        <section id="banner" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            style={{
                position:'relative',
            }}
        >
            <img
                id="banner_img"
                src={`${banners[currentBanner]}`}
                alt="Banner"
                style={{
                    zIndex:-1,
                    width:'100%',
                    height:'100%',
                    objectFit:'cover',
                }}
            />
            <div id="handlebannerimg" >
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={currentBanner === index ? "active" : ""}
                        onClick={() => changeBanner(index)}
                    >
                        <svg>
                            <circle
                                r="15"
                                cx="50%"
                                cy="50%"
                                className={currentBanner === index ? "active" : ""}
                            ></circle>
                        </svg>
                        <span className="bannerspan">{index + 1}</span>
                    </button>
                ))}
            </div>
            <div id="bannercursor" 
                className="hide"   
                ref={cursorRef}
                onClick={()=>{bannercursorclick()}}
            >
                <svg width="50" height="50">
                    <circle className="active" r="25" cx="50%" cy="50%"></circle>
                </svg>
                <span className="bannerspan">&gt;</span>
            </div>
        </section>
    );
};

export default Banner;
