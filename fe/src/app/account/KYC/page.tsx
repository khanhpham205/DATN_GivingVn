/* eslint-disable @typescript-eslint/no-unused-vars */

// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import { Button } from "react-bootstrap";

// export default function KYC() {
//     // kiem tra du lieu nguoi dung dang o verify step may
//     // show component theo step 

//     const videoRef = useRef<HTMLVideoElement>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     const [camIsOpen, setCamIsOpen] = useState<boolean>(false);
//     const [IsRecording, setIsRecording] = useState<boolean>(false);

//     const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//     // const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    
//     const [warning, setWarning] = useState<string>("");

//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 // video: true,
//                 video: {
//                     width: { ideal: 500 },
//                     height: { ideal: 500 },
//                     facingMode: "user" // 👈 dùng camera trước (nếu có)
//                 },
//             });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;

//                 await videoRef.current.play();
//                 console.log("✅ camera dang chay");
//                 setCamIsOpen(true);
//             }
//         } catch (err) {
//             console.error("🚫 Không thể truy cập camera:", err);
//         }
//     };

//     const stopCamera = () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//           const stream = videoRef.current.srcObject as MediaStream;
//           const tracks = stream.getTracks();
//           tracks.forEach(track => track.stop());
//           videoRef.current.srcObject = null;
//           setCamIsOpen(false);
//           console.log("⛔ Camera đã tắt");
//         }
//     };

//     const startRecording = () => {
//         if(!camIsOpen){
//             console.warn('Vui lòng mở camera trước tiên!!')
//             return ;
//         }
//         setIsRecording(true)
//         if (!videoRef.current) return;
//         const stream = videoRef.current.srcObject as MediaStream;
//         if (!stream) return;
    
//         const recorder = new MediaRecorder(stream);
//         const chunks: Blob[] = [];
    
//         recorder.ondataavailable = (e) => {
//             if (e.data.size > 0) {
//                 chunks.push(e.data);
//             }
//         };
//         recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: "video/webm" });
//             const url = URL.createObjectURL(blob);

//             const a = document.createElement("a");
//             a.style.display = "none";
//             a.href = url;
//             a.download = "recorded_video.webm";
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//         };
    
//         recorder.start();
//         setMediaRecorder(recorder);
//         // setRecordedChunks([]);
//         console.log("▶️ Bắt đầu quay video");
//     };

//     const stopRecording = () => {
//         if(!camIsOpen){
//             console.warn('Vui lòng mở camera trước tiên!!')
//             return ;
//         }
//         if (mediaRecorder && mediaRecorder.state !== "inactive") {
//             setIsRecording(false)
//             mediaRecorder.stop();
//             console.log("⏹ Dừng quay video");
//         }
//     };

//     useEffect(() => {
//         const loadModels = async () => {
//             await Promise.all([
//                 faceapi.nets.tinyFaceDetector.loadFromUri(
//                     "/face_models/tiny_face_detector"
//                 ),
//                 faceapi.nets.faceLandmark68TinyNet.loadFromUri(
//                     "/face_models/face_landmark_68_tiny"
//                 ),
//                 faceapi.nets.faceRecognitionNet.loadFromUri(
//                     "/face_models/face_recognition"
//                 ),
//             ]);
//             console.log("✅ Mô hình đã được tải");
//         };
//         loadModels();
//     }, []);

//     useEffect(() => {
//         if (!camIsOpen) return;

//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         if (!video || !canvas) return;

//         const displaySize = { width: 500, height: 500 };
//         faceapi.matchDimensions(canvas, displaySize);

//         let lastCheck = 0;

//         const detectLoop = async (timestamp: number) => {
//             if (timestamp - lastCheck > 300) {
//                 lastCheck = timestamp;

//                 const detections = await faceapi.detectAllFaces(
//                     video,
//                     new faceapi.TinyFaceDetectorOptions({ inputSize: 160})
//                 ).withFaceLandmarks(true);

//                 const context = canvas.getContext("2d");
//                 context?.clearRect(0, 0, canvas.width, canvas.height);

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 if (context && resizedDetections.length > 0) {
//                     faceapi.draw.drawFaceLandmarks(
//                         canvas,
//                         resizedDetections
//                     );
//                 }

//                 setWarning("");
//                 if(detections.length == 0){
//                     setWarning("⚠️ Không phát hiện khuôn mặt");
//                 }
//                 if (detections.length > 1) {
//                     setWarning("⚠️ Phát hiện nhiều người - chỉ chấp nhận 1 khuôn mặt!");
//                 }
//             }
//             requestAnimationFrame(detectLoop);
//         };
//         requestAnimationFrame(detectLoop);
//     }, [camIsOpen]);

//     return (<>
//         <div className="KYC_vid" style={{ textAlign: "center", padding: "20px" }}>
//             <div className="KYC_vid_camerabox"
//                 style={{
//                     width:500,
//                     height:500
//                 }}
//             >
//                 <video
//                     ref={videoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     width="500"
//                     height="500"
                    
//                     style={{
//                         objectFit: "cover",
//                         borderRadius: "12px",
//                         transform: "scaleX(-1)",
//                     }}
//                 />
//                 <canvas
//                     ref={canvasRef}
//                     width="480"
//                     height="360"
//                     style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         transform: "scaleX(-1)",
//                     }}
//                 />
//             </div>
//             <div className="KYC_vid_info">
//                 <p>{warning}</p>
//             </div>
//             <Button onClick={(!camIsOpen)?startCamera:stopCamera}>{(!camIsOpen)?'start Camera':'stop Camera'}</Button>
//             <Button onClick={(!IsRecording)?startRecording:stopRecording}>{(!IsRecording)?"▶️ Record":"⏹️ Stop"}</Button>
//         </div>
//     </>);
// }

"use client"
import { useState, useEffect } from "react"
import  KYC_Step1   from "./components/step1.component";
import  KYC_Step2   from "./components/step2.component";
import  KYC_Step3   from "./components/step3.component";
import  KYC_Process from "./components/process.component";
import { Button }   from "react-bootstrap";




export default function KYCPage(){
    const [ step, setStep ] = useState<number>(3)
    useEffect(()=>{
        //call api get step & data
    },[])


    const renderKYCStep = ()=>{
        switch (step) {
            case 1:
                return <KYC_Step1/>
            case 2:
                return <KYC_Step2/>
            case 3:
                return <KYC_Step3/>
            default:
                return <KYC_Step1/>
        }
    }
    return <div className="KYC_main">

        <h2 className="mt-4" style={{textAlign:"center"}}>KYC PAGE</h2>

        <Button onClick={()=>{setStep(1)}}>Step1</Button>
        <Button onClick={()=>{setStep(2)}}>Step2</Button>
        <Button onClick={()=>{setStep(3)}}>Step3</Button>

        <KYC_Process/>
        {renderKYCStep()}


    </div>
}