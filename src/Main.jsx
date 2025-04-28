import './TDL.css';
import React, { useEffect } from 'react';
import ParticlesBackground from './Particals.js'; 

function App() {
  let [task, setTask] = React.useState([]);
  let [newtask, setNewtask] = React.useState('');
  let [textAreaContent, setTextAreaContent] = React.useState(''); 
  let radio = false;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTask(storedTasks);
    }
    
    const storedTextArea = localStorage.getItem('textAreaContent');
    if (storedTextArea) {
      setTextAreaContent(storedTextArea);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem('textAreaContent', textAreaContent);
  }, [textAreaContent]);

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
    setTask(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: true } : task
      )
    );

    setTimeout(() => {
      setTask(task.filter((e, i) => i !== index));
    }, 2000);
  }

  return (
    <div className='app'>
      <ParticlesBackground />
      
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
