import {Component, NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material-experimental/mdc-menu';

/**
 * Basic component using `MatFormField` and `MatInput`. Other parts of the form-field
 * module such as `MatError`, `MatHint`, `MatPrefix` or `MatSuffix` are not used
 * and should be tree-shaken away.
 */
@Component({
  template: `<button [matMenuTriggerFor]="menu">Menu</button>
  <mat-menu #menu="matMenu">
    <button mat-menu-item>Item 1</button>
    <button mat-menu-item>Item 2</button>
  </mat-menu>`,
})
export class TestComponent {}

@NgModule({
  imports: [MatMenuModule],
  declarations: [TestComponent],
  bootstrap: [TestComponent],
})
export class AppModule {}
