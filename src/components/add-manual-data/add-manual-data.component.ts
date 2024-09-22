import { Component } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataService } from '../../services/data/data.service';
import { FieldsetModule } from 'primeng/fieldset';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Activity } from '../../models/Activity.model';
import { CommonModule } from '@angular/common';
import { IndexedDBService } from '../../services/db/indexed-db.service';

@Component({
  selector: 'app-add-manual-data',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    ReactiveFormsModule,
    FieldsetModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
  ],
  templateUrl: './add-manual-data.component.html',
  styleUrl: './add-manual-data.component.scss',
})
export class AddManualDataComponent {
  addManualTaskForm!: FormGroup;

  constructor(public dataServ: DataService, 
              private fb: FormBuilder,
              private dbServ: IndexedDBService) {
    this.addManualTaskForm = this.fb.group({
      tasks: this.fb.array([]), // Inicializamos el FormArray vacío
    });

    const tasksArray = this.addManualTaskForm.get('tasks') as FormArray;

    this.dataServ.activities.forEach((activity: Activity) => {
      tasksArray.push(this.createTaskGroup(activity.name)); // Añadimos cada FormGroup
    });
  }

  createTaskGroup(name: string): FormGroup {
    const group = this.fb.group({
      name: [name],
      elegidos: [[], [Validators.required]],
    });

    // Subscribe to changes on the 'elegidos' control
    group.get('elegidos')?.valueChanges.subscribe(() => {
      this.updateElegidos(group);
    });

    return group;
  }

  updateElegidos(group: FormGroup): void {
    const elegidosControl = group.get('elegidos') as FormControl;

    // Combine selections from the multi-selects
    const currentValues = elegidosControl.value;
    const newValues = [...new Set(currentValues)];

    // Update the control with combined values
    elegidosControl.setValue(newValues, { emitEvent: false });
  }

  get tasks(): FormArray {
    return this.addManualTaskForm.get('tasks') as FormArray;
  }

  updateActivitiesWithSelected() {
    const tasksArray = this.addManualTaskForm.get('tasks') as FormArray;

    // Recorremos el FormArray de tareas
    tasksArray.controls.forEach((taskGroup: AbstractControl) => {
      const taskName = taskGroup.get('name')?.value; // Obtener el nombre de la tarea
      const elegidos = taskGroup.get('elegidos')?.value; // Obtener los valores seleccionados en 'elegidos'

      // Buscar la actividad correspondiente en el array de activities por nombre
      const activity = this.dataServ.activities.find(
        (act: any) => act.name === taskName
      );

      if (activity) {
        // Asigna los valores seleccionados de 'elegidos' a la actividad correspondiente
        activity.elegidos = elegidos;
      }
    });
  }

  onSubmit(): void {
    if (this.addManualTaskForm.invalid) {
      this.addManualTaskForm.markAllAsTouched(); // Marca todos los controles como tocados
      console.log('Formulario no válido:', this.addManualTaskForm.value);
      return; // Evitar que se envíe si no es válido
    }

    this.updateActivitiesWithSelected()

    this.dbServ.addTask(this.dataServ.activities).subscribe({
      next: () => {
        console.log('Datos agregados manualmente correctamente.');
      },
      error: (err) => {
        console.error('Error al agregar datos manualmente:', err);
      },
    });

    // Lógica para el caso de formulario válido
    console.log('Formulario válido, datos:', this.addManualTaskForm.value);
  }
}
