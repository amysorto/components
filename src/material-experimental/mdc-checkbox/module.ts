/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {_MatCheckboxRequiredValidatorModule} from '@angular/material/checkbox';
import {MatCommonModule} from '@angular/material-experimental/mdc-core';
import {MatCheckbox} from './checkbox';
import {MdcRippleModule} from '../mdc-ripple';

@NgModule({
  imports: [MatCommonModule, MdcRippleModule, _MatCheckboxRequiredValidatorModule],
  exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule],
  declarations: [MatCheckbox],
})
export class MatCheckboxModule {}
