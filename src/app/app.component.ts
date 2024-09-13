import { Component, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import {MatFormFieldModule} from '@angular/material/form-field';
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


interface Actividad {
  name: string,
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HistoricDataComponent, DialogModule, RouterOutlet, ListboxModule, FormsModule, ButtonModule, MatFormFieldModule, InputTextModule, FloatLabelModule, ToastModule, MultiSelectModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],

})
export class AppComponent {
  title = 'angular-electron-app';

  @ViewChild('printSection') printSection!: ElementRef;

  dialog: boolean = false;

  value: string = '';
  valuee: string = '';

  selectedActivity!: Activity;
  selectedParticipant!: Participant;

  personas!: any[];

  constructor(public dataServ: DataService,
    private messageService: MessageService
  ) {}

  
  showDialog() {
    this.dialog = true;
}

  addParticipantAndClear() {
    if (this.valuee.trim()) {
      this.dataServ.addParticipant(this.valuee);
      this.showToastt(this.valuee)
      this.valuee = ''; // Limpiar el campo después de agregar
    }
  }

  showToast(value: string) {
    this.messageService.add({
      severity: 'success', // puede ser 'success', 'info', 'warn', 'error'
      summary: 'Operación exitosa',
      detail: `Actividad ${value} agregada con éxito.` ,
    });
  }

  showToastt(value: string) {
    this.messageService.add({
      severity: 'success', // puede ser 'success', 'info', 'warn', 'error'
      summary: 'Operación exitosa',
      detail: `Participante ${value} agregado con éxito.` ,
    });
  }

  showToasttt(value: string) {
    this.messageService.add({
      severity: 'success', // puede ser 'success', 'info', 'warn', 'error'
      summary: 'Operación exitosa',
      detail: `Actividad ${value} removida con éxito.` ,
    });
  }

  showToastttt(value: string) {
    this.messageService.add({
      severity: 'success', // puede ser 'success', 'info', 'warn', 'error'
      summary: 'Operación exitosa',
      detail: `Participante ${value} removido con éxito.` ,
    });
  }

  addActivityAndClear() {
    if (this.value.trim()) {
      this.dataServ.addActivity(this.value);
      this.showToast(this.value)
      this.value = ''; // Limpiar el campo después de agregar la actividad
    }
  }

  removeActivityAndShowToast(item: any, selectedActivity: any) {
    this.dataServ.removeActivity(item, selectedActivity);
    this.showToasttt(item.name); // Asumiendo que `selectedActivity` tiene una propiedad `name`
  }

  
  removeParticipantAndShowToast(item: any, selectedParticipant: any) {
    this.dataServ.removeParticipant(item, selectedParticipant);
    this.showToastttt(item.name); // Asumiendo que `selectedActivity` tiene una propiedad `name`
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
