import { Firestore, getFirestore } from "@angular/fire/firestore";
import { writeBatch, doc } from "@angular/fire/firestore";
import { updateDoc } from "@angular/fire/firestore";
import { Injectable, inject } from "@angular/core";
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { query, where, orderBy, limit } from "firebase/firestore";
import workoutData from "./app/base-workout.json"
import { from, Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })

export class dbWriteService{
// List of exercises to add
    db = inject(Firestore);
    async IntializeWorkoutData(userId: string | null){
      if (userId){
        const userDocRef = doc(this.db, `users/${userId}`)
      for (const workout of workoutData) {
        const sessionRef = addDoc(collection(userDocRef, 'exercises'),{
          userId: userId,
          exerciseName: workout.name,
          description: workout.description,
          weightRecord: null
        })
        console.log(`Workout Initialized for User ${userId}`);
      }
    }
  }
    async InitializeUserRole(userId: string){
      if(userId){
        setDoc(doc(this.db, 'users', userId), {
          "roles": "user",
        })
      }
    }
    async updateWeightRecord(userId: string | null, exerciseRef: string, weightRecord:Number){
      if (userId){
        const recordRef = doc(this.db, `users/${userId}/exercises/${exerciseRef}`);
        updateDoc(recordRef,{'weightRecord':weightRecord})
      }
    }
    async getWeightRecordByName(userId: string | null, exerciseName: string){
      const exercisesRef = collection(this.db, `users/${userId}/exercises`);
      const q = query(
        exercisesRef,
        where("exerciseName", "==", exerciseName)
      );
      console.log(userId, exerciseName);
  
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const exerciseDoc = querySnapshot.docs[0];
        const exerciseData :any = exerciseDoc.data();
  
        console.log(exerciseData['weightRecord']);
        return exerciseData;
      } else {
        console.log("No matching exercise found for the specified user.");
        return null;
      }
    } catch () {
      console.error("Error getting weight record: ");
    }
    async addExercise(userId: string | null , exerciseName: string, bodyPart: string, description: string = 'client added exercise.'){
      if (userId){
      try{
        const userDocRef = doc(this.db, `users/${userId}`)
        const sessionRef = addDoc(collection(userDocRef, 'exercises'), {
          userId: userId,
          exerciseName: exerciseName,
          bodyPart: bodyPart,
          description: description
        })
        console.log('Exercise Successfully addeed.', (await sessionRef).id)
      }
      catch(error){
        console.error('u goofed.')
      }
    }
    }
    async saveSession(userId: string, sessionData: any): Promise<void> {
      const sessionDocRef = collection(this.db, `users/${userId}/sessions/`);
      addDoc(sessionDocRef, sessionData);
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
    
      async getLatestExerciseData(userId: string, exerciseId: string): Promise<any> {
        try {
          // Fetch sessions for the user
          const q = query(
            collection(this.db, 'sessions'),
            where('userId', '==', userId),
            orderBy('date', 'desc'),
            limit(10)  // Fetch a reasonable limit of documents
          );
      
          const latestSessionSnapshot = await getDocs(q);
      
          if (!latestSessionSnapshot.empty) {
            // Iterate through each document to find the matching exercise
            for (const doc of latestSessionSnapshot.docs) {
              const sessionData = doc.data();
              const exerciseData = sessionData['exercises'].find((ex: any) => ex.exerciseId === exerciseId);
              if (exerciseData) {
                return { previousSets: exerciseData.sets };
              }
            }
          }
      
          console.log('No matching session found for exerciseId:', exerciseId);
          return null;
        } catch (error) {
          console.error('Error fetching exercise data:', error);
          return null;
        }
      }
      
      
}