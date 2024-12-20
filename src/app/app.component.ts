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
import { DialogComponent } from '../components/dialog/dialog.component';
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
    DialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  title = 'angular-electron-app';

  @ViewChild('printSection') printSection!: ElementRef;

  dialog: boolean = false;
  dialogType: string = 'historic-data'; // Tipo de diálogo

  activityInputValue: string = '';
  participantInputValue: string = '';

  selectedActivity!: Activity;
  selectedParticipant!: Participant;

  personas!: any[];

  countdown = 4;
  showCountdown: boolean = false; // Variable para controlar la visibilidad

  constructor(
    public dataServ: DataService,
    private messageService: MessageService
  ) {}

  startSort() {
   /* this.countdown = 4;

    const countdownInterval = setInterval(() => {
      console.log('Cuenta regresiva:', this.countdown); // Puedes mostrar esto en la vista si prefieres

      this.showCountdown = true;

      this.countdown--; // Reduce el valor de la cuenta regresiva

      if (this.countdown <= 0) {
        clearInterval(countdownInterval); // Detén el intervalo cuando llegue a 0*/

        // Llamada a la función `newSort` después del countdown
        this.dataServ.newSort(this.dataServ.participants);
       /* this.showCountdown = false;*/
      }
  /*  }, 1000); // Intervalo de 1 segundo*/
/*}*/

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

  closeDialog() {
    this.dialog = false;
    console.log('Diálogo cerrado. Estado de la variable dialog:', this.dialog);
  }

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
