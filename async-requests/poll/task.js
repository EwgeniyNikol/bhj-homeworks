const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
let pollId;

const showPopup = () => {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border: 2px solid green;
        border-radius: 5px;
        z-index: 1000;
    `;
    popup.textContent = 'Спасибо, ваш голос засчитан!';
    
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
};

const renderPoll = (title, answers) => {
    pollTitle.textContent = title;
    pollAnswers.innerHTML = '';
    
    answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'poll__answer';
        btn.textContent = answer;
        
        btn.addEventListener('click', () => {
            handleVote(index);
        });
        
        pollAnswers.appendChild(btn);
    });
};

const renderResults = (statistics) => {
    const total = statistics.reduce((sum, item) => sum + item.votes, 0);
    
    let resultsHTML = '';
    statistics.forEach(item => {
        const percent = total > 0 ? ((item.votes / total) * 100).toFixed(2) : 0;
        resultsHTML += `<div>${item.answer}: ${item.votes} голосов (${percent}%)</div>`;
    });
    
    resultsHTML += '<button onclick="location.reload()">Пройти опрос еще раз</button>';
    pollAnswers.innerHTML = resultsHTML;
};

const fetchPoll = () => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        };
        xhr.send();
    });
};

const sendVote = (pollId, answerIndex) => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        };
        xhr.send(`vote=${pollId}&answer=${answerIndex}`);
    });
};

const handleVote = async (answerIndex) => {
    showPopup();
    
    const results = await sendVote(pollId, answerIndex);
    renderResults(results.stat);
};

const initPoll = async () => {
    const pollData = await fetchPoll();
    pollId = pollData.id;
    renderPoll(pollData.data.title, pollData.data.answers);
};

document.addEventListener('DOMContentLoaded', initPoll);