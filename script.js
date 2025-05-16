// MODEL
let timer;
let timeLeft = 1500; // 25 minutes
let isRunning = false;
let completedPomodoros = parseInt(localStorage.getItem('pomodoros')) || 0;
let todoTasks = JSON.parse(localStorage.getItem('todoList')) || [];

const petImage = document.getElementById("pet-image");

// VIEW
function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time").textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateCompletedCount() {
  document.getElementById("completed-count").textContent = completedPomodoros;
  localStorage.setItem("pomodoros", completedPomodoros);
}

function updatePetImage() {
  const minutesPassed = 25 - Math.floor(timeLeft / 60);
  if (minutesPassed >= 2) {
    petImage.src = "pet3.gif";
  } else if (minutesPassed >= 1) {
    petImage.src = "pet2.gif";
  } else {
    petImage.src = "pet1.gif";
  }
}

function updateTodoListView() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  let completed = 0;

  todoTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
      completed++;
    }

    li.addEventListener("click", () => {
      todoTasks[index].completed = !todoTasks[index].completed;
      saveTodoList();
      updateTodoListView();
    });

    list.appendChild(li);
  });

  document.getElementById("task-stats").textContent =
    `${completed}/${todoTasks.length} tasks completed`;
}

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
}

// CONTROLLER
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    launchConfetti(); // 🎉 Confetti at start
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimeDisplay();
        updatePetImage();
      } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("finish-sound").play();
        completedPomodoros++;
        updateCompletedCount();
        timeLeft = 1500;
        updateTimeDisplay();
        petImage.src = "pet1.gif";
        launchConfetti(); // 🎉 Confetti at end
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 1500;
  updateTimeDisplay();
  petImage.src = "pet1.gif";
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoTasks));
}

function showRandomMotivation() {
  const quotes = [
    "You're doing amazing! 🌟",
    "Keep going, one step at a time 🐾",
    "Progress is progress no matter how small!",
    "You’ve got this! 💪",
    "Your focus determines your reality ✨"
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("motivation-text").textContent = quote;
}

// EVENT LISTENERS
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  if (input.value.trim() !== "") {
    todoTasks.push({ text: input.value.trim(), completed: false });
    input.value = "";
    saveTodoList();
    updateTodoListView();
  }
});

// INIT
updateTimeDisplay();
updateCompletedCount();
updateTodoListView();
showRandomMotivation();

// MODEL: Load mood from storage
let selectedMood = localStorage.getItem("mood") || null;

// VIEW
function updateMoodView() {
  const moodText = {
    happy: "😊 Happy",
    neutral: "😐 Neutral",
    sad: "😔 Sad",
    null: "Not selected"
  };
  document.getElementById("current-mood").textContent = moodText[selectedMood] || "Not selected";
}

// CONTROLLER
function selectMood(mood) {
  selectedMood = mood;
  localStorage.setItem("mood", mood);
  updateMoodView();
}

// INIT call
updateMoodView();

