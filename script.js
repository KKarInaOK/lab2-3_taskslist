// Очікуємо завершення завантаження DOM перед виконанням скрипту
document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо список справ з Local Storage або створюємо новий, якщо його немає
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Викликаємо функцію для оновлення інтерфейсу
    updateUI(tasks);

    // Функція для додавання нового завдання
    window.addTask = function() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        // Додаємо завдання тільки якщо введено текст
        if (taskText !== '') {
            tasks.push({
                text: taskText,
                completed: false
            });
            taskInput.value = '';
            // Викликаємо функцію для оновлення інтерфейсу
            updateUI(tasks);
        }
    };

    // Функція для очищення списку справ
    window.clearTasks = function() {
        // Запитуємо користувача про підтвердження
        if (confirm('Ви впевнені, що хочете очистити список справ?')) {
            // Очищаємо масив завдань
            tasks.length = 0;
            // Викликаємо функцію для оновлення інтерфейсу
            updateUI(tasks);
        }
    };

    // Функція для оновлення інтерфейсу на основі списку завдань
    function updateUI(tasks) {
        // Зберігаємо список справ в Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Отримуємо контейнер для відображення завдань
        const tasksDiv = document.getElementById('tasks');
        // Очищаємо контейнер перед відображенням нового списку завдань
        tasksDiv.innerHTML = '';
        // Виводимо кожне завдання в окремому блоці
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('taskItem');
            taskItem.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${tasks.indexOf(task)})">
        <span>${task.text}</span>
      `;
            tasksDiv.appendChild(taskItem);
        });

        // Оновлюємо загальну кількість справ
        const totalTasks = document.getElementById('totalTasks');
        totalTasks.textContent = tasks.length;
        // Оновлюємо кількість незроблених справ
        const remainingTasks = document.getElementById('remainingTasks');
        const remainingCount = tasks.filter(task => !task.completed).length;
        remainingTasks.textContent = remainingCount;
    }

    // Функція для перемикання стану завдання (виконано/не виконано)
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        // Викликаємо функцію для оновлення інтерфейсу
        updateUI(tasks);
    };
});