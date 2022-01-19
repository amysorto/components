import {Component, NgModule} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material-experimental/mdc-slide-toggle';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<mat-slide-toggle [checked]="true">Toggle me</mat-slide-toggle>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatSlideToggleModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
