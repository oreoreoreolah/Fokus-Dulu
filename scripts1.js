// Task Management
const addTaskButton = document.getElementById('addTaskButton');
const taskName = document.getElementById('taskInput');
const taskDescription = document.getElementById('taskDescription');
const taskDeadline = document.getElementById('deadlineInput');
const taskList = document.getElementById('taskList');

// Muat tugas dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  displayTasks(); // Tampilkan tugas saat halaman dimuat
});

// Fungsi: Tambahkan tugas baru
addTaskButton.addEventListener('click', () => {
  const taskNameValue = taskName.value.trim();
  const taskDeadlineValue = taskDeadline.value;

  if (taskNameValue === '' || taskDeadlineValue === '') {
    alert('Silakan masukkan tugas dan deadline!');
    return;
  }

  const tasks = getTasks();
  tasks.push({
    name: taskNameValue,
    description: taskDescription.value.trim(),
    deadline: taskDeadlineValue,
    completed: false,
  });

  saveTasks(tasks); // Simpan tugas ke localStorage
  displayTasks(); // Tampilkan ulang daftar tugas
  clearForm(); // Kosongkan form input
});

// Fungsi: Render daftar tugas ke HTML
function displayTasks() {
  const tasks = getTasks();
  taskList.innerHTML = ''; // Kosongkan daftar tugas sebelumnya

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = task.completed ? 'completed' : '';

    listItem.innerHTML = `
      <span>${task.name} - ${new Date(task.deadline).toLocaleString()}</span>
      <button onclick="markTaskCompleted(${index})">Selesai</button>
    `;

    taskList.appendChild(listItem);
  });
}

// Fungsi: Tandai tugas sebagai selesai
function markTaskCompleted(index) {
  const tasks = getTasks();
  tasks[index].completed = true; // Tandai tugas sebagai selesai
  saveTasks(tasks); // Simpan perubahan ke localStorage
  displayTasks(); // Tampilkan ulang daftar tugas
}

// Fungsi: Ambil tugas dari localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Fungsi: Simpan tugas ke localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi: Kosongkan form input setelah penambahan tugas
function clearForm() {
  taskName.value = '';
  taskDescription.value = '';
  taskDeadline.value = '';
}
