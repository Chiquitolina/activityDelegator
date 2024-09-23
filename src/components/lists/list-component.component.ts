import { Component, Input, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { DataService } from '../../services/data/data.service';
import { Participant } from '../../models/Participants.model';
import { Activity } from '../../models/Activity.model';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [ListboxModule],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent {

  @Input() arrayIterate: any = []
  @Output() buttonClick = new EventEmitter<{ item: any, selectedItem: any }>();

  selectedItem!: Participant | Activity;

  constructor(public dataServ: DataService,
  ) {}

  onClick(item: any, selectedItem: any) {
    // Emitimos el objeto al padre
    this.buttonClick.emit({ item, selectedItem });
  }

}
