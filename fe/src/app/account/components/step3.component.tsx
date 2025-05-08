/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
import { Button } from "react-bootstrap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ToggleButton from '@mui/material/ToggleButton';
import { useRouter } from "next/navigation";

import {
    nets,
    TinyFaceDetectorOptions,
    detectAllFaces,
    resizeResults,
    matchDimensions,
    draw
} from 'face-api.js';
import { toast } from "react-toastify";

const faceapi = {
    nets,
    TinyFaceDetectorOptions,
    detectAllFaces,
    resizeResults,
    matchDimensions,
    draw
};

export default function KYC_Step3(prop: KYC_Step_Props) {
    const router = useRouter()
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [camIsOpen, setCamIsOpen] = useState<boolean>(false);
    const [IsRecording, setIsRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [support, setsupport] = useState<boolean>(true);
    const [warning, setWarning] = useState<string>("");
    const [lastFaceDetected, setLastFaceDetected] = useState<number>(0);
    const [maxRecordingTime] = useState<number>(10000); // 10 seconds for video recording
    const [recordStartTime, setRecordStartTime] = useState<number>(0);
    
    // const [recordErr, setRecordErr] = useState<string>('');
    const recordErr = useRef<string>('');
    const userstop = useRef<boolean>(false);
    // const [userstop, setuserstop] = useState<boolean>(false);

    // const [direction, setDirection] = useState<string>('');

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 500 }, height: { ideal: 500 }, facingMode: "user" },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setCamIsOpen(true);
                setCameraStream(stream);
            }
        } catch (err) {
            console.error("🚫 Không thể truy cập camera:", err);
        }
    };
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setCamIsOpen(false);
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            context?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    const startRecording = () => {
        if (!camIsOpen) {return;}
        // setuserstop(false)
        userstop.current=false
        setWarning('')
        // setRecordErr('');
        recordErr.current = ''
        setIsRecording(true);

        if (!videoRef.current) return;
        const stream = videoRef.current.srcObject as MediaStream;
        if (!stream) return;

        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        recorder.onstop = async () => {
            if (!!recordErr.current) return;
            if (userstop.current)  return;

            const jwt = localStorage.getItem('JWT')
            const blob = new Blob(chunks, { type: "video/webm" });
            const form = new FormData()
            
            form.append('video',blob,'recorded_video.webm')

            const fe = await fetch(`http://localhost:9000/user/userkyc3`,{
                method:'POST',
                headers:{
                    'authorization': `Bearer ${jwt}`,
                },
                body:form
            })

            if(await fe.status == 200){
                stopRecording()
                prop.check()
                router.push('/account')
                return;
            }else if(await fe.status==405){
                recordErr.current = 'Phát hiện deepface'
                return;
            }else if(await fe.status==402){
                recordErr.current = 'Phát hiện deepface'
                return;
            }else if(!recordErr.current && !userstop.current){
                setWarning('xác thực thất bại')
                startRecording()                
            }
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecordStartTime(Date.now());
    };

    const stopRecording = () => {
        if (!camIsOpen) {
            console.warn("Vui lòng mở camera trước tiên!!");
            return;
        }
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            setIsRecording(false);
            mediaRecorder.stop();
            setMediaRecorder(null)
        }
    };

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/face_models/tiny_face_detector"),
                faceapi.nets.faceLandmark68TinyNet.loadFromUri("/face_models/face_landmark_68_tiny"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/face_models/face_recognition"),
            ]);
        };
        loadModels();

        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [cameraStream]);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !camIsOpen) return;

        let animationId: number;
        let lastCheck = 0;
        const displaySize = { width: 500, height: 500 };
        faceapi.matchDimensions(canvas, displaySize);

        const detectLoop = async (timestamp: number) => {
            if (timestamp - lastCheck > 500) {
                lastCheck = timestamp;
                const detections = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 160 }))
                    .withFaceLandmarks(true);

                const context = canvas.getContext("2d");
                context?.clearRect(0, 0, canvas.width, canvas.height);

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                if (context && resizedDetections.length > 0 && support) {
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                }
                setWarning('')
                if (detections.length === 1) {
                    setLastFaceDetected(Date.now());
                    // const landmarks = detections[0].landmarks;
                    // const nose = landmarks.getNose()[3];
                    // const leftEye = landmarks.getLeftEye();
                    // const rightEye = landmarks.getRightEye();
                    // const distToLeft = Math.hypot(nose.x - leftEye[0].x, nose.y - leftEye[0].y);
                    // const distToRight = Math.hypot(nose.x - rightEye[3].x, nose.y - rightEye[3].y);

                    // if (distToLeft > distToRight + 7) {
                    //     setDirection("👈 Quay sang trái");
                    // } else if (distToRight > distToLeft + 7) {
                    //     setDirection("👉 Quay sang phải");
                    // } else {
                    //     setDirection("👁️ Nhìn thẳng");
                    // }
                } else if (detections.length > 1) {
                    setWarning('')
                    setWarning("⚠️ Phát hiện nhiều người - chỉ chấp nhận 1 khuôn mặt!");
                } else {
                    setWarning("⚠️ Không phát hiện khuôn mặt");
                }
            }

            if (IsRecording && Date.now() - lastFaceDetected > 2000) {
                stopRecording();
                recordErr.current='Dừng quay video'
                // setRecordErr(" Dừng quay video");
            }

            // Check if the video has been recording for more than the max recording time
            if (IsRecording && Date.now() - recordStartTime > maxRecordingTime) {
                stopRecording();
            }

            animationId = requestAnimationFrame(detectLoop);
        };
        animationId = requestAnimationFrame(detectLoop);

        return () => cancelAnimationFrame(animationId);
    }, [camIsOpen, support, IsRecording, lastFaceDetected, recordStartTime, maxRecordingTime]);

    return (
        <div className="KYC_tab KYC_vid fullcol" style={{ textAlign: "center", padding: "20px" }}>
            <h2>Xác thực khuôn mặt</h2>
            <div className="KYC_vid_camerabox" style={{ width: 500, height: 500 }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    width="500"
                    height="500"
                    style={{ objectFit: "cover", borderRadius: "12px", transform: "scaleX(-1)" }}
                />
                <canvas
                    ref={canvasRef}
                    width="480"
                    height="360"
                    style={{ position: "absolute", top: 0, left: 0, transform: "scaleX(-1)" }}
                />
                <ToggleButton
                    id='supportBt'
                    value="check"
                    selected={!support}
                    onChange={() => setsupport((a) => !a)}
                    sx={{
                        color: support ? 'white' : 'primary.main',
                        backgroundColor: support ? 'primary.main' : 'transparent',
                        '&:hover': { backgroundColor: support ? 'primary.dark' : 'action.hover' },
                    }}
                >
                    <VisibilityIcon />
                </ToggleButton>
            </div>
            
            <div className="KYC_vid_info">
                <p style={{margin:'5px 0 15px 0 ', height:15}}> {warning}</p>
                <h4 style={{width:'100%', background:'red',color:'white', borderRadius:10}}>{recordErr.current}</h4>
            </div>
            <div className="">
                <Button onClick={() => { prop.move(1); }} variant="secondary">Trở về</Button>
                
                {(!camIsOpen) && <Button onClick={startCamera}>Start Camera</Button>}
                
                <Button onClick={!IsRecording ? startRecording : ()=>{userstop.current=(true);recordErr.current="Dừng quay video" ;stopRecording()}}>
                    {!IsRecording ? "▶️ Record" : "⏹️ Stop"}
                </Button>
            </div>
        </div>
    );
}
