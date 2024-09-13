import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor(private dbService: NgxIndexedDBService) { }

  addTask(task: any) {
    const taskWithTimestamp = {
      ...task,
      timestamp: new Date().toLocaleString() // O usa un valor único específico
    };
    
    this.dbService.add('tasks', taskWithTimestamp).subscribe({
      next: () => {
      },
      error: (err) => {
      }
    });
  }

  getAllTasks() {
    return this.dbService.getAll('tasks');
  }

  deleteTask(id: string) {
    return this.dbService.delete('tasks', id);
  }
}