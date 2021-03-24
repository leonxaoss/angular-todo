import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormContactsRoutingModule } from './form-contacts-routing.module';
import { FormContactsComponent } from './form-contacts.component';
import { InputComponent } from './component/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveFormDialogComponent } from './component/leave-form-dialog/leave-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { UploadImgModule } from '../../modules/upload-img/upload-img.module';
import { ButtonsModule } from '../../modules/button/buttons.module';
import { LoaderModule } from '../../modules/loader/loader.module';


@NgModule({
  declarations: [
    FormContactsComponent,
    InputComponent,
    LeaveFormDialogComponent
  ],
    imports: [
        CommonModule,
        FormContactsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        NgxMaskModule.forRoot(),
        UploadImgModule,
        ButtonsModule,
        LoaderModule
    ],
  entryComponents: [
    LeaveFormDialogComponent
  ],
})
export class FormContactsModule { }
