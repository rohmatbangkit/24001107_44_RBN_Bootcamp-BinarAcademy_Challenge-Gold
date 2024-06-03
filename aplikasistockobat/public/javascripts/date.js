function getCurrentDate() {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[today.getDay()];
    const dd = String(today.getDate()).padStart(2, '0');
     // January is 0!
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    return day + ', ' + dd + '/' + mm + '/' + yyyy;
}

window.onload = function() {
    document.getElementById('current-date-info').textContent = getCurrentDate();
};

