import React, { useState } from 'react';
import { addTask, updateTaskStatus,Task } from '@/lib/slices/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DataTable from './DataTable';
import { generateRandomColor } from '@/utils/helper';




const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


    const TaskTable: React.FC = () => {

    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading,setLoading] = useState(false);



  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newDatetime, setDewDatetime] = useState('');

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (newTaskTitle) {
      dispatch(addTask({ title: newTaskTitle,datetime: newDatetime,color:generateRandomColor()}));
      setNewTaskTitle(''); // Reset state after dispatching
      setDewDatetime('');
      handleClose();
    }
    setLoading(false);
  };

  return (
    <>
    <div className="flex items-center justify-between my-4" >
        <b>Task Table</b> <button type="button" className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm" onClick={handleOpen} >Add Task</button>
    </div>

    <DataTable />


    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <form className="max-w-md mx-auto" onSubmit={handleAddTask}>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" 
                onChange={(e)=>setNewTaskTitle(e.target.value)}
                name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task Details</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="datetime-local"
                onChange={(e)=>setDewDatetime(e.target.value)}
                name="floating_datetime" id="floating_datetime" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_datetime" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Datetime</label>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading? "Loading...":'Save'}</button>
          </form>

        </Box>
      </Modal>
    </>
  );
};

export default TaskTable;
