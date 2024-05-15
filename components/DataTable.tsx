import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { removeTask, updateTaskStatus } from '@/lib/slices/tasksSlice';


export default function DataTable() {
  const dispatch = useAppDispatch();
  const TaskData = useAppSelector((state)=>state.tasks.tasks)
  const NewData = TaskData.map((it,i)=> ({...it,id:i}));
  const dispatchEditAction = (values?: Number) => {
    // Implement edit action
    let Arr = NewData;
    const taskIndex = NewData.findIndex((task) => task.id === values);
    if(taskIndex!= -1){
      Arr[taskIndex].completed = true;
      dispatch(updateTaskStatus({taskId:values, newStatus:1,old_data:Arr}));
    }
  };

  const dispatchDeleteAction = (values?: Number) => {
    // Implement delete action
    const filteredTasks = NewData.filter((task) => task.id != values);
    dispatch(removeTask({taskId:values,old_data:filteredTasks}));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1,
    renderCell: (params)=>{
      const {id} = params.row;
      return (
        <>
          {id+1}
          </>
      )
    }

     },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'datetime', headerName: 'Date Time', flex: 1 },
    { field: 'completed', headerName: 'Completed', flex: 1,
    renderCell: (params)=>{
      const {completed} = params.row;
      return (
        <>
          {completed? <p className="text-green-400">Yes</p> : <p className="text-red-400">No</p>}
        </>
      )
    }
     },
    {
      field: 'actions',
      headerName: 'Actions',
      // flex: 1,
      width: 310,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <div className="">
            <Button
              variant="outlined"
              size="small"
              onClick={() => dispatchEditAction(id)}
              className="mx-2"
              color="success"
            >
              Mark As Completed
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => dispatchDeleteAction(id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      style={{minHeight:100, width: '100%'}}
        rows={NewData}
        columns={columns}
        // pageSize={5}
        // checkboxSelection
      />
    </div>
  );
}
