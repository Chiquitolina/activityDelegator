import { Component, Input, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { DataService } from '../../services/data/data.service';
import { Participant } from '../../models/Participants.model';
import { Activity } from '../../models/Activity.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [ListboxModule, CommonModule, FormsModule, ButtonComponent],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent {

  @Input() arrayIterate: any = []
  @Output() buttonClick = new EventEmitter<{ item: any, selectedItem: any }>();

  selectedItem!: Participant | Activity;

  dataServ = inject(DataService)

  onClick(item: any, selectedItem: any) {
    // Emitimos el objeto al padre
    this.buttonClick.emit({ item, selectedItem });
  }

}
