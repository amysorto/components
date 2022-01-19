import {Component, NgModule} from '@angular/core';
import {MatRadioModule} from '@angular/material-experimental/mdc-radio';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<mat-radio-group>
  <mat-radio-button value="1">Option 1</mat-radio-button>
  <mat-radio-button value="2">Option 2</mat-radio-button>
  <mat-radio-button value="3">Option 3</mat-radio-button>
</mat-radio-group>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatRadioModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
