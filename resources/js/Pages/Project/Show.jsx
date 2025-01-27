import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Show({project}) {
  return (
    <AuthenticatedLayout  header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          {`Project: ${project.name}`}
        </h2>
    }>
        <Head title={`Project: ${project.name}`} />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
                <img 
                    src={`/storage/${project.image_path}`} 
                    alt={project.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4" 
                />
                <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
                <p className="mt-2 text-base text-gray-700">{project.description}</p>
                <div className="mt-4 border-t border-gray-200 pt-4">
                    <h2 className="text-xl font-semibold text-gray-800">Project Details</h2>
                    <div className="mt-2 space-y-2">
                        <p className="text-base">
                            <strong className="text-gray-800">Start Date:</strong> {project.created_at.slice(0,10)}
                        </p>
                        <p className="text-base">
                            <strong className="text-gray-800">End Date:</strong> {project.due_date.slice(0,10)}
                        </p>
                        <p className="text-base">
                            <strong className="text-gray-800">Status:</strong > {project.status}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
