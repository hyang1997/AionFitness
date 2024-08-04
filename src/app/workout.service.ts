import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts = [
    {id: 1, name: 'Squat', bodyPart: 'legs', description: 'Squats are great for lower body workout'},
    {id: 2, name: 'Bench Press', bodyPart: 'chest', description: 'Bench press targets the chest muscles and triceps'},
    {id: 3, name: 'Deadlift', bodyPart: 'back', description: 'Deadlifts work the back, glutes, and hamstrings'},
    {id: 4, name: 'Overhead Press', bodyPart: 'shoulders', description: 'Overhead press strengthens the shoulders and triceps'},
    {id: 5, name: 'Pull-Up', bodyPart: 'back', description: 'Pull-ups target the upper back and biceps'},
    {id: 6, name: 'Bicep Curl', bodyPart: 'arms', description: 'Bicep curls focus on the biceps'},
    {id: 7, name: 'Tricep Dip', bodyPart: 'arms', description: 'Tricep dips target the triceps'},
    {id: 8, name: 'Lunge', bodyPart: 'legs', description: 'Lunges are great for the quads and glutes'},
    {id: 9, name: 'Leg Press', bodyPart: 'legs', description: 'Leg press machine works the quads, glutes, and hamstrings'},
    {id: 10, name: 'Leg Curl', bodyPart: 'legs', description: 'Leg curls target the hamstrings'},
    {id: 11, name: 'Leg Extension', bodyPart: 'legs', description: 'Leg extensions work the quads'},
    {id: 12, name: 'Calf Raise', bodyPart: 'legs', description: 'Calf raises target the calf muscles'},
    {id: 13, name: 'Chest Fly', bodyPart: 'chest', description: 'Chest flies target the pectoral muscles'},
    {id: 14, name: 'Dumbbell Press', bodyPart: 'chest', description: 'Dumbbell press targets the chest muscles'},
    {id: 15, name: 'Incline Bench Press', bodyPart: 'chest', description: 'Incline bench press focuses on the upper chest'},
    {id: 16, name: 'Lat Pulldown', bodyPart: 'back', description: 'Lat pulldowns target the lats and upper back'},
    {id: 17, name: 'Seated Row', bodyPart: 'back', description: 'Seated rows work the middle back and lats'},
    {id: 18, name: 'Bent Over Row', bodyPart: 'back', description: 'Bent over rows target the back and biceps'},
    {id: 19, name: 'Face Pull', bodyPart: 'shoulders', description: 'Face pulls target the rear delts and upper back'},
    {id: 20, name: 'Lateral Raise', bodyPart: 'shoulders', description: 'Lateral raises focus on the side delts'},
    {id: 21, name: 'Front Raise', bodyPart: 'shoulders', description: 'Front raises target the front delts'},
    {id: 22, name: 'Shrug', bodyPart: 'shoulders', description: 'Shrugs target the trapezius muscles'},
    {id: 23, name: 'Plank', bodyPart: 'core', description: 'Planks are great for core stability and strength'},
    {id: 24, name: 'Crunch', bodyPart: 'core', description: 'Crunches target the abdominal muscles'},
    {id: 25, name: 'Russian Twist', bodyPart: 'core', description: 'Russian twists work the obliques'},
    {id: 26, name: 'Leg Raise', bodyPart: 'core', description: 'Leg raises target the lower abs'},
    {id: 27, name: 'Bicycle Crunch', bodyPart: 'core', description: 'Bicycle crunches work the abs and obliques'},
    {id: 28, name: 'Mountain Climber', bodyPart: 'core', description: 'Mountain climbers are great for core and cardio'},
    {id: 29, name: 'Side Plank', bodyPart: 'core', description: 'Side planks target the obliques and core'},
    {id: 30, name: 'Hanging Leg Raise', bodyPart: 'core', description: 'Hanging leg raises target the lower abs and hip flexors'},
    {id: 31, name: 'Cable Crossover', bodyPart: 'chest', description: 'Cable crossovers target the chest muscles'},
    {id: 32, name: 'Chest Press Machine', bodyPart: 'chest', description: 'Chest press machines work the pectoral muscles'},
    {id: 33, name: 'Smith Machine Squat', bodyPart: 'legs', description: 'Smith machine squats target the quads, glutes, and hamstrings'},
    {id: 34, name: 'Hack Squat', bodyPart: 'legs', description: 'Hack squats target the quads, glutes, and hamstrings'},
    {id: 35, name: 'Good Morning', bodyPart: 'back', description: 'Good mornings work the lower back and hamstrings'},
    {id: 36, name: 'Hip Thrust', bodyPart: 'glutes', description: 'Hip thrusts target the glutes and hamstrings'},
    {id: 37, name: 'Glute Bridge', bodyPart: 'glutes', description: 'Glute bridges work the glutes and lower back'},
    {id: 38, name: 'Romanian Deadlift', bodyPart: 'legs', description: 'Romanian deadlifts target the hamstrings and glutes'},
    {id: 39, name: 'Sumo Deadlift', bodyPart: 'legs', description: 'Sumo deadlifts target the inner thighs and glutes'},
    {id: 40, name: 'Kettlebell Swing', bodyPart: 'full body', description: 'Kettlebell swings work the entire body with a focus on the glutes and core'},
    {id: 41, name: 'Clean and Press', bodyPart: 'full body', description: 'Clean and press works the entire body'},
    {id: 42, name: 'Turkish Get-Up', bodyPart: 'full body', description: 'Turkish get-ups target the core and improve overall strength and stability'},
    {id: 43, name: 'Farmer\'s Walk', bodyPart: 'full body', description: 'Farmer\'s walks improve grip strength and overall body conditioning'},
    {id: 44, name: 'Medicine Ball Slam', bodyPart: 'full body', description: 'Medicine ball slams work the core and upper body while providing cardio benefits'},
    {id: 45, name: 'Box Jump', bodyPart: 'legs', description: 'Box jumps improve explosive power and target the lower body'},
    {id: 46, name: 'Battle Rope', bodyPart: 'full body', description: 'Battle ropes provide a full-body workout with a focus on cardio and upper body strength'},
    {id: 47, name: 'Burpee', bodyPart: 'full body', description: 'Burpees provide a full-body workout with a focus on cardio and strength'},
    {id: 48, name: 'Push-Up', bodyPart: 'chest', description: 'Push-ups target the chest, triceps, and shoulders'},
    {id: 49, name: 'Dumbbell Row', bodyPart: 'back', description: 'Dumbbell rows work the back and biceps'},
    {id: 50, name: 'Skull Crusher', bodyPart: 'arms', description: 'Skull crushers target the triceps'},
    {id: 51, name: 'Preacher Curl', bodyPart: 'arms', description: 'Preacher curls focus on the biceps'}
];

  getWorkouts() {
    return this.workouts;
  }
}
