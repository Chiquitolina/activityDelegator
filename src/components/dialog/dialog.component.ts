import { Component, Input, ViewChild, ViewContainerRef, OnChanges, SimpleChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnChanges {
  @Input() dialogHeader!: string;
  @Input() dialogVisible!: boolean;
  @Input() dialogType!: string; // Tipo de diálogo para cargar el componente correcto
  @Output() onClose = new EventEmitter<void>(); // Nuevo evento para propagar el cierre

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dialogType'] || changes['dialogVisible']) {
      if (this.dialogVisible) {
        if (this.container) {
          this.loadComponent();
        }
      } else {
        if (this.container) {
          this.container.clear();
        }
      }
    }
  }

  private async loadComponent() {
    this.container.clear();

    let componentToLoad: any;

    if (this.dialogType === 'add-data') {
      const { AddManualDataComponent } = await import('../add-manual-data/add-manual-data.component');
      componentToLoad = AddManualDataComponent;
    } else if (this.dialogType === 'view-graphs') {
      const { GraphsComponent } = await import('../graphs/graphs.component');
      componentToLoad = GraphsComponent;
    } else if (this.dialogType === 'historic-data') {
      const { HistoricDataComponent } = await import('../historic-data/historic-data.component');
      componentToLoad = HistoricDataComponent;
    }

    if (componentToLoad) {
      this.container.createComponent(componentToLoad);
    }
  }

  closeDialog() {
    console.log('Cerrando diálogo en DialogComponent');
    this.dialogVisible = false;
    this.onClose.emit(); 
  }
  
}