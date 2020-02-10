import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  private currentValue: string;
  onChange: (value: any) => void;
  onTouched: () => void;
  disabled: boolean;

  @Input() type: string;
  @Input() label: string;
  @Input() placeholder: string;

  writeValue(value: string): void {
    if (value !== null) {
      this.value = value;
    }
  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value(): string {
    return this.currentValue;
  }

  set value(value: string) {
    this.currentValue = value;
    this.onChange(this.currentValue);
    this.onTouched();
  }

}
