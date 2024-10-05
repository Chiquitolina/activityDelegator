import { Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { IndexedDBService } from '../../services/db/indexed-db.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [ChartModule, CommonModule, CardModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss',
})
export class GraphsComponent {

  data: any;

  //activities array
  activityCountsArray: any[] = [];
  
  //data by activity
  activityData: { [key: string]: any } = {};
  
  //graph configuration
  options: any = {};

  dataServ = inject(DataService)
  _dbServ = inject(IndexedDBService)
  private _tasksUpdateSub!: Subscription;

  ngOnInit() {
    this._dbServ.getAllTasks().subscribe({
      next: (tasks) => {
        const activityData: { [key: string]: { [key: string]: number } } = {};

        tasks.forEach((task: any) => {
          Object.values(task).forEach((activity: any) => {
            if (!activity.name) {
              console.warn('Actividad sin nombre:', activity);
              return;
            }

            // Inicializa el objeto para la actividad
            if (!activityData[activity.name]) {
              activityData[activity.name] = {};
            }

            // Recorre los "elegidos" de cada actividad
            activity.elegidos?.forEach((elegido: any) => {
              const elegidoName = elegido.name;

              if (!activityData[activity.name][elegidoName]) {
                activityData[activity.name][elegidoName] = 0;
              }

              activityData[activity.name][elegidoName]++;
            });
          });
        });

        // Construir datasets para cada actividad
        Object.entries(activityData).forEach(([activityName, elegidos]) => {
          this.activityCountsArray.push({ name: activityName });

          // Obtener los colores de los participantes
          const participantColors = Object.keys(elegidos).map((elegidoName) => {
            const participant = this.dataServ.participants.find(
              (p: any) => p.name === elegidoName
            );
            return participant ? participant.color : '#000000'; // Color por defecto si no se encuentra
          });

          this.activityData[activityName] = {
            labels: Object.keys(elegidos),
            datasets: [
              {
                data: Object.values(elegidos),
                backgroundColor: participantColors,
                hoverBackgroundColor: participantColors.map((color) =>
                  this.darkenColor(color)
                ),
              },
            ],
          };
        });

        console.log('Datos para cada actividad:', this.activityData);
      },
      error: (err) => {
        console.error('Error al obtener las tareas:', err);
      },
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          position: 'right', 
          labels: {
            usePointStyle: true, 
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false 
    };
  }

  darkenColor(color: string): string {
    return color; // Aquí podrías agregar lógica para oscurecer el color si es necesario
  }
  
}
