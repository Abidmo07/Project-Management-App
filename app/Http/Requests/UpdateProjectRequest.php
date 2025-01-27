<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image"=>['nullable','image'],
            "name"=> ['max:255'],
            "description"=> 'string',
            "status"=>[Rule::in(['pending','completed','in_progress'])],
            "due_date"=>['nullable','date'],
        ];
    }
}
