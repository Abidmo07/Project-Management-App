import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

export default function Create() {
const {data,setData,post,errors,reset}=  useForm({
    image:'',
    name:'',
    description:'',
    status:'',
    due_date:''
  });
  const handleSubmition=(e)=>{
    e.preventDefault();
    post(route("project.store"));
  }
  return (
    <AuthenticatedLayout
    header={
      <h2 className="text-xl font-semibold leading-tight text-gray-800">
        Create new project
      </h2>
    }
    >
      <Head title='Project' />
      <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmition} className='flex flex-col gap-2'>
                              <div className='flex flex-col gap-1'>
                                 <label htmlFor="image">Upload Image:</label>
                              <input  onChange={(e)=>{
                                setData("image",e.target.files[0]);
                              }} type="file" name="image"  />
                              </div>
                              {errors.image && <div className='text-red-500'>{errors.image}</div>}
                              <div className='flex flex-col gap-1'>
                                <label htmlFor="name">Project Name:</label>
                                <input className='rounded-md' type="text" name="name" value={data.name} 
                                onChange={(e)=>{
                                  setData("name",e.target.value);
                                  console.log(data.name)
                                }} />
                              </div>
                              {errors.name && <div className='text-red-500'>{errors.name}</div>}

                              <div className='flex flex-col gap-1'>
                                <label htmlFor="description">Project description:</label>
                                <textarea className='rounded-md' type="text" name="description" value={data.description} 
                                onChange={(e)=>{
                                  setData("description",e.target.value);
                                  console.log(e.target.value)
                                }}/>
                              </div>
                              {errors.description && <div className='text-red-500'>{errors.description}</div>}

                              <div className='flex flex-col gap-1'>
                                <label htmlFor="status">Project status:</label>
                                <select className='rounded-md' name="status" value={data.status} 
                                onChange={(e)=>{
                                  setData("status",e.target.value);
                                  console.log(e.target.value)
                                }} >
                                  <option value="">Select Status</option>
                                  <option value="pending">Pending</option>
                                  <option value="in_progress">In Proggress</option>
                                  <option value="completed">Completed</option>
                                </select>
                                
                              </div>
                              {errors.status && <div className='text-red-500'>{errors.status}</div>}

                              <div className='flex flex-col gap-1'>
                                <label htmlFor="date">Due Date:</label>
                                <input className='rounded-md' type="date" name="date" value={data.due_date} 
                                onChange={(e)=>{
                                  setData("due_date",e.target.value);
                                  console.log(e.target.value)
                                }}  />
                              </div>
                              {errors.due_date && <div className='text-red-500'>{errors.due_date}</div>}
                            
                              <div className="flex justify-end gap-3">
  <Link className=' border-gray-950 border hover:bg-gray-700 hover:text-white duration-200 px-4 py-2 my-5 rounded-md ' href={route('project.index')}>Cancel</Link>
  <button
    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md my-5 transition-colors duration-200"
    type="submit"
  >
    Create Now !
  </button>
</div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
      
    </AuthenticatedLayout>
  )
}
