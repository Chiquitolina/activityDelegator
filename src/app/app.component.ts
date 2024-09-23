import {
  Component,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DataService } from '../services/data/data.service';
import { Activity } from '../models/Activity.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { Participant } from '../models/Participants.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HistoricDataComponent } from '../components/historic-data/historic-data.component';
import { DialogModule } from 'primeng/dialog';
import { ListComponentComponent } from '../components/lists/list-component.component';
import { ButtonComponent } from '../components/button/button.component';
interface Actividad {
  name: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HistoricDataComponent,
    ListComponentComponent,
    ButtonComponent,
    DialogModule,
    RouterOutlet,
    ListboxModule,
    FormsModule,
    ButtonModule,
    MatFormFieldModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    MultiSelectModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  title = 'angular-electron-app';

  @ViewChild('printSection') printSection!: ElementRef;

  dialog: boolean = false;

  activityInputValue: string = '';
  participantInputValue: string = '';

  selectedActivity!: Activity;
  selectedParticipant!: Participant;

  personas!: any[];

  constructor(
    public dataServ: DataService,
    private messageService: MessageService
  ) {}

  showDialog() {
    this.dialog = true;
  }

  addParticipantAndClear() {
    if (this.participantInputValue.trim()) {
      this.dataServ.addParticipant(this.participantInputValue);
      this.showToast(
        this.participantInputValue,
        'success',
        'Operación exitosa',
        `Participante ${this.participantInputValue} añadido con éxito.`
      );
      this.participantInputValue = ''; // Limpiar el campo después de agregar
    }
  }

  showToast(value: string, severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  /*  addActivityAndClear() {
    if (this.activityInputValue.trim()) {
      this.dataServ.addActivity(this.activityInputValue);
      this.showToast(this.activityInputValue, 'success', 'Operación exitosa', `Actividad ${this.activityInputValue} añadida con éxito.`)
      this.activityInputValue = '';
    }
  }*/

  removeActivityAndShowToast(item: any, selectedActivity: any) {
    this.dataServ.removeActivity(item, selectedActivity);
    this.showToast(
      item.name,
      'success',
      'Operación exitosa',
      `Actividad ${item.name} removida con éxito.`
    );
  }

  removeParticipantAndShowToast(item: any, selectedParticipant: any) {
    this.dataServ.removeParticipant(item, selectedParticipant);
    this.showToast(
      item.name,
      'success',
      'Operación exitosa',
      `Participante ${item.name} removido con éxito.`
    ); // Asumiendo que `selectedActivity` tiene una propiedad `name`
  }

  print() {
    const printContent = this.printSection.nativeElement.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              @page {
            size: A4 portrait; /* Cambia a 'landscape' para horizontal */
          }
              /* Aquí puedes agregar estilos personalizados para la impresión */
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);

      printWindow.document.close(); // Cerrar el documento para completar su escritura
      printWindow.focus(); // Enfocar la nueva ventana para la impresión
      printWindow.print(); // Ejecutar la impresión
      printWindow.close(); // Cerrar la ventana después de la impresión
    }
  }
}
