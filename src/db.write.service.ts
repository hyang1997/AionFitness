import { Firestore, getFirestore } from "@angular/fire/firestore";
import { writeBatch, doc } from "@angular/fire/firestore";
import { Injectable, inject } from "@angular/core";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { query, where, orderBy, limit } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
  })

export class dbWriteService{
// List of exercises to add
    db = inject(Firestore);

    async addExercise(userId: string, exerciseName: string, bodyPart: string){
      try{
        const sessionRef = addDoc(collection(this.db, 'exercises'), {
          userId: userId,
          exerciseName: exerciseName,
          bodyPart: bodyPart,
          description: 'client added exercise.'
        })
        console.log('Exercise Successfully addeed.', (await sessionRef).id)
      }
      catch(error){
        console.error('u goofed.')
      }
    }
    async saveSession(userId: string, sessionData: any): Promise<void> {
        try {
          const sessionRef = addDoc(collection(this.db, 'sessions'),{
            userId: userId,
            date: new Date(),
            exercises: sessionData.exercises
          }
        )
          console.log('Session successfully saved!');
        } catch (error) {
          console.error('Error saving session:', error);
        }
      }
      async saveTemplate(userId: string, templateName: string, exercises: any[]): Promise<void> {
        try {
          const processedExercises = await Promise.all(exercises.map(async (exercise) => {
            const latestData = await this.getLatestExerciseData(userId, exercise.exerciseId);
            return {
              ...exercise,
              previousSets: latestData ? latestData.previousSets : []
              };
            }));
    
            const templateRef:any = await addDoc(collection(this.db, 'workoutTemplates'), {
            userId: userId,
            name: templateName,
            exercises: processedExercises
             })
          
          console.log('Template successfully saved!');
        } catch (error) {
          console.error('Error saving template:', error);
        }
      }
    
      private async getLatestExerciseData(userId: string, exerciseId: string): Promise<any> {
        const q = query(
          collection(this.db, 'sessions'),
          where('userId', '==', userId),
          where('exercises.exerciseId', '==', exerciseId),
          orderBy('date', 'desc'),
          limit(1)
        );
    
        const latestSessionSnapshot = await getDocs(q);
    
        if (!latestSessionSnapshot.empty) {
          const sessionData = latestSessionSnapshot.docs[0].data();
          const exerciseData = sessionData['exercises'].find((ex: any) => ex.exerciseId === exerciseId);
          return exerciseData ? { previousSets: exerciseData.sets } : null;
        }
    
        return null;
      }
}