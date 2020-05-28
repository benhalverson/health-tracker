import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatButtonModule,
    MatButtonModule
  ],
  exports: [MatButtonModule, MatIconModule]
})
export class MaterialModule { }
