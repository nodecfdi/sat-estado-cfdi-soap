# @nodecfdi/sat-estado-cfdi-soap ChangeLog

## 2.1.0

### Added raw method

- Added `ConsumerClientResponseInterface.raw()` method
- Update config for tsup lib
- Update types exports for typescript module and commonjs
- Update to ESM
- Update dependencies
- Update CI workflow for fix pipeline to latest github changes
- Drop support to node versions < 16

## 2.0.0

### Major Changes

- update compatibilty with @sat-estado-cfdi
- change dependency from soap to directo consume in axios as a peerDependency
- depends from @nodecfdi/cfdiutils-common to obtain the parsed response from the soap service.

### Build

- Update dependencies
- Replaced bundle by rollup to microbundle.

### CI

- Added sonar cloud and new rules in linting.

## 1.0.0

- First release version
