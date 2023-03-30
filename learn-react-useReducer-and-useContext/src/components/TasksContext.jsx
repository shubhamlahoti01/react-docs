import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      let newtasks = [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
      localStorage.setItem('react-dev-tasks', JSON.stringify(newtasks));
      return newtasks;
    }
    case 'changed': {
      let newtasks = tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
      localStorage.setItem('react-dev-tasks', JSON.stringify(newtasks));
      return newtasks;
    }
    case 'deleted': {
      let newtasks = tasks.filter((t) => t.id !== action.id);
      localStorage.setItem('react-dev-tasks', JSON.stringify(newtasks));
      return newtasks;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = JSON.parse(localStorage.getItem('react-dev-tasks')) || [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false },
];
