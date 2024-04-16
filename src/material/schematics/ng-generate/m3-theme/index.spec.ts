import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {createTestApp} from '@angular/cdk/schematics/testing';

import {runfiles} from '@bazel/runfiles';
import {compileString} from 'sass';
import * as path from 'path';
import {createLocalAngularPackageImporter} from '../../../../../tools/sass/local-sass-importer';
import {pathToFileURL} from 'url';
import {generateSCSSTheme} from './index';
import {Schema} from './schema';

// Hue maps created from https://m3.material.io/theme-builder#/custom (using
// #984061 as source color). Not using predefined M3 palettes since some neutral
// hues are slightly off from generated theme.
const testM3ThemePalette = new Map([
  [
    'primary',
    new Map<number, string>([
      [0, '#000000'],
      [10, '#3e001d'],
      [20, '#5e1133'],
      [25, '#6c1d3e'],
      [30, '#7b2949'],
      [35, '#893455'],
      [40, '#984061'],
      [50, '#b6587a'],
      [60, '#d57194'],
      [70, '#f48bae'],
      [80, '#ffb0c8'],
      [90, '#ffd9e2'],
      [95, '#ffecf0'],
      [98, '#fff8f8'],
      [99, '#fffbff'],
      [100, '#ffffff'],
    ]),
  ],
  [
    'secondary',
    new Map<number, string>([
      [0, '#000000'],
      [10, '#2b151c'],
      [20, '#422931'],
      [25, '#4e343c'],
      [30, '#5a3f47'],
      [35, '#674b53'],
      [40, '#74565f'],
      [50, '#8e6f77'],
      [60, '#aa8891'],
      [70, '#c6a2ab'],
      [80, '#e2bdc6'],
      [90, '#ffd9e2'],
      [95, '#ffecf0'],
      [98, '#fff8f8'],
      [99, '#fffbff'],
      [100, '#ffffff'],
    ]),
  ],
  [
    'tertiary',
    new Map<number, string>([
      [0, '#000000'],
      [10, '#2e1500'],
      [20, '#48290c'],
      [25, '#543416'],
      [30, '#623f20'],
      [35, '#6f4a2a'],
      [40, '#7c5635'],
      [50, '#986e4b'],
      [60, '#b48862'],
      [70, '#d1a27b'],
      [80, '#efbd94'],
      [90, '#ffdcc2'],
      [95, '#ffeee2'],
      [98, '#fff8f5'],
      [99, '#fffbff'],
      [100, '#ffffff'],
    ]),
  ],
  [
    'neutral',
    new Map<number, string>([
      [0, '#000000'],
      [10, '#201a1b'],
      [20, '#352f30'],
      [25, '#413a3b'],
      [30, '#4c4546'],
      [35, '#585052'],
      [40, '#645c5e'],
      [50, '#7e7576'],
      [60, '#988e90'],
      [70, '#b3a9aa'],
      [80, '#cfc4c5'],
      [90, '#ebe0e1'],
      [95, '#faeeef'],
      [98, '#fff8f8'],
      [99, '#fffbff'],
      [100, '#ffffff'],
      [4, '#120d0e'],
      [6, '#171213'],
      [12, '#241e1f'],
      [17, '#2f282a'],
      [22, '#3a3334'],
      [24, '#3e3739'],
      [87, '#e3d7d9'],
      [92, '#f1e5e7'],
      [94, '#f7ebec'],
      [96, '#fdf1f2'],
    ]),
  ],
  [
    'neutral-variant',
    new Map<number, string>([
      [0, '#000000'],
      [10, '#24191c'],
      [20, '#3a2d30'],
      [25, '#45383b'],
      [30, '#514347'],
      [35, '#5d4f52'],
      [40, '#6a5b5e'],
      [50, '#837377'],
      [60, '#9e8c90'],
      [70, '#b9a7ab'],
      [80, '#d5c2c6'],
      [90, '#f2dde2'],
      [95, '#ffecf0'],
      [98, '#fff8f8'],
      [99, '#fffbff'],
      [100, '#ffffff'],
    ]),
  ],
  [
    'error',
    new Map<number, string>([
      [0, '#000000'],
      [10, '#410002'],
      [20, '#690005'],
      [25, '#7e0007'],
      [30, '#93000a'],
      [35, '#a80710'],
      [40, '#ba1a1a'],
      [50, '#de3730'],
      [60, '#ff5449'],
      [70, '#ff897d'],
      [80, '#ffb4ab'],
      [90, '#ffdad6'],
      [95, '#ffedea'],
      [98, '#fff8f7'],
      [99, '#fffbff'],
      [100, '#ffffff'],
    ]),
  ],
]);

const testM3ThemeScss = `@use 'sass:map';
@use '@angular/material-experimental' as matx;

$_palettes: (
  primary: (
    0: #000000,
    10: #3e001d,
    20: #5e1133,
    25: #6c1d3e,
    30: #7b2949,
    35: #893455,
    40: #984061,
    50: #b6587a,
    60: #d57194,
    70: #f48bae,
    80: #ffb0c8,
    90: #ffd9e2,
    95: #ffecf0,
    98: #fff8f8,
    99: #fffbff,
    100: #ffffff,
  ),
  secondary: (
    0: #000000,
    10: #2b151c,
    20: #422931,
    25: #4e343c,
    30: #5a3f47,
    35: #674b53,
    40: #74565f,
    50: #8e6f77,
    60: #aa8891,
    70: #c6a2ab,
    80: #e2bdc6,
    90: #ffd9e2,
    95: #ffecf0,
    98: #fff8f8,
    99: #fffbff,
    100: #ffffff,
  ),
  tertiary: (
    0: #000000,
    10: #2e1500,
    20: #48290c,
    25: #543416,
    30: #623f20,
    35: #6f4a2a,
    40: #7c5635,
    50: #986e4b,
    60: #b48862,
    70: #d1a27b,
    80: #efbd94,
    90: #ffdcc2,
    95: #ffeee2,
    98: #fff8f5,
    99: #fffbff,
    100: #ffffff,
  ),
  neutral: (
    0: #000000,
    10: #201a1b,
    20: #352f30,
    25: #413a3b,
    30: #4c4546,
    35: #585052,
    40: #645c5e,
    50: #7e7576,
    60: #988e90,
    70: #b3a9aa,
    80: #cfc4c5,
    90: #ebe0e1,
    95: #faeeef,
    98: #fff8f8,
    99: #fffbff,
    100: #ffffff,
    4: #120d0e,
    6: #171213,
    12: #241e1f,
    17: #2f282a,
    22: #3a3334,
    24: #3e3739,
    87: #e3d7d9,
    92: #f1e5e7,
    94: #f7ebec,
    96: #fdf1f2,
  ),
  neutral-variant: (
    0: #000000,
    10: #24191c,
    20: #3a2d30,
    25: #45383b,
    30: #514347,
    35: #5d4f52,
    40: #6a5b5e,
    50: #837377,
    60: #9e8c90,
    70: #b9a7ab,
    80: #d5c2c6,
    90: #f2dde2,
    95: #ffecf0,
    98: #fff8f8,
    99: #fffbff,
    100: #ffffff,
  ),
  error: (
    0: #000000,
    10: #410002,
    20: #690005,
    25: #7e0007,
    30: #93000a,
    35: #a80710,
    40: #ba1a1a,
    50: #de3730,
    60: #ff5449,
    70: #ff897d,
    80: #ffb4ab,
    90: #ffdad6,
    95: #ffedea,
    98: #fff8f7,
    99: #fffbff,
    100: #ffffff,
  ),
);

$_rest: (
  secondary: map.get($_palettes, secondary),
  neutral: map.get($_palettes, neutral),
  neutral-variant: map.get($_palettes,  neutral-variant),
  error: map.get($_palettes, error),
);
$_primary: map.merge(map.get($_palettes, primary), $_rest);
$_tertiary: map.merge(map.get($_palettes, tertiary), $_rest);

$m3-light-theme: matx.define-theme((
  color: (
    theme-type: light,
    primary: $_primary,
    tertiary: $_tertiary,
  )
));
$m3-dark-theme: matx.define-theme((
  color: (
    theme-type: dark,
    primary: $_primary,
    tertiary: $_tertiary,
  )
));`;

// Note: For Windows compatibility, we need to resolve the directory paths through runfiles
// which are guaranteed to reside in the source tree.
const testDir = runfiles.resolvePackageRelative('../m3-theme');
const packagesDir = path.join(runfiles.resolveWorkspaceRelative('src/cdk/_index.scss'), '../..');
const localPackageSassImporter = createLocalAngularPackageImporter(packagesDir);

const mdcSassImporter = {
  findFileUrl: (url: string) => {
    if (url.toString().startsWith('@material')) {
      return pathToFileURL(
        path.join(runfiles.resolveWorkspaceRelative('./node_modules'), url),
      ) as URL;
    }
    return null;
  },
};

describe('material-m3-theme-schematic', () => {
  let runner: SchematicTestRunner;

  /** Transpiles given Sass content into CSS. */
  function transpileTheme(content: string): string {
    return compileString(
      `
        @use '@angular/material' as mat;

        ${content}

        html {
          @if variable-exists(m3-light-theme) {
            @include mat.all-component-colors($m3-light-theme);
          }
          @if variable-exists(m3-dark-theme) {
            @include mat.all-component-colors($m3-dark-theme);
          }
        }
        `,
      {
        loadPaths: [testDir],
        importers: [localPackageSassImporter, mdcSassImporter],
      },
    ).css.toString();
  }

  async function runM3ThemeSchematic(
    runner: SchematicTestRunner,
    options: Schema,
  ): Promise<UnitTestTree> {
    const app = await createTestApp(runner, {standalone: true});
    return runner.runSchematic('m3-theme', options, app);
  }

  beforeEach(() => {
    runner = new SchematicTestRunner(
      '@angular/material',
      runfiles.resolveWorkspaceRelative('src/material/schematics/collection.json'),
    );
  });

  it('should throw error if given an incorrect color', async () => {
    try {
      await runM3ThemeSchematic(runner, {
        primaryColor: '#fffff',
        themeTypes: ['light'],
      });
    } catch (e) {
      expect((e as Error).message).toBe(
        'Cannot parse the specified color #fffff. Please verify it is a hex color (ex. #ffffff or ffffff).',
      );
    }
  });

  it('should generate m3 theme file', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      themeTypes: ['light'],
    });
    expect(tree.exists('m3-theme.scss')).toBe(true);
  });

  it('should generate m3 theme file at specified path', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      themeTypes: ['light'],
      directory: 'projects/',
    });
    expect(tree.exists('projects/m3-theme.scss')).toBe(true);
  });

  it('should generate m3 theme file with correct indentation and formatting', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      themeTypes: ['light', 'dark'],
    });
    expect(tree.readText('m3-theme.scss')).toEqual(testM3ThemeScss);
  });

  it('should generate light theme when provided a primary color', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      themeTypes: ['light'],
    });

    const generatedCSS = transpileTheme(tree.readText('m3-theme.scss'));
    const testCSS = transpileTheme(generateSCSSTheme(testM3ThemePalette, ['light']));
    expect(generatedCSS).toBe(testCSS);
  });

  it('should generate dark theme when provided a primary color', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      themeTypes: ['dark'],
    });

    const generatedCSS = transpileTheme(tree.readText('m3-theme.scss'));
    const testCSS = transpileTheme(generateSCSSTheme(testM3ThemePalette, ['dark']));
    expect(generatedCSS).toBe(testCSS);
  });

  it('should generate light and dark theme when provided a primary color', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      themeTypes: ['light', 'dark'],
    });

    const generatedCSS = transpileTheme(tree.readText('m3-theme.scss'));
    const testCSS = transpileTheme(generateSCSSTheme(testM3ThemePalette, ['light', 'dark']));

    expect(generatedCSS).toBe(testCSS);
  });

  it('should generate themes when provided primary and secondary colors', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      secondaryColor: '#984061',
      themeTypes: ['light', 'dark'],
    });

    const generatedCSS = transpileTheme(tree.readText('m3-theme.scss'));

    // Change test theme palette so that secondary is the same source color as
    // primary to match schematic inputs
    let testPalette = testM3ThemePalette;
    testPalette.set('secondary', testM3ThemePalette.get('primary')!);

    const testCSS = transpileTheme(generateSCSSTheme(testPalette, ['light', 'dark']));

    expect(generatedCSS).toBe(testCSS);
  });

  it('should generate themes when provided primary, secondary, and tertiary colors', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      secondaryColor: '#984061',
      tertiaryColor: '#984061',
      themeTypes: ['light', 'dark'],
    });

    const generatedCSS = transpileTheme(tree.readText('m3-theme.scss'));

    // Change test theme palette so that secondary and tertiary are the same
    // source color as primary to match schematic inputs
    let testPalette = testM3ThemePalette;
    testPalette.set('secondary', testM3ThemePalette.get('primary')!);
    testPalette.set('tertiary', testM3ThemePalette.get('primary')!);

    const testCSS = transpileTheme(generateSCSSTheme(testPalette, ['light', 'dark']));
    expect(generatedCSS).toBe(testCSS);
  });

  it('should generate themes when provided a primary, secondary, tertiary, and neutral colors', async () => {
    const tree = await runM3ThemeSchematic(runner, {
      primaryColor: '#984061',
      secondaryColor: '#984061',
      tertiaryColor: '#984061',
      neutralColor: '#984061',
      themeTypes: ['light', 'dark'],
    });

    const generatedCSS = transpileTheme(tree.readText('m3-theme.scss'));

    // Change test theme palette so that secondary, tertiary, and neutral are
    // the same source color as primary to match schematic inputs
    let testPalette = testM3ThemePalette;
    testPalette.set('secondary', testM3ThemePalette.get('primary')!);
    testPalette.set('tertiary', testM3ThemePalette.get('primary')!);
    testPalette.set('neutral', testM3ThemePalette.get('primary')!);

    const testCSS = transpileTheme(generateSCSSTheme(testPalette, ['light', 'dark']));
    expect(generatedCSS).toBe(testCSS);
  });
});
