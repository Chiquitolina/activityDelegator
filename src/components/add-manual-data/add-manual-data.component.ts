
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataService } from '../../services/data/data.service';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-add-manual-data',
  standalone: true,
  imports: [InputGroupModule, InputGroupAddonModule, FieldsetModule, AvatarModule, InputTextModule, FormsModule, ButtonModule, MultiSelectModule],
  templateUrl: './add-manual-data.component.html',
  styleUrl: './add-manual-data.component.scss'
})
export class AddManualDataComponent {

  constructor(public dataServ: DataService) {}

}
