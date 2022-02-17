/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material-experimental/mdc-core';
import {MatRadioButton, MatRadioGroup} from './radio';
import {MdcRippleModule} from '../mdc-ripple';

@NgModule({
  imports: [MatCommonModule, CommonModule, MdcRippleModule],
  exports: [MatCommonModule, MatRadioGroup, MatRadioButton],
  declarations: [MatRadioGroup, MatRadioButton],
})
export class MatRadioModule {}
