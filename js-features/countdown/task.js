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
        const downloadLink = document.createElement('a');
        downloadLink.href = 'https://raw.githubusercontent.com/EwgeniyNikol/bhj-homeworks/master/assets/img/volvo1871.png';
        downloadLink.download = 'volvo1871.png';
        downloadLink.target = '_blank'; 
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        setTimeout(() => {
                document.body.removeChild(downloadLink);
            }, 1000);
            
            window.location.href = 'https://raw.githubusercontent.com/EwgeniyNikol/bhj-homeworks/master/assets/img/volvo1871.png?force=download';
        }
        
        setTimeout(() => {
            window.open('https://raw.githubusercontent.com/EwgeniyNikol/bhj-homeworks/master/assets/img/volvo1871.png', '_blank');
        }, 500);
    }
}, 1000);