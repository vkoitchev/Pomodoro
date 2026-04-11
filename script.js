document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const durationSelect = document.getElementById('work-minutes');

  let intervalId = null;
  let isBreak = false; // flag to know if we are in a break period
  let totalSeconds = 0;
  let expectedEndTime = 0;
  let isPaused = false;
  let isRunning = false;

  const updateDisplay = () => {
    const displaySeconds = Math.max(0, totalSeconds);
    const mins = Math.floor(displaySeconds / 60);
    const secs = displaySeconds % 60;
    
    const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;
    const modeString = isBreak ? 'Break' : 'Work';
    
    if (isPaused) {
      display.textContent = `Paused: ${timeString}`;
      document.title = `Paused - Pomodoro`;
    } else {
      display.textContent = `${modeString}: ${timeString}`;
      document.title = `(${timeString}) ${modeString} - Pomodoro`;
    }
  };

  const startTimerTick = () => {
    if (intervalId) clearInterval(intervalId);
    isRunning = true;
    isPaused = false;
    
    intervalId = setInterval(() => {
      totalSeconds = Math.round((expectedEndTime - Date.now()) / 1000);
      
      if (totalSeconds <= 0) {
        totalSeconds = 0;
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;

        if (isBreak) {
          display.textContent = 'Time up!';
          document.title = 'Time up! - Pomodoro';
          startBtn.textContent = 'Start';
          isBreak = false;
        } else {
          // Work period finished, start break automatically
          isBreak = true;
          totalSeconds = 5 * 60; // 5-minute break
          expectedEndTime = Date.now() + totalSeconds * 1000;
          updateDisplay(); // Show break before ticking
          startTimerTick();
        }
      } else {
        updateDisplay();
      }
    }, 100);
  };

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      // Pause the timer
      clearInterval(intervalId);
      intervalId = null;
      isRunning = false;
      isPaused = true;
      startBtn.textContent = 'Resume';
      updateDisplay();
      return;
    }
    
    if (isPaused) {
      // Resume from pause
      expectedEndTime = Date.now() + totalSeconds * 1000;
    } else {
      // Fresh start
      const minutes = parseInt(durationSelect.value, 10);
      totalSeconds = minutes * 60;
      isBreak = false;
      expectedEndTime = Date.now() + totalSeconds * 1000;
    }
    
    startBtn.textContent = 'Pause';
    updateDisplay();
    startTimerTick();
  });

  stopBtn.addEventListener('click', () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    isPaused = false;
    totalSeconds = 0;
    startBtn.textContent = 'Start';
    display.textContent = 'Timer stopped';
    document.title = 'Pomodoro Timer';
  });
});