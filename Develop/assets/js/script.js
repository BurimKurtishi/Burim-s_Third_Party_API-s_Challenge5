$(document).ready(function() {
  
  const todoCardsContainer = $('#todo-cards');
  const inProgressCardsContainer = $('#in-progress-cards');
  const doneCardsContainer = $('#done-cards');

  $(document).ready(function() {
    $('#addTaskBtn').click(function() {
      $('#addTaskModal').modal('show');
    });
  
    
    $('#taskForm').submit(function(event) {
      event.preventDefault(); 
  
      var title = $('#taskTitle').val();
      var description = $('#taskDescription').val();
  
      
  
      l
      $('#addTaskModal').modal('hide');
  
      
      $('#taskTitle').val('');
      $('#taskDescription').val('');
    });
  });



  let tasks = [
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'in-progress' },
    { id: 3, title: 'Task 3', status: 'done' }
  ];

  
  function renderTasks() {
    s
    todoCardsContainer.empty();
    inProgressCardsContainer.empty();
    doneCardsContainer.empty();

    
    tasks.forEach(task => {
      const taskCard = createTaskCard(task);
      if (task.status === 'todo') {
        todoCardsContainer.append(taskCard);
      } else if (task.status === 'in-progress') {
        inProgressCardsContainer.append(taskCard);
      } else if (task.status === 'done') {
        doneCardsContainer.append(taskCard);
      }
    });

    function displayTime () {
      const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
      timeDisplayEl.text(rightNow);
    }


    
    
    makeTaskCardsDraggable();
    makeTaskContainersDroppable();
  }

 
  function createTaskCard(task) {
    const card = $('<div>')
      .addClass('card mb-3')
      .attr('data-task-id', task.id)
      .append($('<div>').addClass('card-body').text(task.title));
    return card;
  }

  
  function makeTaskCardsDraggable() {
    $('.card').draggable({
      revert: 'invalid',
      cursor: 'move',
      opacity: 0.7,
      zIndex: 100
    });
  }

 
  function makeTaskContainersDroppable() {
    $('.lane').droppable({
      accept: '.card',
      drop: function(event, ui) {
        const taskId = ui.draggable.attr('data-task-id');
        const newStatus = $(this).attr('id');
        updateTaskStatus(taskId, newStatus);
      }
    });
  }

  
  function updateTaskStatus(taskId, newStatus) {
    const taskToUpdate = tasks.find(task => task.id == taskId);
    if (taskToUpdate) {
      taskToUpdate.status = newStatus;
      renderTasks();
    }
  }

 
  $('#addTaskBtn').on('click', function() {
    const newTaskTitle = prompt('Enter task title:');
    if (newTaskTitle) {
      const newTask = { id: tasks.length + 1, title: newTaskTitle, status: 'todo' };
      tasks.push(newTask);
      renderTasks();
    }
  });

 
  renderTasks();
});

