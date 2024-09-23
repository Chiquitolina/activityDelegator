import { Component, Input, OnDestroy } from '@angular/core';
import { IndexedDBService } from '../../services/db/indexed-db.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddManualDataComponent } from '../add-manual-data/add-manual-data.component';
import { GraphsComponent } from '../graphs/graphs.component';

@Component({
  selector: 'app-historic-data',
  standalone: true,
  imports: [DialogModule, ButtonModule, TableModule, CommonModule, GraphsComponent, AddManualDataComponent],
  templateUrl: './historic-data.component.html',
  styleUrl: './historic-data.component.scss',
  providers: []
})
export class HistoricDataComponent {

  dialog: boolean = false;
  dialogGraph: boolean = false;

  tasks!: any[]
  private tasksUpdateSub!: Subscription;


    constructor(
                private dbServ: IndexedDBService
    ) {}

    ngOnInit() {

        this.dbServ.getAllTasks().subscribe({
          next: (tasks) => {
            this.tasks = tasks.reverse();
          },
          error: (err) => {
            console.error('Error fetching tasks:', err);
          }
        });

         // Suscribirse al Subject para actualizar la lista cuando se guardan tareas
    this.tasksUpdateSub = this.dbServ.getTasksUpdateListener().subscribe(() => {

      this.dbServ.getAllTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks.reverse();
        },
        error: (err) => {
          console.error('Error fetching tasks:', err);
        }
      });    });
    }

    deleteTask(timestamp: string) {
      this.dbServ.deleteTask(timestamp).subscribe({
        next: () => {
          // Actualiza el array local solo después de que la tarea ha sido eliminada
          this.tasks = this.tasks.filter(task => task.timestamp !== timestamp);
        },
        error: (err) => {
        }
      });
    }

    showDialog() {
      this.dialog = true;
  }

  showDialogGraph() {
    this.dialogGraph = true;
}

}
