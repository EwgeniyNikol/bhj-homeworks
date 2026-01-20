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

    const createTask = (task) => {
        const taskEl = document.createElement('div');
        taskEl.className = 'task';
        taskEl.dataset.id = task.id;
        
        const title = document.createElement('div');
        title.className = 'task__title';
        title.textContent = task.text;
        
        const removeBtn = document.createElement('a');
        removeBtn.href = '#';
        removeBtn.className = 'task__remove';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = (e) => {
            e.preventDefault();
            deleteTask(task.id);
        };
        
        taskEl.append(title, removeBtn);
        return taskEl;
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
        tasksList.innerHTML = '';
        tasks.forEach(task => tasksList.appendChild(createTask(task)));
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        loadTasks();
        renderTasks();
        taskInput.focus();
    });

    document.getElementById('tasks__form').onsubmit = (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    };

    taskInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask(taskInput.value);
        }
    };

    document.getElementById('tasks__add').onclick = (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    };