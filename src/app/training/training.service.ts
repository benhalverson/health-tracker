import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private afs: AngularFirestore) {}

  /**
   * Fetches the data from the firestore database.
   */
  fetchAvilableExercises() {
    this.afs
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Exercise)
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  getRunningExercises() {
    return { ...this.runningExercise };
  }

  /**
   * Starts the timer based on the selected exercise.
   * @param selectedId The selected exerciseId from the dropdown menu
   */
  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  /**
   * successfully completed the excerise and saves data to firestore with date and state.
   */
  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  /**
   * stopped the excersie early with state, date and precent completed.
   */
  cancelExercise(progess: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progess / 100),
      calories: this.runningExercise.calories * (progess / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  /**
   * returns data for past table component
   */
  fetchGetCompletedOrCancelledExercises() {
    this.afs
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  /**
   * add data to firestore db
   */
  private addDataToDatabase(exercise: Exercise) {
    this.afs
      .collection('finishedExercises')
      .add(exercise)
      .catch((error: Error) => {
        console.error(error.message);
      });
  }
}
