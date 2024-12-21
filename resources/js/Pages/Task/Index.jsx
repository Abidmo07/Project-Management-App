import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import  { useEffect, useState } from 'react'

export default function Index({ tasks,sort_direction,sort_field }) {
    const [search,setSearch]= useState('');
    const [selecte,setSelect]=useState('');
    const [filtredTasks,setFiltredTasks]=useState(tasks.data);
    const [direction,setDirection]=useState(sort_direction);
    const[field,setField]=useState(sort_field);
     const handleSort = (column) => {
       
    const new_direction=direction=="asc"?"desc":"asc" 
    setDirection(new_direction);
    setField(column)
 
    router.get(route("task.index",{sort_field:column,sort_direction:new_direction}))
   };
 
    const filterbystatus=()=>{
     if(!selecte){
       setFiltredTasks(tasks.data);
     }
     else{
       setFiltredTasks(tasks.data.filter((task)=>(task.status.toLowerCase().includes(selecte.toLowerCase()))))
     }
    }
 
   
    useEffect(()=>{
     if(search=='' ){
       setFiltredTasks(tasks.data);
       console.log("before seach",filtredTasks);
     }
     else {
      setFiltredTasks(tasks.data.filter((task)=>(task.name.toLowerCase().includes(search.toLocaleLowerCase())) ));
      console.log("after search",filtredTasks)
     }
     
   },[search])
   
   useEffect(()=>{
     filterbystatus();
    
 
 
   },[selecte])
  return (
    <AuthenticatedLayout
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Tasks
        </h2>
    }>
        <Head title="Tasks" />
        <div className='flex justify-end items-center p-4'>
        
         <Link className='bg-green-500 text-white p-4 rounded-lg hover:bg-green-600' href={route('project.create')}>Add Project</Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 space-y-5 py-5 ">
      <div className="overflow-x-auto">
  <table className="min-w-full table-auto text-sm text-left text-gray-800">
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
      <tr>
        <th onClick={() => handleSort("id")} className="px-6 py-3 cursor-pointer">Id <span>{field === "id" ? (direction === "asc" ? "↑" : "↓") : ""}</span></th>
        <th onClick={() => handleSort("name")} className="px-6 py-3 cursor-pointer">Name <span>{field === "name" ? (direction === "asc" ? "↑" : "↓") : ""}</span></th>
        <th className='px-6 py-3 cursor-pointer'>Project name</th>
        <th className="px-6 py-3">Image</th>
        <th onClick={() => handleSort("description")} className="px-6 py-3 cursor-pointer">Description <span>{field === "description" ? (direction === "asc" ? "↑" : "↓") : ""}</span></th>
        <th onClick={() => handleSort("status")} className="px-6 py-3 cursor-pointer">Status <span>{field === "status" ? (direction === "asc" ? "↑" : "↓") : ""}</span></th>
        <th className="px-6 py-3">Priority</th>
        <th className="px-6 py-3">Assigned to</th>
        <th className="px-6 py-3">Created By</th>
        <th onClick={() => handleSort("due_date")} className="px-6 py-3 cursor-pointer">Due Date <span>{field === "due_date" ? (direction === "asc" ? "↑" : "↓") : ""}</span></th>
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-6 py-3"></td>
        <td className="px-6 py-3">
          <input className='rounded-md border border-gray-300 w-32' type="search" name="search" id="search" 
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder='Task name'
          />
        </td>
        <td className="px-6 py-3"></td>
        <td className="px-6 py-3"></td>
        <td className="px-6 py-3">
          <select value={selecte} className='rounded-md border border-gray-300' name="status" id="status" 
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </td>
      </tr>

      {/* Rendering filtered Projects */}
      {(search || selecte ? filtredTasks : tasks.data).map((task) => (
        <tr className="bg-white hover:bg-gray-50 transition-colors duration-200" key={task.id}>
          <td className="px-6 py-3">{task.id}</td>
          <td className="px-6 py-3">{task.name}</td>
          <td className='px-6 py-3'>{task.project.name}</td>
          <td className="px-6 py-3">
            <img className='w-20 h-auto' src={task.image_path} alt={task.name} />
          </td>
          <td className="px-6 py-3">{task.description.slice(0,50)}</td>
          <td className={`px-6 py-3 text-center ${task.status === 'pending' ? 'bg-yellow-300' : task.status === 'in_progress' ? 'bg-blue-600' : 'bg-green-600'}`}>{task.status}</td>
          <td className="px-6 py-3">{task.priority}</td>
          <td className="px-6 py-3">{task.assign_user?.name || 'N/A'}</td>
          <td className="px-6 py-3">{task.createdby?.name || 'N/A'}</td>
          <td className="px-6 py-3">{task.due_date.slice(0, 10)}</td>
          <td className="px-6 py-3 space-x-5">
            <Link className='bg-blue-600 text-white rounded-md p-2' href={route('task.edit', task.id)}>Edit</Link>
            <Link className='bg-red-600 text-white rounded-md p-2' href={route('task.destroy', task.id)}>Delete</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  

  <Pagination  links={tasks.links}/> 
</div>
    </AuthenticatedLayout>
  )
}
