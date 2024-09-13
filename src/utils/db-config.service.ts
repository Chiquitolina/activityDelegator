import { Injectable } from '@angular/core';
import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'tasks',
    storeConfig: { keyPath: 'timestamp', autoIncrement: false },
    storeSchema: [
      { name: 'timestamp', keypath: 'timestamp', options: { unique: true } },
      { name: 'tasks', keypath: 'tasks', options: { unique: false } }
    ]
  }]
};

@Injectable({
  providedIn: 'root'
})
export class DbConfigService {

  constructor() { }
  
}
