import { useState, useEffect } from "react";

function Pomo() {
    const [workTime, setWorkTime] = useState(25); // Default 25 minutes
    const [breakTime, setBreakTime] = useState(5); // Default 5 minutes
    const [timeLeft, setTimeLeft] = useState(workTime * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkTime, setIsWorkTime] = useState(true);
    const [isBreakTime, setIsBreakTime] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Switch between work and break time
            if (isWorkTime) {
                setIsWorkTime(false);
                setIsBreakTime(true);
                setTimeLeft(breakTime * 60);
            } else {
                setIsWorkTime(true);
                setIsBreakTime(false);
                setTimeLeft(workTime * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isWorkTime, isBreakTime, workTime, breakTime]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsWorkTime(true);
        setIsBreakTime(false);
        setTimeLeft(workTime * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleWorkTimeChange = (e) => {
        const value = e.target.value;
        // Allow empty string for typing
        if (value === '') {
            setWorkTime('');
            return;
        }
        const numValue = Math.max(1, Math.min(500, Number(value)));
        setWorkTime(numValue);
        if (!isRunning && isWorkTime) {
            setTimeLeft(numValue * 60);
        }
    };

    const handleBreakTimeChange = (e) => {
        const value = e.target.value;
        // Allow empty string for typing
        if (value === '') {
            setBreakTime('');
            return;
        }
        const numValue = Math.max(1, Math.min(60, Number(value)));
        setBreakTime(numValue);
        if (!isRunning && !isWorkTime) {
            setTimeLeft(numValue * 60);
        }
    };

    return (
        <div className="pomodoro-container">
            <h2 className={isWorkTime ? "work-mode" : "break-mode"}>
                {isWorkTime ? "Work Time" : "Break Time"}
            </h2>
            <div className="timer-display">{formatTime(timeLeft)}</div>
            
            <div className="timer-controls">
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

            <div className="timer-settings">
                <div className="setting">
                    <label>Work Time (minutes):</label>
                    <input
                        type="number"
                        value={workTime}
                        onChange={handleWorkTimeChange}
                        min="1"
                        max="500"
                        disabled={isRunning}
                    />
                </div>
                <div className="setting">
                    <label>Break Time (minutes):</label>
                    <input
                        type="number"
                        value={breakTime}
                        onChange={handleBreakTimeChange}
                        min="1"
                        max="60"
                        disabled={isRunning}
                    />
                </div>
            </div>
        </div>
    );
}

export default Pomo;