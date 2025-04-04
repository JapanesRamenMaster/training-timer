import React, { useState, useEffect } from "react";
import "./App.css"; // 기본 스타일 (삭제 안 해도 OK)

const steps = [
  { title: "디테일러웹 (전)", duration: 3, description: "사전 준비 및 장비 점검", image: "" },
  { title: "물 +알칼리 도포", duration: 1, description: "차량 외부에 알칼리 도포", image: "" },
  { title: "휠세척", duration: 5, description: "휠의 먼지 및 오염물 제거", image: "" },
  { title: "1차 닦아내기", duration: 7, description: "전체 외부 표면의 첫 세척", image: "" },
  { title: "물 + 에보", duration: 1, description: "2차 세제를 이용한 분사", image: "" },
  { title: "2차 닦아내기", duration: 15, description: "세제 잔여물 및 오염물 마무리 세척", image: "" },
  { title: "내부 짐빼기", duration: 5, description: "차량 내부의 개인 짐 제거", image: "" },
  { title: "내부 타월", duration: 15, description: "타월로 실내 표면 닦기", image: "" },
  { title: "내부 청소기", duration: 15, description: "청소기를 이용한 실내 청소", image: "" },
  { title: "마지막 점검", duration: 3, description: "전체 마무리 및 점검", image: "" },
  { title: "디테일러웹 (후)", duration: 5, description: "작업 완료 후 기록", image: "" },
  { title: "짐 넣기", duration: 5, description: "내부 짐 다시 적재", image: "" }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0].duration * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (running && timeLeft === 0) {
      setRunning(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, running]);

  const startTimer = () => setRunning(true);
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setTimeLeft(steps[next].duration * 60);
      setRunning(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ backgroundColor: '#111827', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>세차 교육 슬라이드</h1>
      <div style={{ backgroundColor: '#1f2937', borderRadius: 20, padding: 40, width: '100%', maxWidth: 600, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>{steps[currentStep].title}</h2>
        <p style={{ color: '#9ca3af', marginBottom: 20 }}>{steps[currentStep].description}</p>
        <div style={{ fontSize: 60, marginBottom: 20 }}>{formatTime(timeLeft)}</div>
        <div>
          {!running && <button onClick={startTimer} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: 10, marginRight: 10 }}>타이머 시작</button>}
          <button onClick={nextStep} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: 10 }}>다음 공정</button>
        </div>
      </div>
      <p style={{ marginTop: 20, color: '#9ca3af' }}>{currentStep + 1} / {steps.length} 단계</p>
    </div>
  );
}

export default App;
