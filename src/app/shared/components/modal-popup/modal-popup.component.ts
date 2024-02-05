import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent{
  @Input() open: boolean = false;
  @Input() title: string = '';
  @Output() closeModal = new EventEmitter<void>();
}
