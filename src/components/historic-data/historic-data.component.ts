import { Component, inject, Input, OnDestroy } from '@angular/core';
import { IndexedDBService } from '../../services/db/indexed-db.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddManualDataComponent } from '../add-manual-data/add-manual-data.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { ButtonComponent } from '../button/button.component';
import { AppComponent } from '../../app/app.component';
import { DataService } from '../../services/data/data.service';
import { Activity } from '../../models/Activity.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-historic-data',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    TableModule,
    CommonModule,
    GraphsComponent,
    AddManualDataComponent,
    ButtonComponent,
    AppComponent,
    DialogComponent,
  ],
  templateUrl: './historic-data.component.html',
  styleUrl: './historic-data.component.scss',
  providers: [],
})
export class HistoricDataComponent {
  tableTitles!: any[];

  dialog: boolean = false;
  dialogGraph: boolean = false;

  tasks!: any[];
  private _tasksUpdateSub!: Subscription;

  private _dataServ = inject(DataService);
  private _dbServ = inject(IndexedDBService);
  private _appComp = inject(AppComponent);

  ngOnInit() {
    this.tableTitles = this._dataServ.activities.map((activity: Activity) => ({
      id: activity.id,
      name: activity.name,
    }));

    this._dbServ.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks
          .map((task) => {
            // Verificamos si la fecha está en formato `toLocaleString()`
            let parsedTimestamp = task.timestamp;

            // Si contiene '/', asumimos que es un formato `toLocaleString()`
            if (task.timestamp.includes('/')) {
              const isoDate = this.parseLocaleStringToISO(task.timestamp);
              if (isoDate) {
                parsedTimestamp = isoDate; // Reemplazamos el timestamp con el valor ISO
              }
            }

            return {
              ...task,
              timestamp: parsedTimestamp, // Asignamos el nuevo timestamp (ISO si fue convertido)
            };
          })
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          .reverse(); // Ordenamos por fecha (ISO)

        console.log(this.tasks); // Mostrar las tareas convertidas y ordenadas
      },
      error: (err) => {
        console.error('Error al obtener las tareas:', err);
      },
    });

    this._tasksUpdateSub = this._dbServ
      .getTasksUpdateListener()
      .subscribe(() => {
        this._dbServ.getAllTasks().subscribe({
          next: (tasks) => {
            this.tasks = tasks.sort((a, b) => a.timestamp - b.timestamp);
            console.log(tasks);
          },
          error: (err) => {
            console.error('Error fetching tasks:', err);
          },
        });
      });
  }

  deleteTask(timestamp: string) {
    this._dbServ.deleteTask(timestamp).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.timestamp !== timestamp);
        this._appComp.showToast(
          '',
          'success',
          'Operación Exitosa',
          'Dato eliminado correctamente de la historia.'
        );
      },
      error: (err) => {},
    });
  }

  deleteAllTask() {
    this._dbServ.deleteAllTask().subscribe({
      next: () => {
        this._appComp.showToast(
          '',
          'success',
          'Operación Exitosa',
          'Historia vaciada correctamente.'
        );
      },
      error: (err) => {},
    });
  }

  showDialog() {
    this.dialog = true;
  }

  showDialogGraph() {
    this.dialogGraph = true;
  }

  onDialogHide() {
    this.dialog = false;
  }

  onDialogGraphHide() {
    this.dialogGraph = false;
  }

  parseLocaleStringToISO(dateString: string): string | null {
    try {
      // Asumimos el formato "dd/mm/yyyy, hh:mm:ss" para el `toLocaleString()`
      const [datePart, timePart] = dateString.split(', ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);

      // Creamos un objeto Date con los valores obtenidos
      const parsedDate = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds
      );

      // Devolver la fecha en formato ISO
      return parsedDate.toISOString();
    } catch (error) {
      console.error('Error al convertir la fecha:', dateString, error);
      return null; // Devolver null en caso de error
    }
  }
}
