import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { UploadImgInterface } from './upload-img.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImgComponent),
      multi: true,
    },
  ],
})
export class UploadImgComponent implements OnInit, ControlValueAccessor {

  @Input() selectedFile = '';
  @Input() disable = false;
  @Output() uploadImg = new EventEmitter<UploadImgInterface>();
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: any): void {
    this.selectedFile = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  onFileSelected(event: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const img = new Image();
      // @ts-ignore
      img.src = reader.result.toString();
      img.onload = () => {
        const width = 600;
        const elem = document.createElement('canvas');
        const scaleFactor = width / img.width;
        elem.width = width;
        elem.height = img.height * scaleFactor;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, img.height * scaleFactor);
        const data = elem.toDataURL('image/jpeg', 0.7);
        this.selectedFile = data;
        this.onChange(data);
        this.onTouched();
        this.uploadImg.emit({
          image: data,
          imageName: event.target.files[0].name
        });
      };
    };
  }

  removeFile(): void {
    this.selectedFile = '';
    this.onChange('');
    this.onTouched();
    this.uploadImg.emit({
      image: '',
      imageName: ''
    });
  }

}
