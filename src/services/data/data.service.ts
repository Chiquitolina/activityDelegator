import { Injectable } from '@angular/core';
import { Activity } from '../../models/Activity.model';
import { Participant } from '../../models/Participants.model';
import { IndexedDBService } from '../db/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sorted!: any[];

  activities: Activity[] = [
    {
      id: 0,
      name: 'Compras',
      participants: 2,
      elegidos: [],
    },
    {
      id: 1,
      name: 'Cocina',
      participants: 2,
      elegidos: [],
    },
    {
      id: 2,
      name: 'Lava',
      participants: 2,
      elegidos: [],
    },
    {
      id: 3,
      name: 'Levanta y barre',
      participants: 1,
      elegidos: [],
    },
    {
      id: 4,
      name: 'Cierra cocina',
      participants: 2,
      elegidos: [],
    },
    {
      id: 5,
      name: 'Pone la mesa',
      participants: 2,
      elegidos: [],
    },
    {
      id: 6,
      name: 'Jugos y agradece',
      participants: 1,
      elegidos: [],
    },
    {
      id: 7,
      name: 'Mozos',
      participants: 2,
      elegidos: [],
    },
  ];

  participants: Participant[] = [
    {
      id: 0,
      name: 'Chiqui 👑',
      realname: 'Alejandro Godino',
      color: 'Tomato'
    },
    {
      id: 1,
      name: 'Anabella',
      realname: 'Anabella Di Cosmo',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Brian',
      realname: 'Brian Jones',
      color: 'Chocolate'
    },
    {
      id: 3,
      name: 'Anto ♑',
      realname: 'Antonela Deleba',
      color: 'DarkOliveGreen'
    },
    {
      id: 4,
      name: 'Brenda',
      realname: 'Brenda Sernoqui',
      color: 'grey'
    },
    {
      id: 5,
      name: 'Max',
      realname: 'Max Baltzer',
      color: 'green'
    },
    {
      id: 6,
      name: 'Martín',
      realname: 'Martín Fernandez',
      color: 'black'
    },
    {
      id: 7,
      name: 'Tate',
      realname: 'Juan Carlos Lescano',
      color: 'LightSlateGray'
    },
    {
      id: 8,
      name: 'Pato',
      realname: 'Patricio Miranda',
      color: 'pink'
    },
    {
      id: 9,
      name: 'Ramiro',
      realname: 'Ramiro Gonzalez',
      color: 'violet'
    },
    {
      id: 10,
      name: 'Marcelo',
      realname: 'Marcelo García',
      color: 'LightSlateGray'
    },
    {
      id: 11,
      name: 'Julieta',
      realname: 'Julieta Draghi',
      color: 'coral'
    },
    {
      id: 12,
      name: 'Victor',
      realname: 'Victor Ortiz',
      color: 'CadetBlue'
    },
    {
      id: 13,
      name: 'Juan Pablo',
      realname: 'Juan Pablo Benito',
      color: 'Peru'
    },
    {
      id: 14,
      name: 'Esteban',
      realname: 'Esteban Perafán',
      color: 'indigo'
    },
    {
      id: 15,
      name: 'Gustavo',
      realname: 'Gustavo Governatore',
      color: 'lime'
    },
    {
      id: 16,
      name: 'Nacho',
      realname: 'Ignacio Broda',
      color: 'magenta'
    },
    {
      id: 17,
      name: 'Lucas',
      realname: 'Lucas Quevedo',
      color: 'olive'
    },
    {
      id: 18,
      name: 'Franco',
      realname: 'Franco Circo',
      color: 'plum'
    },
    {
      id: 19,
      name: 'Federico',
      realname: 'Federico Locret',
      color: 'salmon'
    },
    {
      id: 20,
      name: 'Tony',
      realname: 'Antonio Fernandez',
      color: 'tan'
    },
    {
      id: 21,
      name: 'Pablo',
      realname: 'Pablo Pedemonte',
      color: 'YellowGreen'
    },
    {
      id: 22,
      name: 'Mauri',
      realname: 'Mauricio',
      color: 'Wheat'
    },
    {
      id: 23,
      name: 'Cami',
      realname: 'Camila',
      color: 'LightGreen'
    },
  ];

  constructor(private dbServ: IndexedDBService) {}

  removeActivity(activity: Activity, selectedActivity: Activity): void {
    this.activities = this.activities.filter((c) => c !== activity);
    if (selectedActivity === activity) {
      selectedActivity = null!;
    }
  }

  removeParticipant(
    participant: Participant,
    selectedParticipant: Participant
  ): void {
    this.participants = this.participants.filter((c) => c !== participant);
    if (selectedParticipant === participant) {
      selectedParticipant = null!;
    }
  }

 /* addActivity(value: string): void {
    let newActivity = {
      id: this.activities[this.activities.length - 1].id + 1,
      name: value,
      elegidos: [],
    };
    this.activities.push(newActivity);
  }*/

  addParticipant(value: string): void {
    let newParticipant = {
      id: this.participants[this.participants.length - 1].id + 1,
      name: value,
      realname: value,
      color: ''
    };
    this.participants.push(newParticipant);
  }

  // Función para verificar si los seleccionados están en los últimos 3 sorteos
  private isSelectionInLastThree(
    selected: any[],
    actividadName: string,
    lastThreeSorts: any[]
  ): boolean {
    for (const task of lastThreeSorts) {
      for (const key of Object.keys(task)) {
        const actividad = task[key];
        const elegidos = actividad.elegidos;

        if (actividad.name === actividadName && Array.isArray(elegidos)) {
          console.log(`Actividad: ${actividad.name}`);
          for (const elegido of selected) {
            console.log(`Verificando al elegido: ${elegido.name}`);
            const isRepeated = elegidos.some(
              (taskElegido: any) => taskElegido.name === elegido.name
            );
            if (isRepeated) {
              console.log('ELEGIDO REPETIDO');
              return true; // Retornamos true si hay un elegido repetido
            }
          }
        }
      }
    }
    return false; // Retornamos false si no hay repetidos
  }

  // Función para hacer el shuffle del array
  private shuffleArray(arrayToShuffle: any[]): void {
    for (let i = arrayToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayToShuffle[i], arrayToShuffle[j]] = [
        arrayToShuffle[j],
        arrayToShuffle[i],
      ];
    }
  }

  sort(array: any[]): void {
    this.dbServ.getLastThreeSorts().subscribe({
      next: (lastThreeSorts) => {
        console.log('Últimos 3 sorteos:', lastThreeSorts);
  
        this.cleanActivities();
  
        const performSortFromActivity = (activityIndex: number, sortedIndex: number, retryCount = 0): void => {
          if (!Array.isArray(this.sorted)) {
            console.error('Error: this.sorted no es un array válido.');
            return;
          }
  
          const totalParticipants = this.sorted.length;
          if (totalParticipants === 0) {
            console.warn('No hay más participantes disponibles.');
            return; // Detener si no hay más participantes
          }
  
          for (let i = activityIndex; i < this.activities.length; i++) {
            const activity = this.activities[i];
            let numElegidos = 2;
            if (['Jugos y agradece', 'Levanta y barre', 'Lista'].includes(activity.name)) {
              numElegidos = 1;
            }
  
            // Verificar si hay suficientes participantes para asignar
            if (this.sorted.length < numElegidos) {
              console.warn(`No hay suficientes participantes para ${activity.name}.`);
            }
  
            const selected = this.sorted.slice(0, numElegidos); // Tomar los primeros seleccionados
  
            if (this.isSelectionInLastThree(selected, activity.name, lastThreeSorts)) {
              if (retryCount > 20) {
                console.error(`Intentos máximos alcanzados para ${activity.name}, asignando participantes sin verificar repetición.`);
                activity.elegidos = selected; // Asignar participantes sin verificar
                this.sorted = this.sorted.slice(numElegidos); // Eliminar los seleccionados
                continue;
              }
  
              console.warn(`Selección repetida en ${activity.name}, volviendo a sortear (intento ${retryCount + 1}).`);
              this.shuffleArray(this.sorted); // Reordena todo el array
              performSortFromActivity(i, sortedIndex, retryCount + 1); // Llama recursivamente, pero incrementando el contador de intentos
              return;
            }
  
            // Asigna los seleccionados a la actividad
            activity.elegidos = selected;
  
            // Elimina los seleccionados de 'this.sorted' para que no se repitan
            this.sorted = this.sorted.slice(numElegidos);
  
            // Actualiza el índice sortedIndex
            sortedIndex += numElegidos;
  
            if (this.sorted.length === 0) {
              console.warn('No hay más participantes disponibles.');
              break;
            }
          }
  
          this.dbServ.addTask(this.activities).subscribe({
            next: () => {
              console.log('Nuevo sorteo guardado correctamente');
            },
            error: (err) => {
              console.error('Error al guardar el sorteo:', err);
            },
          });
        };
  
        // Copia y mezcla del array original
        const arrayCopy = [...array];
        this.shuffleArray(arrayCopy);
        this.sorted = arrayCopy;
  
        // Inicia el sorteo desde la primera actividad y el índice 0
        performSortFromActivity(0, 0);
      },
      error: (err) => {
        console.error('Error al obtener los últimos 3 sorteos:', err);
      },
    });
  }

  cleanActivities() {
    this.activities.forEach((activity: Activity) => {
      activity.elegidos = []
    })
  }

}
