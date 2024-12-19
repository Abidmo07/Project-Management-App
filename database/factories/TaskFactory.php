<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name"=> $this->faker->name,
            "description"=> $this->faker->realText(),
            "image_path"=> $this->faker->imageUrl(),
            "status"=> $this->faker->randomElement(["peding","in_progress","completed"]),
            "priority"=> $this->faker->randomElement(["high","medium","low"]),
            "created_by"=>1,
            "updated_by"=>1,
            "assigned_user_id"=>1,
            "project_id"=> 1,
            "due_date"=>$this->faker->dateTimeBetween("now","+7 days"),
        ];
    }
}
