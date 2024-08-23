import { useState } from "react";
import Style from "./styles/main.module.css";

export default function Main() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); 
  const [editIndex, setEditIndex] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {

      const updatedTasks = [...taskList];
      updatedTasks[editIndex] = task;
      setTaskList(updatedTasks);
      setEditIndex(null); 
    } else {

      setTaskList([...taskList, task]);
    }

    setTask("");
  };

  const handleEdit = (index) => {
    setTask(taskList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const allTasks = taskList.map((item, index) => (
    <div
      className={Style.taskContainer}
      key={index}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onDoubleClick={() => setHoveredIndex(index)}
    >
      <div className={Style.task}>
        <h1 className={Style.taskText}>{item}</h1>
      </div>


      {hoveredIndex === index && (
        <div className={Style.taskOptions}>
          <button className={Style.editBtn} onClick={() => handleEdit(index)}>
            Edit
          </button>
          <button className={Style.deleteBtn} onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <div className={Style.container}>
      <div className={Style.main}>
        <div className={Style.contantContainer}>
          <section className={Style.contant}>
            <h1 className={Style.contantHeader}>Your Task</h1>
            <section className={Style.contantBody}>
              <h1 className={Style.contantText}>{task || "Click on a task to edit or delete"}</h1>
            </section>
          </section>
        </div>

        <form className={Style.form} onSubmit={handleSubmit}>
          <input
            className={Style.text}
            placeholder="Enter The Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className={Style.add} type="submit">
            {editIndex !== null ? "✓" : "◁"}
          </button>
        </form>
      </div>


      <div className={Style.tasksContainer}>
        <ul className={Style.ul}>{allTasks}</ul>
      </div>
    </div>
  );
}


