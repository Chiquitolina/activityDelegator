import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {


  @Input() buttonStyle?: any;
  @Input() buttonIcon?: string;
  @Input() isDisabled?: boolean = false;
  @Input() buttonType?: any;
  @Input() buttonSeverity?: any;
  @Input() buttonLabel?: string;
  @Output() buttonClick = new EventEmitter<void>();
  
  onClick() {
    this.buttonClick.emit();
  }

}
