import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {

  private $tasksUpdated = new Subject<void>(); // Subject para emitir actualizaciones

  private _dbServ = inject(NgxIndexedDBService)

  addTask(task: any): Observable<any> {
    const taskWithTimestamp = {
      ...task,
      timestamp: new Date().toISOString(),
    };

    return this._dbServ.add('tasks', taskWithTimestamp).pipe(
      tap(() => this.$tasksUpdated.next())
    );
  }

  getAllTasks(): Observable<any[]> {
    return this._dbServ.getAll('tasks');
  }
  
  getLastFourSorts(): Observable<any[]> {
    return this._dbServ.getAll('tasks').pipe(
      map((tasks) => {
        
        const reversedTasks = tasks.reverse();
        return reversedTasks.slice(0, 4); /*now 4*/
      })
    );
  }

  deleteTask(timestamp: string): Observable<any> {
    return this._dbServ.delete('tasks', timestamp);
  }

  getTasksUpdateListener() {
    return this.$tasksUpdated.asObservable();
  }
}
