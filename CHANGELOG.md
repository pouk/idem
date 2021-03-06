# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.3](https://github.com/pouk/idem/compare/v0.1.2...v0.1.3) (2019-10-27)


### Bug Fixes

* **client:** init canvas probe branching w/ Maybe ([dd39463](https://github.com/pouk/idem/commit/dd39463827a628a7a8c9d3963fd6ad657883db54))
* **client:** update agent for new probes\' API ([3ce26be](https://github.com/pouk/idem/commit/3ce26bef54eb9f26e712cf13f9b14ad32b8bd7fc))
* **client:** update probes for new Trait sig ([7d2dfe1](https://github.com/pouk/idem/commit/7d2dfe1ad44c8ae0c8b39c156cf1aa783badd0b0))
* **client:** use Future for probes ([d1f62e4](https://github.com/pouk/idem/commit/d1f62e47753e651dff0e783511d050e8a3e12204))
* **client:** use new Trait api in probes ([ead3fff](https://github.com/pouk/idem/commit/ead3fff9449ae5f9d4fc6696a1307a5856e09d75))
* **common:** restructure Trait as union type ([34249f9](https://github.com/pouk/idem/commit/34249f9114333f66016ef23413cc80296ca87d52)), closes [#16](https://github.com/pouk/idem/issues/16) [#17](https://github.com/pouk/idem/issues/17) [#23](https://github.com/pouk/idem/issues/23)
* **common:** simplify Trait construct ([49be3fd](https://github.com/pouk/idem/commit/49be3fdf990ecdedbf94fdf46415751134394e25)), closes [#17](https://github.com/pouk/idem/issues/17)





## [0.1.2](https://github.com/pouk/idem/compare/v0.1.1...v0.1.2) (2019-10-21)


### Features

* **client:** add probe for canvas fingerprint ([62f271f](https://github.com/pouk/idem/commit/62f271f394f213a98519b16f81ce5dad84a83fe3)), closes [#20](https://github.com/pouk/idem/issues/20)
* **client:** add probe for navigator agents ([0a57c4b](https://github.com/pouk/idem/commit/0a57c4bf0e48aedc4c065ff4375475e9b780ccd5)), closes [#11](https://github.com/pouk/idem/issues/11)
* **client:** add probe for supported MIME types ([2a84ee4](https://github.com/pouk/idem/commit/2a84ee4229166f468be830fcd93397acdbb36aa9)), closes [#12](https://github.com/pouk/idem/issues/12)





## [0.1.1](https://github.com/pouk/idem/compare/v0.1.0...v0.1.1) (2019-10-19)


### Bug Fixes

* **client:** use murmurhash for hashing traits ([54fa12f](https://github.com/pouk/idem/commit/54fa12f8a629e7290bdef90ce5aceeef8c3fb434)), closes [#8](https://github.com/pouk/idem/issues/8)





# [0.1.0](https://github.com/pouk/idem/compare/v0.0.1...v0.1.0) (2019-10-19)


### Bug Fixes

* **client:** order probes by name ([0beb7ff](https://github.com/pouk/idem/commit/0beb7ff2ebcc8b78c942590d966f6c09866fdefe)), closes [#16](https://github.com/pouk/idem/issues/16)
* **client:** use Trait for probe results ([04d2292](https://github.com/pouk/idem/commit/04d2292fe2a5c85246dee6dca01115bb3d9ffa0d)), closes [#17](https://github.com/pouk/idem/issues/17)


### Features

* **common:** create `Trait` type for a feature notion ([69bdeef](https://github.com/pouk/idem/commit/69bdeeffb1ed55097029c0b1f2ab96fe12e15be0)), closes [#17](https://github.com/pouk/idem/issues/17)





## 0.0.1 (2019-10-14)


### Bug Fixes

* refactor high-level logic into `Agent` ([24e33af](https://github.com/pouk/idem/commit/24e33af40df33af4ecd0ab5021bcfcbb7c524e8f))
* use Java's hashCode for encoding ID ([1c37b58](https://github.com/pouk/idem/commit/1c37b586103de9a5c2a8c977d3e732e017a79cd7)), closes [#8](https://github.com/pouk/idem/issues/8)


### Features

* add probe for available fonts (naive) ([3704f61](https://github.com/pouk/idem/commit/3704f619233299d7290634b5820910a340838c14)), closes [#7](https://github.com/pouk/idem/issues/7)
* init naive fingerprint generator ([e8c2ead](https://github.com/pouk/idem/commit/e8c2ead5d1d9a34d910eafa142c7160daff97e75)), closes [#3](https://github.com/pouk/idem/issues/3) [#4](https://github.com/pouk/idem/issues/4)
