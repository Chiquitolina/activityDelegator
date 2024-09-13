import { Component, Input, OnDestroy } from '@angular/core';
import { IndexedDBService } from '../../services/db/indexed-db.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-historic-data',
  standalone: true,
  imports: [DialogModule, TableModule],
  templateUrl: './historic-data.component.html',
  styleUrl: './historic-data.component.scss',
  providers: []
})
export class HistoricDataComponent {

  tasks!: any[]

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
    }

}
