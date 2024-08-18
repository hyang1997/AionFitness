export interface session {
    date: string; // ISO date format (e.g., "2024-08-15")
    duration: number; // Duration of the workout in minutes
    exercises: {
      exerciseId: string; // Unique identifier for the exercise (e.g., "bench_press")
      name: string; // Name of the exercise (e.g., "Bench Press")
      sets: {
        setNumber: number; // Set number (e.g., 1, 2, 3, ...)
        reps: number; // Number of repetitions performed in this set
        weight: number; // Weight lifted in this set
      }[]; // Array of sets performed for this exercise
    }[]; // Array of exercises performed in this session
    notes?: string; // Optional notes about the session
  }
  