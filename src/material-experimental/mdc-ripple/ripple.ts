import {Directive, ElementRef} from '@angular/core';
import {MDCRipple, MDCRippleFoundation} from '@material/ripple';

// import {RippleAdapter} from '../mdc-ripple/ripple';
// import {RippleAdapter, RippleSurface} from '../mdc-ripple/ripple';

// TODO(amysorto): Add in config and global options

/**
 * Interface that describes the configuration for the animation of a ripple.
 * There are two animation phases with different durations for the ripples.
 */
export interface RippleAnimationConfig {
  /** Duration in milliseconds for the enter animation (expansion from point of contact). */
  enterDuration?: number;
  /** Duration in milliseconds for the exit animation (fade-out). */
  exitDuration?: number;
}

//TODO: set, will be useful for testing
/** Possible states for a ripple element. */
export const enum RippleState {
  FADING_IN,
  VISIBLE,
  FADING_OUT,
  HIDDEN,
}

/** Configurable options for `matRipple`. */
export interface RippleGlobalOptions {
  /**
   * Whether ripples should be disabled. Ripples can be still launched manually by using
   * the `launch()` method. Therefore focus indicators will still show up.
   */
  disabled?: boolean;

  /**
   * Default configuration for the animation duration of the ripples. There are two phases with
   * different durations for the ripples: `enter` and `leave`. The durations will be overwritten
   * by the value of `matRippleAnimation` or if the `NoopAnimationsModule` is included.
   */
  animation?: RippleAnimationConfig;

  /**
   * Whether ripples should start fading out immediately after the mouse or touch is released. By
   * default, ripples will wait for the enter animation to complete and for mouse or touch release.
   */
  terminateOnPointerUp?: boolean;
}

@Directive({
  selector: '[mat-ripple], [matRipple]',
  exportAs: 'matRipple',
  host: {
    'class': 'mdc-ripple-surface ripple-surface',
  },
})
export class MatRipple {
  ripple: MDCRipple;
  element: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngAfterViewInit() {
    let foundation = new MDCRippleFoundation({
      ...MDCRipple.createAdapter({
        root: this.element,
        unbounded: false,
      }),
    });
    this.ripple = new MDCRipple(this.element, foundation);
    this.ripple.initialize();
  }
}
