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
      name: '👑 Chiqui 👑'
    },
    {
      id: 1,
      name: 'Anabella'
    },
    {
      id: 2,
      name: 'Brian'
    },
    {
      id: 3,
      name: 'Antonela'
    },
    {
      id: 4,
      name: 'Brenda'
    },
    {
      id: 5,
      name: 'Max'
    },
    {
      id: 6,
      name: 'Martín'
    },
    {
      id: 7,
      name: 'Tate'
    },
    {
      id: 8,
      name: 'Pato'
    },
    {
      id: 9,
      name: 'Ramiro'
    },
    {
      id: 10,
      name: 'Marcelo'
    },
    {
      id: 11,
      name: 'Julieta'
    },
    {
      id: 12,
      name: 'Victor'
    },
    {
      id: 13,
      name: 'Juan Pablo'
    },
    {
      id: 14,
      name: 'Esteban'
    },
    {
      id: 15,
      name: 'Gustavo'
    },
    {
      id: 16,
      name: 'Nacho'
    },
    {
      id: 17,
      name: 'Lucas'
    },
    {
      id: 18,
      name: 'Franco'
    },
    {
      id: 19,
      name: 'Federico'
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

    this.activities.forEach((activity, index) => {
      if (activity.name === 'Jugos y agradece' || activity.name === 'Levanta y barre' || activity.name === 'Lista') {
        activity.elegidos = this.sorted.slice(index * 2, index * 2 + 1);
      } else {
      activity.elegidos = this.sorted.slice(index * 2, index * 2 + 2);
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
      name: value
    }
    this.participants.push(newParticipant)
  }


}
