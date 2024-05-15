import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  description: string;
  datetime: string;
  color: string;
  completed: boolean;
}
interface TasksState {
    tasks: Task[];
  }
  

// const initialState: Task[] = [];
const initialState: TasksState = {
    tasks: [],
  };

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },

    updateTaskStatus(state, action) {
        const { old_data} = action.payload;
        state.tasks = old_data;
    },
    removeTask(state,action){
        const { old_data } = action.payload;
      
        state.tasks = old_data;
    },

  },
});

export const { addTask,updateTaskStatus,removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
