import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @Input() form: FormGroup;
  @Input() buttonText: string;
  @Input() title: string;
  @Input() isDisabled: boolean;
  @Output() formSubmitted: EventEmitter<object> = new EventEmitter<object>();

  public formSubmit(formData: object): void {
    this.formSubmitted.emit(formData);
  }
}
