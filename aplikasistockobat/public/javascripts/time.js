function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // 0 hour is converted to 12
    hours = hours % 12;
    hours = hours ? hours : 12; 
    // Add leading zero if hours, minutes, or seconds are less than 10
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // Get the GMT offset in hours
    const gmtOffset = -now.getTimezoneOffset() / 60;
    const currentTime = hours + ":" + minutes + ":" + seconds + " " + ampm + " GMT" + (gmtOffset >= 0 ? "+" : "") + gmtOffset;
    document.getElementById("current-time-info").textContent = currentTime;
}

// Call updateTime function every second
setInterval(updateTime, 1000);

// Call updateTime to display time when the page loads
updateTime();
