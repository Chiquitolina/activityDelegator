import { inject, Injectable } from '@angular/core';
import { Activity } from '../../models/Activity.model';
import { Participant } from '../../models/Participants.model';
import { IndexedDBService } from '../db/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  //this array will contain the final sorted activities list
  sorted!: any[];

  dbServ = inject(IndexedDBService);

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
      color: 'Tomato',
    },
    {
      id: 1,
      name: 'Anabella',
      realname: 'Anabella Di Cosmo',
      color: 'blue',
    },
   /* {
      id: 2,
      name: 'Brian',
      realname: 'Brian Jones',
      color: 'Chocolate',
    },*/
    {
      id: 2,
      name: 'Anto ♑',
      realname: 'Antonela Deleba',
      color: 'DarkOliveGreen',
    },
    {
      id: 3,
      name: 'Brenda',
      realname: 'Brenda Sernoqui',
      color: 'grey',
    },
    {
      id: 4,
      name: 'Martín',
      realname: 'Martín Fernandez',
      color: 'black',
    },
    {
      id: 5,
      name: 'Tate',
      realname: 'Juan Carlos Lescano',
      color: 'LightSlateGray',
    },
    {
      id: 6,
      name: 'Pato',
      realname: 'Patricio Miranda',
      color: 'pink',
    },
    {
      id: 7,
      name: 'Ramiro',
      realname: 'Ramiro Gonzalez',
      color: 'violet',
    },
    {
      id: 8,
      name: 'Marcelo',
      realname: 'Marcelo García',
      color: 'LightSlateGray',
    },
    {
      id: 9,
      name: 'Julieta',
      realname: 'Julieta Draghi',
      color: 'coral',
    },
    {
      id: 10,
      name: 'Juan Pablo',
      realname: 'Juan Pablo Benito',
      color: 'Peru',
    },
    {
      id: 11,
      name: 'Esteban',
      realname: 'Esteban Perafán',
      color: 'indigo',
    },
    {
      id: 12,
      name: 'Gustavo',
      realname: 'Gustavo Governatore',
      color: 'lime',
    },
    {
      id: 13,
      name: 'Nacho',
      realname: 'Ignacio Broda',
      color: 'magenta',
    },
    {
      id: 14,
      name: 'Lucas',
      realname: 'Lucas Quevedo',
      color: 'olive',
    },
    {
      id: 15,
      name: 'Franco',
      realname: 'Franco Circo',
      color: 'plum',
    },
    {
      id: 16,
      name: 'Federico',
      realname: 'Federico Locret',
      color: 'salmon',
    },
    {
      id: 17,
      name: 'Tony',
      realname: 'Antonio Fernandez',
      color: 'tan',
    },
    {
      id: 18,
      name: 'Pablo',
      realname: 'Pablo Pedemonte',
      color: 'YellowGreen',
    },
    {
      id: 19,
      name: 'Mauri',
      realname: 'Mauricio',
      color: 'Wheat',
    },
    {
      id: 20,
      name: 'Cami',
      realname: 'Camila',
      color: 'LightGreen',
    },
    {
      id: 21,
      name: 'Maxi',
      realname: 'Maxi',
      color: 'DarkSlateBlue',
    },
    {
      id: 22,
      name: 'Román',
      realname: 'Román',
      color: 'DodgerBlue',
    },
    {
      id: 23,
      name: 'Leonel',
      realname: 'Leonel',
      color: 'MidnightBlue',
    },
  ];

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

  addParticipant(value: string): void {
    let newParticipant = {
      id: this.participants[this.participants.length - 1].id + 1,
      name: value,
      realname: value,
      color: '',
    };
    this.participants.push(newParticipant);
  }

  // function to check if the participants selected by the algorithm were included in the last three assignments for the same activity.
  private isSelectionInLastThree(
    selected: any[],
    actividadName: string,
    lastThreeSorts: any[]
  ): boolean {
    return lastThreeSorts.some((task) =>
      Object.values(task).some((actividad: any) => {
        const elegidos = actividad.elegidos || [];
        if (actividad.name === actividadName) {
         /* console.log(`Actividad: ${actividad.name}`);*/
          return selected.some((elegido) => {
            console.log(`Verificando al elegido: ${elegido.name}`);
            const isRepeated = elegidos.some(
              (taskElegido: any) => taskElegido.name === elegido.name
            );
            if (isRepeated) {
              console.log('ELEGIDO REPETIDO');
            }
            return isRepeated;
          });
        }
        return false;
      })
    );
  }

  //function to shuffle array elements
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
      /*  console.log('Últimos 3 sorteos:', lastThreeSorts);*/

        this.cleanActivities();

        const performSortFromActivity = (
          activityIndex: number,
          sortedIndex: number,
          retryCount = 0
        ): void => {
          if (!Array.isArray(this.sorted)) {
          /*  console.error('Error: this.sorted no es un array válido.');*/
            return;
          }

          const totalParticipants = this.sorted.length;
          if (totalParticipants === 0) {
            console.warn('No hay más participantes disponibles.');
            return; // stop fn here if there is no more remaining participants
          }

          for (let i = activityIndex; i < this.activities.length; i++) {
            const activity = this.activities[i];
            let numElegidos = 2;
            if (
              ['Jugos y agradece', 'Levanta y barre', 'Lista'].includes(
                activity.name
              )
            ) {
              numElegidos = 1;
            }

            //verify if there are any remaining participants.
            if (this.sorted.length < numElegidos) {
              console.warn(
                `No hay suficientes participantes para ${activity.name}.`
              );
            }

            const selected = this.sorted.slice(0, numElegidos); //takes selected

            if (
              this.isSelectionInLastThree(
                selected,
                activity.name,
                lastThreeSorts
              )
            ) {
              if (retryCount > 20) {
                console.error(
                  `Intentos máximos alcanzados para ${activity.name}, asignando participantes sin verificar repetición.`
                );
                activity.elegidos = selected;
                this.sorted = this.sorted.slice(numElegidos); //remove selected participants
                continue;
              }

              console.warn(
                `Selección repetida en ${
                  activity.name
                }, volviendo a sortear (intento ${retryCount + 1}).`
              );
              this.shuffleArray(this.sorted); //shuffle array
              performSortFromActivity(i, sortedIndex, retryCount + 1); //call recursively, updating the retry count on each attempt.

              return;
            }

            activity.elegidos = selected;

            this.sorted = this.sorted.slice(numElegidos);

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

        //copy and shuffle original array
        const arrayCopy = [...array];
        this.shuffleArray(arrayCopy);
        this.sorted = arrayCopy;

        //start sort from 0
        performSortFromActivity(0, 0);
      },
      error: (err) => {
        console.error('Error al obtener los últimos 3 sorteos:', err);
      },
    });
  }

  cleanActivities() {
    this.activities.forEach((activity: Activity) => {
      activity.elegidos = [];
    });
  }
}
