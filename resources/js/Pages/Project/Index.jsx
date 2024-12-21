import Pagination from '@/Components/Pagination'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'


 


export default function Index({ projects,sort_direction,sort_field }) {
    

   const [search,setSearch]= useState('');
   const [selecte,setSelect]=useState('');
   const [filtredProjects,setFiltredProjects]=useState(projects.data);
   const [direction,setDirection]=useState(sort_direction);
   const[field,setField]=useState(sort_field);
    const handleSort = (column) => {
      
   const new_direction=direction=="asc"?"desc":"asc"
   setDirection(new_direction);
   setField(column)

   router.get(route("project.index",{sort_field:column,sort_direction:new_direction}))
  };

   const filterbystatus=()=>{
    if(!selecte){
      setFiltredProjects(projects.data);
    }
    else{
      setFiltredProjects(projects.data.filter((project)=>(project.status.toLowerCase().includes(selecte.toLowerCase()))))
    }
   }

  
   useEffect(()=>{
    if(search=='' ){
      setFiltredProjects(projects.data);
      console.log("before seach",filtredProjects);
    }
    else {
     setFiltredProjects(projects.data.filter((project)=>(project.name.toLowerCase().includes(search.toLocaleLowerCase())) ));
     console.log("after search",filtredProjects)
    }
    
  },[search])
  
  useEffect(()=>{
    filterbystatus();
   


  },[selecte])
  return (
    <AuthenticatedLayout 
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Projects
        </h2>
      }
    >
      <Head title="Project" />
      <div className='flex justify-end items-center p-4'>
        
         <Link className='bg-green-500 text-white p-4 rounded-lg hover:bg-green-600' href={route('project.create')}>Add Project</Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 space-y-5 py-5 ">
  <table className="table-auto w-full text-sm text-left text-gray-800">
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
      <tr>
        <th onClick={()=>{
          handleSort("id")
        }}   className="px-6 py-3 cursor-pointer flex gap-1  ">Id <span  >{field === "id" ? (direction === "asc" ? "↑" : "↓") : ""}</span> </th>
        <th onClick={()=>{
          handleSort("name")
        }}  className="px-6 py-3 cursor-pointer">Name <span>{field === "name" ? (direction === "asc" ? "↑" : "↓") : ""}</span> </th>
        <th  className="px-6 py-3">Image</th>
        <th onClick={()=>{
          handleSort("description")
        }} className="px-6 py-3 cursor-pointer">Description <span>{field === "description" ? (direction === "asc" ? "↑" : "↓") : ""}</span> </th>
        <th onClick={()=>{
          handleSort("status")
        }} className="px-6 py-3 cursor-pointer">status <span>{field === "status" ? (direction === "asc" ? "↑" : "↓") : ""}</span> </th>
        <th onClick={()=>{
          handleSort("due_date")
        }} className="px-6 py-3 cursor-pointer">Due Date <span>{field === "due_date" ? (direction === "asc" ? "↑" : "↓") : ""}</span> </th>
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-6 py-3"></td>
        <td className="px-6 py-3"> 
            <input className='rounded-md' type="search" name="search" id="search" 
            onChange={(e)=>{
              setSearch(e.target.value);
              
            }}
            value={search}
            />
         
        </td>
        <td className="px-6 py-3">
          
        </td>
        <td className="px-6 py-3"></td>
        <td className="px-6 py-3 ">
          <select value={selecte} className='rounded-md' name="status" id="status" 
          onChange={(e)=>setSelect(e.target.value)}
          >
            <option value="">select state</option>
            <option value="pending">pending</option>
            <option value="in_progress">in progress</option>
            <option value="completed">completed</option>
          </select></td>
      
      </tr>

      

      {/* Rendring filtred Projects */}
      {search || selecte?    filtredProjects.map((filtred)=>(
        <tr className="bg-white hover:bg-gray-50" key={filtred.id}>
          <td className="px-6 py-3">{filtred.id}</td>
          <td className="px-6 py-3 "> <Link href={route('project.show',filtred.id)}>{filtred.name}</Link></td>
          <td className="px-6 py-3">{filtred.image_path}</td>
          <td className="px-6 py-3">{filtred.description}</td>
          <td className={`px-6 py-3 text-center  ${filtred.status=='pending'?'bg-yellow-300':
         filtred.status=='in_progress'?"bg-blue-600":"bg-green-600"
       }`}>{filtred.status}</td>
          <td className="px-6 py-3">{filtred.due_date.slice(0,10)}</td>
          <td className="px-6 py-3 space-x-5">
         <Link className='bg-blue-600 text-white rounded-md p-3' href={route('project.edit',filtred.id)}>Edit</Link>
         <Link className='bg-red-600 text-white rounded-md p-3' href={route('project.destroy',filtred.id)}>Delete</Link>
       </td>
        </tr>
      )):projects.data.map((project)=>(
        <tr key={project.id} className="bg-white hover:bg-gray-50">
       <td className="px-6 py-3">{project.id}</td>
       <td className="px-6 py-3"> <Link href={route('project.show',project.id)}>{project.name}</Link> </td>
       <td className="px-6 py-3"><img className='w-20' src={project.image_path} alt={project.name} /></td>
       <td className="px-6 py-3">{project.description}</td>
       <td className={`px-6 py-3 text-center  ${project.status=='pending'?'bg-yellow-300':
         project.status=='in_progress'?"bg-blue-600":"bg-green-600"
       }`}>{project.status}</td>
       <td className="px-6 py-3">{project.due_date.slice(0,10)}</td>
       <td className="px-6 py-3 space-x-5">
         <Link className='bg-blue-600 text-white rounded-md p-3' href={route('project.edit',project.id)}>Edit</Link>
         <Link className='bg-red-600 text-white rounded-md p-3' href={route('project.destroy',project.id)}>Delete</Link>
       </td>
     </tr>
     ))}
    </tbody>

  </table>
  

  <Pagination  links={projects.links}/> 
</div>


    </AuthenticatedLayout>
  )
}
