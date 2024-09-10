import { Component } from '@angular/core';
import { ListComponentComponent } from '../list-component/list-component.component';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [ListComponentComponent],
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.scss'
})
export class ParticipantsListComponent extends ListComponentComponent {

}
