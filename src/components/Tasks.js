import Task from './Task'

function Tasks({ tasks, deleteTask, onToggle }) {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default Tasks
