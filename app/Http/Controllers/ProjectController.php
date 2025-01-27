<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
        return Inertia::render("Project/Index", ["projects"=>$projects,"sort_field"=>$sort_field,"sort_direction"=>$sort_direction,"success"=>session("success")]);
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
       $data= $request->validated();
       /* dd("project infos:", $data); */
       $data['created_by']=Auth::user()->id;
       $data['updated_by']=Auth::user()->id;
       if($request->hasFile('image')){

        $file=$request->file('image');
        $data['image_path']=$file->store('projects' ,'public');
       }
      

        Project::create($data);
       return redirect()->route("project.index")->with("success","project created with success!!");
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
        
        $data = $request->validated();
        $image=$request->file('image')?? null;
        if($image){
            if($project->image_path){
                Storage::disk('public')->delete($project->image_path);
            }
            $data['image_path']=$image->store('projects','public');
        } 
        $project->update($data);
    
        // Redirect back with a success message
        return redirect()->route('project.index')->with('success', 'Project details updated successfully!');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Task::where("project_id",$project->id)->delete();
        if($project->image_path){
            Storage::disk('public')->delete($project->image_path);
        }
        $project->delete();

        return redirect()->route("project.index")->with("success","project deleted with success");
    }


    
}
