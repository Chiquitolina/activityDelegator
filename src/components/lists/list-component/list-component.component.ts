import { Component } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [ListboxModule],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent {

}
