document.addEventListener('DOMContentLoaded', function() {
    const userAgentSpan = document.getElementById('user-agent-info');
    if (userAgentSpan) {
        userAgentSpan.innerText = navigator.userAgent;
    } else {
        console.error('Element with ID "user-agent-info" not found.');
    }
});
