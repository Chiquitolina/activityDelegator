import { Component } from '@angular/core';
import { ListComponentComponent } from '../list-component/list-component.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [ListComponentComponent],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss'
})
export class ActivityListComponent extends ListComponentComponent {

}
