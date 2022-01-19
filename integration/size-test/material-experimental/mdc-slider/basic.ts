import {Component, NgModule} from '@angular/core';
import {MatSliderModule} from '@angular/material-experimental/mdc-slider';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<mat-slider></mat-slider>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatSliderModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
