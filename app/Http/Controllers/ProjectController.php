<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sort_field=request("sort_field","created_at");
        $sort_direction =request("sort_direction","asc");
        $projects = Project::orderBy($sort_field,$sort_direction)->with("createdby","updatedby")->paginate(10);
        return Inertia::render("Project/Index", ["projects"=>$projects,"sort_field"=>$sort_field,"sort_direction"=>$sort_direction]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render("Project/Show", ["project"=> $project]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render("Project/Edit",["project"=>$project]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }

  /*   public function sort(Request $request, $column)
    {
        $sorted_direction = $request->input('direction', 'asc');
        
        // Invert sorting direction
        $new_direction = ($sorted_direction == 'asc') ? 'desc' : 'asc';
        
        // Sort the projects based on the provided column and direction
        $projects = Project::orderBy($column, $new_direction)->paginate(10);
    
        // Pass the sorted projects and direction to the Inertia view
        return Inertia::render('Project/Index', [
            'projects' => $projects,
            'direction' => $new_direction,  // Pass the new direction to the frontend
        ]);
    } */
    
}
