import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private tasksUpdated = new Subject<void>(); // Subject para emitir actualizaciones

  constructor(private dbService: NgxIndexedDBService) {}

  addTask(task: any): Observable<any> {
    const taskWithTimestamp = {
      ...task,
      timestamp: new Date().toLocaleString(),
    };

    return this.dbService.add('tasks', taskWithTimestamp).pipe(
      tap(() => this.tasksUpdated.next())
    );
  }

  getAllTasks(): Observable<any[]> {
    return this.dbService.getAll('tasks');
  }
  
  getLastThreeSorts(): Observable<any[]> {
    return this.dbService.getAll('tasks').pipe(
      map((tasks) => {
        
        const reversedTasks = tasks.reverse();
        return reversedTasks.slice(0, 3);
      })
    );
  }

  deleteTask(timestamp: string): Observable<any> {
    return this.dbService.delete('tasks', timestamp);
  }

  getTasksUpdateListener() {
    return this.tasksUpdated.asObservable();
  }
}
