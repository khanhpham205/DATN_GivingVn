/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "react-bootstrap";

export default function Home() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [camIsOpen, setCamIsOpen] = useState<boolean>(false);

    const [warning, setWarning] = useState<string>("");
    const [facecount, setFaceCount] = useState<number>(0);
    const [facequality, setFacequality] = useState<number>(0);
    
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);


    const startRecording = () => {
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
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            
            // 👉 tự động tạo 1 link download
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "recorded_video.webm";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        };
    
        recorder.start();
        setMediaRecorder(recorder);
        setRecordedChunks([]);
        console.log("▶️ Bắt đầu quay video");
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            console.log("⏹ Dừng quay video");
        }
    };

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(
                    "/face_models/tiny_face_detector"
                ),
                faceapi.nets.faceLandmark68TinyNet.loadFromUri(
                    "/face_models/face_landmark_68_tiny"
                ),
                faceapi.nets.faceRecognitionNet.loadFromUri(
                    "/face_models/face_recognition"
                ),
            ]);
            console.log("✅ Mô hình đã được tải");
        };
        loadModels();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                // video: true,
                video: {
                    width: { ideal: 500 },
                    height: { ideal: 500 },
                    facingMode: "user" // 👈 dùng camera trước (nếu có)
                },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                await videoRef.current.play();
                console.log("✅ camera dang chay");
                setCamIsOpen(true);
            }
        } catch (err) {
            console.error("🚫 Không thể truy cập camera:", err);
        }
    };

    useEffect(() => {
        if (!camIsOpen) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const displaySize = { width: 500, height: 500 };
        faceapi.matchDimensions(canvas, displaySize);

        let lastCheck = 0;

        const detectLoop = async (timestamp: number) => {
            const elapsed = timestamp - lastCheck;
            if (elapsed > 300) {
                lastCheck = timestamp;

                const detections = await faceapi
                    .detectAllFaces(
                        video,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks(true);

                setFaceCount(detections.length);
                setFacequality(detections[0]?.detection.score || 0);

                const context = canvas.getContext("2d");
                context?.clearRect(0, 0, canvas.width, canvas.height);

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );

                if (context) {
                    if (resizedDetections.length > 0) {
                        faceapi.draw.drawDetections(canvas, resizedDetections);
                        faceapi.draw.drawFaceLandmarks(
                            canvas,
                            resizedDetections
                        );
                    }
                }

                // Kiểm tra nghiêng mặt
                if (detections.length === 1) {
                    const landmarks = detections[0].landmarks;
                    const leftEye = landmarks.getLeftEye();
                    const rightEye = landmarks.getRightEye();
                    const eyeSlope = Math.abs(leftEye[0].y - rightEye[3].y);

                    if (eyeSlope > 20) {
                        setWarning(
                            "⚠️ Vui lòng giữ đầu thẳng và nhìn vào camera"
                        );
                    } else {
                        setWarning("");
                    }
                } else if (detections.length > 1) {
                    setWarning(
                        "⚠️ Phát hiện nhiều người - chỉ chấp nhận 1 khuôn mặt!"
                    );
                } else {
                    setWarning("⚠️ Không phát hiện khuôn mặt");
                }
            }

            requestAnimationFrame(detectLoop);
        };

        requestAnimationFrame(detectLoop);
    }, [camIsOpen]);

    return (<>
        <main style={{ textAlign: "center", padding: "20px" }}>
            <div
                style={{
                    position: "relative",
                    display: "inline-block",
                    width: "500px",
                    height: "500px",
                    margin: "0 auto",
                    backgroundColor: "#272727",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    width="500"
                    height="500"
                    
                    style={{
                        objectFit: "cover",
                        borderRadius: "12px",
                        transform: "scaleX(-1)",
                    }}
                />
                <canvas
                    ref={canvasRef}
                    width="480"
                    height="360"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: "scaleX(-1)",
                    }}
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <p>facecount: {facecount}</p>
                <p>facequality: {facequality}</p>
                <p>{warning}</p>
            </div>
            <Button onClick={startCamera}>startCamera</Button>
            <Button onClick={startRecording}>Start Recording</Button>
            <Button onClick={stopRecording}>Stop Recording</Button>
        </main>
    </>);
}
