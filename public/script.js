let timer = null;
let timeLeft = 25 * 60;
let isRunning = false;
let completedPomodoros = 0;

// --- VIEW (Timer UI elements) ---
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const completedCount = document.getElementById('completed-count');
const finishSound = document.getElementById('finish-sound');
const petImage = document.getElementById('pet-image');

// --- VIEW FUNCTION ---
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// --- CONTROLLER: Timer Persistence ---
function saveTimerState() {
  localStorage.setItem('timerState', JSON.stringify({
    timeLeft,
    isRunning,
    completedPomodoros,
    lastUpdated: Date.now()
  }));
  console.log('Saved timer state:', { timeLeft, isRunning, completedPomodoros }); // Debug log
}

function loadTimerState() {
  const saved = localStorage.getItem('timerState');
  if (saved) {
    const { timeLeft: savedTime, isRunning: savedRunning, completedPomodoros: savedPomodoros, lastUpdated } = JSON.parse(saved);
    console.log('Loaded timer state:', { savedTime, savedRunning, savedPomodoros, lastUpdated }); // Debug log
    
    completedPomodoros = savedPomodoros;
    completedCount.textContent = completedPomodoros;
    
    // Calculate elapsed time since last update
    if (savedRunning && lastUpdated) {
      const elapsed = Math.floor((Date.now() - lastUpdated) / 1000);
      timeLeft = Math.max(savedTime - elapsed, 0);
      
      // Handle Pomodoro completions during absence
      if (timeLeft <= 0) {
        const completedDuringAbsence = Math.floor(Math.abs(timeLeft) / (25 * 60)) + 1;
        completedPomodoros += completedDuringAbsence;
        completedCount.textContent = completedPomodoros;
        finishSound.play();
        showConfetti();
        evolvePet();
        timeLeft = 25 * 60; // Reset to 25:00
      }
      
      updateTimerDisplay();
      evolvePet();
      
      // Actually restart the timer if it was running
      if (timeLeft > 0) {
        console.log('Resuming timer with timeLeft:', timeLeft); // Debug log
        isRunning = true;
        startTimer(); // This will properly restart the interval
      } else {
        isRunning = false;
        saveTimerState();
      }
    } else {
      // Timer wasn't running, just restore the state
      timeLeft = savedTime;
      isRunning = false;
      updateTimerDisplay();
      evolvePet();
    }
  }
}

// --- CONTROLLER FUNCTIONS ---
function startTimer() {
  if (timer !== null) {
    console.log('Timer already running, clearing existing interval'); // Debug log
    clearInterval(timer); // Always clear existing interval before starting a new one
  }
  
  console.log('Starting timer with timeLeft:', timeLeft); // Debug log
  timer = setInterval(() => {
    try {
      timeLeft--;
      console.log('Timer tick:', timeLeft); // Debug log
      updateTimerDisplay();
      saveTimerState();
      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        completedPomodoros++;
        completedCount.textContent = completedPomodoros;
        finishSound.play();
        showConfetti();
        evolvePet();
        timeLeft = 25 * 60;
        updateTimerDisplay();
        saveTimerState();
      }
    } catch (error) {
      console.error('Error in timer interval:', error); // Error log
      clearInterval(timer);
      timer = null;
      isRunning = false;
    }
  }, 1000);
  isRunning = true;
  saveTimerState();
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  saveTimerState();
  console.log('Timer paused'); // Debug log
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  timeLeft = 25 * 60;
  updateTimerDisplay();
  saveTimerState();
  console.log('Timer reset'); // Debug log
}

// --- VIEW EFFECTS ---
function showConfetti() {
  const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
  if (settings.notifications) {
    new Notification('Pomodoro Complete!', { body: '🎉 Great job!' });
  }
  alert('🎉 Great job! Pomodoro complete!');
}

// --- CONTROLLER: Virtual Pet Progress ---
function evolvePet() {
  if (completedPomodoros >= 3 && completedPomodoros < 6) {
    petImage.src = 'pet2.gif';
  } else if (completedPomodoros >= 6) {
    petImage.src = 'pet3.gif';
  } else {
    petImage.src = 'pet1.gif';
  }
}

// --- CONTROLLER EVENT BINDINGS ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// ========== TO-DO LIST FEATURE ==========

// --- MODEL (To-do list state) ---
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskStats = document.getElementById('task-stats');
let totalTasks = 0;
let completedTasks = 0;

// --- VIEW FUNCTION (update task stats) ---
function updateTaskStats() {
  taskStats.textContent = `${completedTasks}/${totalTasks} tasks completed`;
}

// --- CONTROLLER (adding tasks and completion logic) ---
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    completedTasks = Array.from(todoList.children)
      .filter(item => item.classList.contains('completed')).length;
    updateTaskStats();
  });

  todoList.appendChild(li);
  todoInput.value = '';
  totalTasks++;
  updateTaskStats();
});

// ========== THEME & DARK MODE ==========

// --- MODEL ---
let userSettings = {
  darkMode: false,
  themeColor: '#ff69b4',
  notifications: false
};

// --- VIEW: Apply Settings ---
function applyUserSettings() {
  document.body.classList.toggle('dark-mode', userSettings.darkMode);
  document.documentElement.style.setProperty('--theme-color', userSettings.themeColor);
  document.body.setAttribute('data-theme', userSettings.themeColor);
}

// --- CONTROLLER: Save & Load Settings ---
function saveSettings() {
  localStorage.setItem('userSettings', JSON.stringify(userSettings));
  fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userSettings)
  }).catch(err => console.error('Settings sync failed:', err));
}

function loadSettings() {
  const saved = localStorage.getItem('userSettings');
  if (saved) userSettings = JSON.parse(saved);
  applyUserSettings();
}

// Add page visibility event listener to handle page switching
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    console.log('Page is now visible, checking timer state');
    // If timer should be running but interval is null, restart it
    if (isRunning && timer === null) {
      console.log('Timer was running but interval was lost, restarting');
      startTimer();
    }
  }
});

// --- INIT ---
loadSettings();
loadTimerState();