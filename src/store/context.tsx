import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

// Define Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define State interface
interface State {
  todos: Todo[];
}

// Define Action types
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "UPDATE_TODO"; payload: { id: number; text: string } }
  | { type: "DELETE_TODO"; payload: number };

// Action constants
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";

// Define initial state
const initialState: State = {
  todos: [],
};

// Create context with Dispatch type and State type
const TodoContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Reducer function
const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

// Define TodoProvider props interface
interface TodoProviderProps {
  children: ReactNode;
}

// Provider component
const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the Todo context
const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

// Exports
export { useTodo, ADD_TODO, TOGGLE_TODO, UPDATE_TODO, DELETE_TODO };
export default TodoProvider;
