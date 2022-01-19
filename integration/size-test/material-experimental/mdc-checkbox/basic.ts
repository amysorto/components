import {Component, NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material-experimental/mdc-checkbox';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<mat-checkbox [checked]="true">Check me</mat-checkbox>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatCheckboxModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
