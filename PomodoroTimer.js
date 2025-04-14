class PomodoroTimer {
  constructor(sessionLength, breakLength) {
    this.sessionLength = sessionLength;
    this.breakLength = breakLength;
    this.currentTime = 0;
    this.isPaused = false;
  }

  startTimer() {
    //logic to start timer
  }b                                                                                                                                                                                                                                                                                                                                                          

  pauseTimer() {  
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
  }

  resetTimer() {
    this.currentTime = 0;
  }
}

module.exports = PomodoroTimer;
