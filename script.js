
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLevel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let totalMinutes = 0;
let totalSeconds = 0;
let totalMilliseconds = 0;
let interval;

let isTimerRunning = false;

startButton.addEventListener('click',startTimer);
startButton.addEventListener('click', function(){
    var audio = new Audio("audio.wav");
    audio.play();
});
stopButton.addEventListener('click',stopTimer);
stopButton.addEventListener('click', function(){
    var audio = new Audio("audio.wav");
    audio.play();
});
pauseButton.addEventListener('click',pauseTimer);
pauseButton.addEventListener('click', function(){
    var audio = new Audio("audio.wav");
    audio.play();
});
resetButton.addEventListener('click',resetTimer);
resetButton.addEventListener('click', function(){
    var audio = new Audio("audio.wav");
    audio.play();
});

function startTimer(){
    if (!isTimerRunning) { 
        
        interval = setInterval(updateTimer, 10);
        startButton.disabled = true;
        isTimerRunning = true;
        
    } else { 
        pauseTimer();
    }
}

function stopTimer(){
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false;
    isTimerRunning = false;
}

function pauseTimer(){
    clearInterval(interval);
    startButton.disabled = false;
    isTimerRunning = false;
}

function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;
    isTimerRunning = false;
    
}


function updateTimer(){
    milliseconds += 1;
    if(milliseconds === 100){
        milliseconds = 0;
        seconds += 1;
        if(seconds === 60){
            seconds = 0;
            minutes += 1;
        }
    }
    totalMilliseconds += 1;
    if(totalMilliseconds === 100){
        totalMilliseconds = 0;
        totalSeconds += 1;
        if(totalSeconds === 60){
            totalSeconds = 0;
            totalMinutes += 1;
        }
    }
    displayTimer()
}

function displayTimer(){
    millisecondsLevel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time){
    return time.toString().padStart(2, '0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;  
    displayTimer();

}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)} `;
    const totalTime = `${padTime(totalMinutes)}:${padTime(totalSeconds)}:${padTime(totalMilliseconds)} `;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>Lap Time: ${lapTime} || Total Time: ${totalTime}`;
    lapList.appendChild(listItem);
}
