/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {NgModule} from '@angular/core';
// import {MatRippleModule as ExistingRippleModule} from '@angular/material-experimental/mdc-core';
import {MatRipple} from './ripple';

@NgModule({
  // imports: [ExistingRippleModule],
  exports: [MatRipple],
  declarations: [MatRipple],
})
export class MdcRippleModule {}
