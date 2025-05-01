/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "react-bootstrap";

export default function KYC_Step2() {
    // KYC_Step1
    
    return (<>
        <div className="KYC_f_img" style={{ textAlign: "center", padding: "20px" }}>
            <h2></h2>
            <div className="f_img">
                <img src="" alt="" />
                <input id='f_img_input' type="file" accept="images/*" hidden />
                <label htmlFor="f_img_input">Front Image</label>
            </div>
        </div>
    </>);
}
