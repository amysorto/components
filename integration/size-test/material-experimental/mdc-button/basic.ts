import {Component, NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material-experimental/mdc-button';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<button mat-button> Basic </button>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatButtonModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
