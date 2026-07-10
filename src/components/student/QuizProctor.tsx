"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Camera, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    faceapi: any;
  }
}

export function QuizProctor({ assessment, submitAction }: { assessment: any, submitAction: (id: string, answers: any) => Promise<any> }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(assessment.duration_mins * 60);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [testActive, setTestActive] = useState(false);
  
  const [warnings, setWarnings] = useState(0);

  // Load face-api models
  const loadModels = async () => {
    if (!window.faceapi) return;
    try {
      const MODEL_URL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";
      await window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    } catch (err) {
      console.error("Failed to load models", err);
      setError("Failed to load AI Proctoring models. Please check your internet connection.");
    }
  };

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraEnabled(true);
    } catch (err) {
      setError("Camera access denied. Camera is required for this proctored exam.");
    }
  };

  // Start Exam
  const startExam = () => {
    if (!modelsLoaded || !cameraEnabled) return;
    
    // Request fullscreen to lock them in
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    
    setTestActive(true);
  };

  // Re-attach video stream when test starts and new video element mounts
  useEffect(() => {
    if (testActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [testActive]);

  // Handle Tab Switching
  useEffect(() => {
    if (!testActive) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation("Tab switching detected");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [testActive, warnings]);

  // Face Detection Loop
  useEffect(() => {
    if (!testActive || !window.faceapi || !videoRef.current) return;

    let intervalId: NodeJS.Timeout;

    const detectFaces = async () => {
      if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
        const detections = await window.faceapi.detectAllFaces(
          videoRef.current,
          new window.faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
        );

        if (detections.length === 0) {
          // No face warning could be added here
        } else if (detections.length > 1) {
          handleViolation("Multiple faces detected in camera view");
        }
      }
    };

    videoRef.current.addEventListener('play', () => {
      intervalId = setInterval(detectFaces, 2000); // Check every 2 seconds
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [testActive]);

  // Timer
  useEffect(() => {
    if (!testActive || timeLeft <= 0) return;

    if (timeLeft === 1) {
      submitExam(); // Auto submit
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [testActive, timeLeft]);

  const handleViolation = (reason: string) => {
    if (warnings === 0) {
      setWarnings(1);
      alert(`WARNING: ${reason}. This is your first and final warning. Repeating this will terminate your exam.`);
    } else {
      alert(`EXAM TERMINATED: ${reason}.`);
      submitExam(true); // submit and mark terminated
    }
  };

  const submitExam = async (terminated = false) => {
    setTestActive(false);
    setSubmitting(true);
    
    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    await submitAction(assessment.id, { answers, terminated });
    router.push("/dashboard");
    router.refresh();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!testActive) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Script src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js" onLoad={loadModels} />
        
        <div className="bg-white dark:bg-gray-950 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Proctored Exam: {assessment.title}</h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            This is a highly secure exam environment. Your webcam will be monitored using AI face detection. Tab switching is strictly prohibited.
          </p>

          {error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-8 flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`w-64 h-48 bg-gray-900 rounded-xl object-cover border-2 ${cameraEnabled ? 'border-green-500' : 'border-gray-300'}`}
                />
                
                {!cameraEnabled ? (
                  <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700">
                    Enable Camera Verification
                  </Button>
                ) : (
                  <div className="flex items-center text-green-600 font-medium space-x-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Camera verified successfully</span>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                <Button 
                  onClick={startExam} 
                  disabled={!modelsLoaded || !cameraEnabled}
                  className="w-full max-w-sm h-12 text-lg font-bold bg-[#7B68EE] hover:bg-[#6A5AE0] text-white rounded-xl shadow-lg"
                >
                  {modelsLoaded ? "Start Assessment" : "Loading AI Models..."}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const questions = assessment.questions || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between z-50">
        <h2 className="font-bold text-lg">{assessment.title}</h2>
        
        <div className="flex items-center space-x-6">
          <div className={`flex items-center space-x-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-200'}`}>
            <Clock className="w-5 h-5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-24 h-16 bg-gray-900 rounded border border-gray-300 object-cover"
          />

          <Button 
            onClick={() => submitExam()} 
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            {submitting ? "Submitting..." : "Submit Exam"}
          </Button>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto pt-24 pb-24 space-y-8">
        {questions.map((q: any, qIdx: number) => (
          <div key={qIdx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <span className="text-[#7B68EE] mr-2">{qIdx + 1}.</span> 
              {q.question}
            </h3>
            
            <div className="space-y-3 pl-6">
              {q.options.map((opt: string, optIdx: number) => (
                <label key={optIdx} className="flex items-center space-x-3 cursor-pointer group p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    answers[qIdx] === optIdx ? 'border-[#7B68EE] bg-[#7B68EE]' : 'border-gray-300 dark:border-gray-600 group-hover:border-[#7B68EE]'
                  }`}>
                    {answers[qIdx] === optIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name={`q-${qIdx}`} 
                    className="hidden" 
                    onChange={() => setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium select-none">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
