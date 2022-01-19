import {Component, NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material-experimental/mdc-tabs';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<mat-tab-group>
  <mat-tab label="First">Content 1</mat-tab>
  <mat-tab label="Second">Content 2</mat-tab>
  <mat-tab label="Third">Content 3</mat-tab>
</mat-tab-group>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatTabsModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
