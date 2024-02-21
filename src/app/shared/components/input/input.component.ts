import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() name: string = '';
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() type: string = 'text';
  @Input() placeholder: string;
}
