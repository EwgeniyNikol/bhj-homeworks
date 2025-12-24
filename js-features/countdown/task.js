const timerElement = document.getElementById('timer');
let totalSeconds = parseInt(timerElement.textContent.trim()) || 0;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

timerElement.textContent = formatTime(totalSeconds);

let timerId = setInterval(() => {
    totalSeconds = totalSeconds - 1;
    timerElement.textContent = formatTime(totalSeconds);
    
    if (totalSeconds <= 0) {
        clearInterval(timerId);
        timerElement.textContent = '00:00:00';
        alert('Вы победили в конкурсе!');
        
        if (confirm('Хотите скачать файл с призом?')) {
            const link = document.createElement('a');
            link.href = 'https://raw.githubusercontent.com/EwgeniyNikol/bhj-homeworks/master/assets/img/volvo1871.png';
            link.download = 'volvo1871.png'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        setTimeout(() => {
            window.open('https://raw.githubusercontent.com/EwgeniyNikol/bhj-homeworks/master/assets/img/volvo1871.png', '_blank');
        }, 500); 
    }
}, 1000);