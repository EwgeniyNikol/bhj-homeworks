const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
let pollId;

function showPopup() {
    const html = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border: 2px solid green;
            border-radius: 5px;
        ">
            Спасибо, ваш голос засчитан!
        </div>
    `;
    
    const popup = document.createElement('div');
    popup.innerHTML = html;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

xhr.onload = function() {
    const data = JSON.parse(xhr.responseText);
    pollId = data.id;
    pollTitle.textContent = data.data.title;
    
    data.data.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'poll__answer';
        btn.textContent = answer;
        
        btn.onclick = function() {
            showPopup();
            
            const voteXhr = new XMLHttpRequest();
            voteXhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
            voteXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            voteXhr.send(`vote=${pollId}&answer=${index}`);
            
            voteXhr.onload = function() {
                const results = JSON.parse(voteXhr.responseText);
                const total = results.stat.reduce((sum, item) => sum + item.votes, 0);
                
                let resultsHTML = '';
                results.stat.forEach(item => {
                    const percent = total > 0 ? ((item.votes / total) * 100).toFixed(2) : 0;
                    resultsHTML += `<div>${item.answer}: ${item.votes} голосов (${percent}%)</div>`;
                });
                
                resultsHTML += '<button onclick="location.reload()">Пройти опрос еще раз</button>';
                pollAnswers.innerHTML = resultsHTML;
            };
        };
        
        pollAnswers.appendChild(btn);
    });
};