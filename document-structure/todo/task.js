let tasks = [];
const STORAGE_KEY = 'todo_tasks';
const tasksList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const saveTasks = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

const loadTasks = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) tasks = JSON.parse(saved) || [];
};

const addTask = (text) => {
    text = text.trim();
    if (!text) return alert('Введите текст задачи!');
    
    tasks.push({id: generateId(), text, createdAt: new Date().toISOString()});
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

const renderTasks = () => {
    tasksList.innerHTML = tasks.map(task => `
        <div class="task" data-id="${task.id}">
            <div class="task__title">${task.text}</div>
            <a href="#" class="task__remove">&times;</a>
        </div>
    `).join('');
    
    tasksList.addEventListener('click', (e) => {
        if (e.target.classList.contains('task__remove')) {
            e.preventDefault();
            const taskElement = e.target.closest('.task');
            deleteTask(taskElement.dataset.id);
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    taskInput.focus();
});

document.getElementById('tasks__form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value);
});
