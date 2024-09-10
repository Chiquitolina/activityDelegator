import { Injectable } from '@angular/core';
import { Activity } from '../models/Activity.model';
import { Participant } from '../models/Participants.model';

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
    },
    {
      id: 8,
      name: 'Lista',
      elegidos: []
    },
  ]

  participants: Participant[] = [
    {
      id: 0,
      name: '👑 Chiqui 👑',
      realname: 'Alejandro Godino'
    },
    {
      id: 1,
      name: 'Anabella',
      realname: 'Anabella Di Cosmo'
    },
    {
      id: 2,
      name: 'Brian',
      realname: 'Brian Jones'
    },
    {
      id: 3,
      name: 'Antonela',
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
      realname: 'Franco'
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
    }



]

  constructor() { }

  
  removeActivity(activity: Activity, selectedActivity: Activity) : void {
    this.activities = this.activities.filter(c => c !== activity);
    if (selectedActivity === activity) {
      selectedActivity = null!;
    }
    console.log(this.activities)
  }

  removeParticipant(participant: Participant, selectedParticipant: Participant) : void {
    this.participants = this.participants.filter(c => c !== participant);
    if (selectedParticipant === participant) {
      selectedParticipant = null!;
    }
  }

  sort(array: any) : void {
    const arrayCopy = [...array];
    
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    this.sorted = arrayCopy

    let sortedIndex = 0; // Índice inicial para recorrer this.sorted
    let totalParticipants = this.sorted.length; // Total de participantes disponibles
    
    this.activities.forEach((activity) => {
      let numElegidos = 2; // Por defecto, asignamos 2 participantes
      if (activity.name === 'Jugos y agradece' || activity.name === 'Levanta y barre' || activity.name === 'Lista') {
        numElegidos = 1; // Estas actividades solo requieren 1 participante
      }
    
      // Asegura que no se exceda el número de participantes disponibles
      if (sortedIndex + numElegidos <= totalParticipants) {
        activity.elegidos = this.sorted.slice(sortedIndex, sortedIndex + numElegidos);
        sortedIndex += numElegidos;
      } else {
        // Si no hay suficientes participantes para asignar a esta actividad, asigna lo que queda
        activity.elegidos = this.sorted.slice(sortedIndex, totalParticipants);
        sortedIndex = totalParticipants; // Asegura que no se intente asignar más participantes
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

 /* addParticipant(value: string) : void {
    let newParticipant = {
      id: this.participants[this.participants.length-1].id+1,
      name: value
    }
    this.participants.push(newParticipant)
  }*/


}
