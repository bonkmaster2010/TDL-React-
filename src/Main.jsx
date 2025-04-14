import './TDL.css';
import React, { useEffect } from 'react';
import ParticlesBackground from './Particals.js'; // Make sure the import path is correct

function App() {
  let [task, setTask] = React.useState([]);
  let [newtask, setNewtask] = React.useState('');
  let [textAreaContent, setTextAreaContent] = React.useState(''); // New state for textarea content
  let radio = false;

  // Load tasks from local storage when the app loads
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTask(storedTasks);
    }
    
    const storedTextArea = localStorage.getItem('textAreaContent');
    if (storedTextArea) {
      setTextAreaContent(storedTextArea); // Load textarea content from local storage
    }
  }, []);

  // Save tasks to local storage whenever task list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  // Save textarea content to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('textAreaContent', textAreaContent);
  }, [textAreaContent]);

  // Add task function
  function addTask() {
    if (newtask !== '') {
      setTask(prev => [...prev, { task: newtask, completed: false }]);
      setNewtask('');
    }
  }

  // Delete task function
  function deleteTask(index) {
    setTask(task.filter((e, i) => i !== index));
  }

  // Complete task function
  function completeTask(index) {
    // Add 'completed' property to the task
    setTask(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: true } : task
      )
    );

    // Remove task after 2 seconds
    setTimeout(() => {
      setTask(task.filter((e, i) => i !== index));
    }, 2000);
  }

  return (
    <div className='app'>
      <ParticlesBackground /> {/* This will render the particles */}
      
      <div className="cont">
        <div className="task-input">
          <input
            type="text"
            value={newtask}
            onChange={(e) => setNewtask(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <ul>
          {task.map((task, index) => (
            <li
              key={index}
              className={task.completed ? 'completed' : ''}
            >
              <span>{task.task}</span>
              <div>
                <label className="custom-radio">
                  <button className="done" onClick={() => completeTask(index)}>Done</button>
                </label>
                <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="Note">
          <h2>Day Breakdown</h2>
          <textarea 
            value={textAreaContent} 
            onChange={(e) => setTextAreaContent(e.target.value)} 
            name="note" 
            id="note"
          />
        </div>

      </div>
    </div>
  );
}

export default App;
