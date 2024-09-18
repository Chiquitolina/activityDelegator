import { Injectable } from '@angular/core';
import { Activity } from '../../models/Activity.model';
import { Participant } from '../../models/Participants.model';
import { IndexedDBService } from '../db/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sorted!: any[];

  activities: Activity[] = [
    {
      id: 0,
      name: 'Compras',
      elegidos: []
    },
    {
      id: 1,
      name: 'Cocina',
      elegidos: []
    },
    {
      id: 2,
      name: 'Lava',
      elegidos: []
    },
    {
      id: 3,
      name: 'Levanta y barre',
      elegidos: []
    },
    {
      id: 4,
      name: 'Cierra cocina',
      elegidos: []
    },
    {
      id: 5,
      name: 'Pone la mesa',
      elegidos: []
    },
    {
      id: 6,
      name: 'Jugos y agradece',
      elegidos: []
    },
    {
      id: 7,
      name: 'Mozos',
      elegidos: []
    }
  ]

  participants: Participant[] = [
    {
      id: 0,
      name: 'Chiqui 👑',
      realname: 'Alejandro Godino'
    },
    {
      id: 1,
      name: 'Anabella',
      realname: 'Anabella Di Cosmo'
    },
  /*  {
      id: 2,
      name: 'Brian',
      realname: 'Brian Jones'
    }*/
    {
      id: 3,
      name: 'Anto ♑',
      realname: 'Antonela Deleba'
    },
    {
      id: 4,
      name: 'Brenda',
      realname: 'Brenda Sernoqui'
    },
    {
      id: 5,
      name: 'Max',
      realname: 'Max Baltzer'
    },
    {
      id: 6,
      name: 'Martín',
      realname: 'Martín Fernandez'
    },
    {
      id: 7,
      name: 'Tate',
      realname: 'Juan Carlos Lescano'
    },
    {
      id: 8,
      name: 'Pato',
      realname: 'Patricio Miranda'
    },
    {
      id: 9,
      name: 'Ramiro',
      realname: 'Ramiro Gonzales'
    },
    {
      id: 10,
      name: 'Marcelo',
      realname: 'Marcelo García'
    },
    {
      id: 11,
      name: 'Julieta',
      realname: 'Julieta Draghi'
    },
    {
      id: 12,
      name: 'Victor',
      realname: 'Victor Ortiz'
    },
    {
      id: 13,
      name: 'Juan Pablo',
      realname: 'Juan Pablo Benito'
    },
    {
      id: 14,
      name: 'Esteban',
      realname: 'Esteban Perafán'
    },
    {
      id: 15,
      name: 'Gustavo',
      realname: 'Gustavo Governatore'
    },
    {
      id: 16,
      name: 'Nacho',
      realname: 'Ignacio Broda'
    },
    {
      id: 17,
      name: 'Lucas',
      realname: 'Lucas Quevedo'
    },
    {
      id: 18,
      name: 'Franco',
      realname: 'Franco Circo'
    },
    {
      id: 19,
      name: 'Federico',
      realname: 'Federico Locret'
    },
    {
      id: 20,
      name: 'Tony',
      realname: 'Antonio Rodriguez'
    },
]

  constructor(private dbServ: IndexedDBService) { }

  
  removeActivity(activity: Activity, selectedActivity: Activity) : void {
    this.activities = this.activities.filter(c => c !== activity);
    if (selectedActivity === activity) {
      selectedActivity = null!;
    }
  }

  removeParticipant(participant: Participant, selectedParticipant: Participant) : void {
    this.participants = this.participants.filter(c => c !== participant);
    if (selectedParticipant === participant) {
      selectedParticipant = null!;
    }
  }

  sort(array: any): void {
    // Primero, obtenemos los últimos 3 sorteos de la base de datos
    this.dbServ.getLastThreeTasks().subscribe({
      next: (lastThreeTasks) => {
        console.log('Últimos 3 sorteos:', lastThreeTasks);
  
        // Función para verificar si la selección actual está en los últimos 3 sorteos
        const isSelectionInLastThree = (selected: any[]): boolean => {
          return lastThreeTasks.some(task =>
            task.activities && task.activities.some((activity:any) =>
              activity.elegidos && activity.elegidos.sort().toString() === selected.sort().toString()
            )
          );
        };
  
        // Función para realizar el sorteo y verificar la unicidad
        const performSort = (): void => {
          const arrayCopy = [...array];
  
          for (let i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
          }
  
          this.sorted = arrayCopy;
  
          let sortedIndex = 0;
          const totalParticipants = this.sorted.length;
  
          this.activities.forEach((activity) => {
            let numElegidos = 2;
            if (activity.name === 'Jugos y agradece' || activity.name === 'Levanta y barre' || activity.name === 'Lista') {
              numElegidos = 1;
            }
  
            const selected = this.sorted.slice(sortedIndex, sortedIndex + numElegidos);
            
            if (isSelectionInLastThree(selected)) {
              // Si la selección está en los últimos 3 sorteos, volvemos a realizar el sorteo
              console.warn(`Selección repetida, volviendo a sortear: ${selected}`);
              performSort();
              return;
            }
  
            if (sortedIndex + numElegidos <= totalParticipants) {
              activity.elegidos = selected;
              sortedIndex += numElegidos;
            } else if (sortedIndex < totalParticipants) {
              activity.elegidos = this.sorted.slice(sortedIndex, totalParticipants);
              sortedIndex = totalParticipants;
              console.warn(`No hay suficientes participantes para la actividad: ${activity.name}`);
            } else {
              activity.elegidos = [];
              console.warn(`No hay participantes disponibles para la actividad: ${activity.name}`);
            }
          });
  
          // Guardamos las actividades en IndexedDB
          this.dbServ.addTask(this.activities).subscribe({
            next: () => {
              console.log('Nuevo sorteo guardado correctamente');
              // Después de guardar, eliminamos el sorteo más antiguo si ya tenemos más de 3
            },
            error: (err) => {
              console.error('Error al guardar el sorteo:', err);
            }
          });
        };
  
        // Realizamos el sorteo inicial
        performSort();
      },
      error: (err) => {
        console.error('Error al obtener los últimos 3 sorteos:', err);
      }
    });
  }
  

  addActivity(value: string) : void {
    let newActivity = {
      id: this.activities[this.activities.length-1].id+1,
      name: value,
      elegidos: []
    }
    this.activities.push(newActivity)
  }

 addParticipant(value: string) : void {
    let newParticipant = {
      id: this.participants[this.participants.length-1].id+1,
      name: value,
      realname: value
    }
    this.participants.push(newParticipant)
    }

}
