import { useState } from "react";
import "./App.css";
import EditIcon from "./edit_icon.svg";
import DeleteIcon from "./trash-icon.svg";
import SearchIcon from "./search-icon.svg";

// import
function App() {
  const [tasksContainer, setTasksContainer] = useState(
    localStorage.getItem("tasksContainer")
      ? JSON.parse(localStorage.getItem("tasksContainer"))
      : []
  );
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [inputedTask, setInputedTask] = useState([]);
  const [inputPopup, setInputPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [taskOpen, setTaskOpen] = useState(false);

  function grabTheTask(theTask) {
    setInputedTask(theTask.target.value);
  }
  const inputCondition = (theWrittenText) => {
    const regex = /^\s*$/;
    return regex.test(theWrittenText);
  };

  let pushTheTask = () => {
    const theTask = { text: inputedTask, id: Math.random() };
    setTasksContainer((oldTasks) => [...oldTasks, theTask]);
    let newUpdatedTasks = [...tasksContainer];
    newUpdatedTasks.push(theTask);
    setInputedTask("");
    localStorage.setItem("tasksContainer", JSON.stringify(newUpdatedTasks));
    setInputPopup(false);
  };
  function addTheTask() {
    if (!inputCondition(inputedTask)) {
      let inputLogic = tasksContainer.find((task) => task.text == inputedTask);
      if (!inputLogic) {
        pushTheTask();
        setTaskOpen(false);
      } else {
        setInputPopup(true);
      }
    } else {
      alert("Empty task!!");
    }
  }
  function updateTask() {
    const updatedTasks = tasksContainer.map((task) => {
      if (task.id === selectedTask.id) {
        return selectedTask;
      } else {
        return task;
      }
    });
    localStorage.setItem("tasksContainer", JSON.stringify(updatedTasks));
    setTasksContainer(updatedTasks);
    setEditPopup(false);
  }
  function taskSelection(id) {
    let newUpdatedTasks = [...tasksContainer];
    let singleTask = newUpdatedTasks.find((task) => task.id == id);
    setSelectedTask(singleTask);
    return singleTask.id;
  }
  function deliteTheTask(id) {
    let newUpdatedTasks = [...tasksContainer];
    let completedTask = newUpdatedTasks.filter((task) => task.id !== id);
    localStorage.setItem("tasksContainer", JSON.stringify(completedTask));
    setTasksContainer(completedTask);
    setDeletePopup(false);
  }
  return (
    <>
      <div className="main-heading-container">
        <p className="main-title">To Do App</p>
        <div className="search-container">
          <div className="search">
            <input type="text" placeholder="Search In Your Tasks..." />
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          </div>
          <button onClick={() => setTaskOpen(true)}>+</button>
        </div>
      </div>
      {taskOpen ? (
        <div className="add-task-popup-cnt">
          {/* onClick={() => setTaskOpen(false)} */}
          <div className="header-container">
            <p>Add a New Task</p>
            <div className="input-btn-container">
              {/* <input type="text" value={inputedTask} onChange={grabTheTask} placeholder="Enter Your Task..." /> */}
              <textarea
                type="text"
                value={inputedTask}
                onChange={grabTheTask}
                placeholder="Enter Your Task..."
              />

              <button onClick={addTheTask}>Submit</button>
            </div>
          </div>
        </div>
      ) : null}
      {tasksContainer.map((task) => {
        return (
          <div className="tasks-container" key={task.id}>
            <div className="main-tasks">
              {" "}
              <aside className="left-side">
                {" "}
                <input
                  type="checkbox"
                  onClick={() => {
                    setDeletePopup(true);
                    taskSelection(task.id);
                  }}
                />
                <p className="main-task-text">{task.text}</p>
              </aside>
              <div className="icons-container">
                <img
                  src={EditIcon}
                  alt="Edit Icon"
                  onClick={() => {
                    setEditPopup(true);
                    taskSelection(task.id);
                  }}
                />
                <img
                  src={DeleteIcon}
                  alt="Edit Icon"
                  onClick={() => {
                    setDeletePopup(true);
                    taskSelection(task.id);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      {/* INPUT_POPUP_____________________________________________ */}

      {/* INPUT_CONDITION_POPUP_____________________________________________ */}
      {inputPopup ? (
        <div className="Input-Popup-bg">
          <div className="input-popup">
            <p>Same Item!!!</p>
            <button onClick={() => setInputPopup(false)}>Cancel</button>
            <button onClick={pushTheTask}>Submit</button>
          </div>
        </div>
      ) : null}
      {/* EDIT__POPUP_____________________________________________ */}
      {editPopup ? (
        <div className="aaa">
          <div className="edit-note-popup" id="editPopUp">
            <div className="edit-top-container">
              <textarea
                type="text"
                name="new Task"
                id="editTaskInput"
                value={selectedTask.text}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, text: e.target.value })
                }></textarea>
              <button
                className="close-x-for-edits"
                id="editPopupCloseBtn"
                type="submit"
                onClick={() => setEditPopup(false)}>
                X
              </button>
            </div>
            <div className="save-button-container">
              <button
                id="saveEditButton"
                className="save-button-for-edits"
                onClick={updateTask}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/* DELETE__POPUP_____________________________________________ */}
      {deletePopup ? (
        <div className="aaa">
          <div className="delete-note-popup" id="deletePopUpContainer">
            <p className="new-note-popup-title">
              Did you Complete The Task?
              <button
                className="close-x"
                id="deletePopupCloseBtn"
                type="submit"
                onClick={() => setDeletePopup(false)}>
                X
              </button>
            </p>
            <p className="abc">Are you sure you want to delete this task?</p>
            <div className="delete-popup-button-container">
              <button
                id="cancelDeleteButton"
                onClick={() => setDeletePopup(false)}>
                No
              </button>
              {/* TODO: */}
              <button
                id="confirmDeleteButton"
                onClick={() => {
                  deliteTheTask(selectedTask.id);
                }}>
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default App;
