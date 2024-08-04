import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss'
})
export class BaseModalComponent {

  @Input() showModal:boolean = false
  @Input() modalContent: string = ' ';
  @Output() close = new EventEmitter<void>();


  closeModal() {
    if (this.showModal){    
      this.showModal = false;
      this.close.emit();}

  }
  openModal(){
    if (!this.showModal){
      this.showModal = true;
    }
    
  }
}
