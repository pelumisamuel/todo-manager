import Header from './components/Header'
import Tasks from './components/Tasks'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //FECTH TASKS

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()

    // console.log(task)
    // const id = Math.floor(Math.random() * 10000) + 1
    //const newTask = { id, ...task }
    setTasks([...tasks, data])
  }

  //DeleteTask function.
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // console.log(id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // TOGGLE reminder
  const onToggle = async (id) => {
    const taskToToggle = await fetchTasks()
    const toggledTask = taskToToggle[id - 1]

    const updateTask = {
      ...toggledTask,
      reminder: !toggledTask.reminder,
    }

    console.log(updateTask)

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    })
    const data = await res.json()
    console.log(data)

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTaskValue={showAddTask}
        />

        <Routes>
          <Route
            path='/'
            exact
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    deleteTask={deleteTask}
                    onToggle={onToggle}
                  />
                ) : (
                  'No tasks to show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        {/* <About /> */}

        <Footer />
      </div>
    </Router>
  )
}

export default App
