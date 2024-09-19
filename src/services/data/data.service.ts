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

  sort(array: any[]): void {
    // Primero, obtenemos los últimos 3 sorteos de la base de datos
    this.dbServ.getLastThreeSorts().subscribe({
      next: (lastThreeSorts) => {
        console.log('Últimos 3 sorteos:', lastThreeSorts);
  
        const isSelectionInLastThree = (selected: any[], actividadName: string): boolean => {
          for (const task of lastThreeSorts) {
            for (const key of Object.keys(task)) {
              const actividad = task[key];
              const elegidos = actividad.elegidos;
  
              if (actividad.name === actividadName && Array.isArray(elegidos)) {
                console.log(`Actividad: ${actividad.name}`);
                for (const elegido of selected) {
                  console.log(`Verificando al elegido: ${elegido.name}`);
                  const isRepeated = elegidos.some((taskElegido: any) => taskElegido.name === elegido.name);
                  if (isRepeated) {
                    console.log('ELEGIDO REPETIDO');
                    return true; // Retornamos true si hay un elegido repetido
                  }
                }
              }
            }
          }
          return false; // Retornamos false si no hay repetidos
        };
  
        // Función para realizar el sorteo desde una actividad específica
        const performSortFromActivity = (activityIndex: number): void => {
          let sortedIndex = 0;
  
          // Verificamos que 'this.sorted' es un array válido antes de continuar
          if (!Array.isArray(this.sorted)) {
            console.error('Error: this.sorted no es un array válido.');
            return;
          }
  
          const totalParticipants = this.sorted.length;
  
          // Iteramos a partir de la actividad actual para evitar reordenar todas
          for (let i = activityIndex; i < this.activities.length; i++) {
            const activity = this.activities[i];
            let numElegidos = 2;
            if (['Jugos y agradece', 'Levanta y barre', 'Lista'].includes(activity.name)) {
              numElegidos = 1;
            }
  
            const selected = this.sorted.slice(sortedIndex, sortedIndex + numElegidos);
  
            // Verificamos que la selección es un array válido
            if (!Array.isArray(selected) || selected.length === 0) {
              console.error(`Error: selección inválida en la actividad ${activity.name}`);
              return;
            }
  
            if (isSelectionInLastThree(selected, activity.name)) {
              // Si la selección está en los últimos 3 sorteos, solo reordenamos a partir de esta actividad
              console.warn(`Selección repetida en ${activity.name}, volviendo a sortear.`);
              shuffleArray(this.sorted); // Reordenamos solo el array completo
              performSortFromActivity(i); // Vuelvo a realizar el sorteo para esta actividad
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
          }
  
          // Guardamos las actividades en IndexedDB
          this.dbServ.addTask(this.activities).subscribe({
            next: () => {
              console.log('Nuevo sorteo guardado correctamente');
            },
            error: (err) => {
              console.error('Error al guardar el sorteo:', err);
            }
          });
        };
  
        // Función para hacer el shuffle del array
        const shuffleArray = (arrayToShuffle: any[]): void => {
          for (let i = arrayToShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
          }
        };
  
        // Realizamos el shuffle inicial del array
        shuffleArray(array);
  
        // Inicializamos this.sorted con el array barajado
        this.sorted = array;
  
        // Comenzamos el sorteo desde la primera actividad
        performSortFromActivity(0);
  
      }, // Cierre de next
      error: (err) => {
        console.error('Error al obtener los últimos 3 sorteos:', err);
      }
    });
  }
       /* return lastThreeTasks.some(task => {
          console.log(task)
          task.activities && task.activities.some((activity: any) => {
            activity.elegidos && activity.elegidos.some((elegido: any) =>
              selected.includes(elegido)
            )}
          ) }
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
    });*/
  
  

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
