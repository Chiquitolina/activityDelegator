import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  private tasksUpdated = new Subject<void>(); // Subject para emitir actualizaciones

  constructor(private dbService: NgxIndexedDBService) { }

  addTask(task: any) : Observable<any> {
    const taskWithTimestamp = {
      ...task,
      timestamp: new Date().toLocaleString() // O usa un valor único específico
    };
    
    return this.dbService.add('tasks', taskWithTimestamp).pipe(
      tap(() => this.tasksUpdated.next()) // Emitir evento de actualización
    );
  }

  getAllTasks(): Observable<any[]> {
    return this.dbService.getAll('tasks');
  }
  getLastThreeSorts(): Observable<any[]> {
    return this.dbService.getAll('tasks').pipe(
      map((tasks) => {
        // Invierte el array y luego toma los primeros 3 elementos
        const reversedTasks = tasks.reverse();
        return reversedTasks.slice(0, 3); // Toma los primeros 3 elementos del array invertido
      })
    );
  }

  deleteTask(timestamp: string): Observable<any> {
     return this.dbService.delete('tasks', timestamp);
  }

  getTasksUpdateListener() {
    return this.tasksUpdated.asObservable(); // Exponer el Subject como Observable
  }
}