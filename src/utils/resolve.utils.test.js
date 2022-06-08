const path = require('path');
const { resolveFromVersion, resolve } = require('./resolve.utils');
const { VERSION } = require('../config');

describe('Resolve Utils Test', () => {
  describe('resolve', () => {
    test('should resolve to `src` as the base when no relative path is provided', () => {
      const base = path.basename(resolve());
      expect(base).toEqual('src');
    });

    test('should resolve to a path relative to the base', () => {
      const relativePath = path.join('scooby', 'doo');
      const diff = path.relative(resolve(''), resolve(relativePath));
      expect(diff).toEqual(relativePath);
    });
  });

  describe('resolveFromVersion', () => {
    test('should resolve to `src/resources/stu3` when no arguments are provided', () => {
      const base = resolveFromVersion();
      const projectBase = base.substr(base.indexOf('src'));
      expect(projectBase).toEqual(path.join('src', 'resources', '3_0_1'));
    });

    test('should resolve to `src/resources/r4` when no relatve path is provided and version is r4', () => {
      const base = resolveFromVersion('r4');
      const projectBase = base.substr(base.indexOf('src'));
      expect(projectBase).toEqual(path.join('src', 'resources', 'r4'));
    });

    test('should resolve a path relative to the version base', () => {
      const base = resolveFromVersion(VERSION['3_0_1'], 'scooby/doo');
      const projectBase = base.substr(base.indexOf('src'));
      expect(projectBase).toEqual(
        path.join('src', 'resources', '3_0_1', 'scooby', 'doo'),
      );
    });
  });
});
