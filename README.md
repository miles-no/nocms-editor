# NoCMS Editor (Work in progress)

Editor for NoCMS. Used by publishers. Features editors of different complexity and options.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-editor.svg)](https://david-dm.org/miles-no/nocms-editor)
[![devDependencies](https://david-dm.org/miles-no/nocms-editor/dev-status.svg)](https://david-dm.org/miles-no/nocms-editor?type=dev)


## Installation

Install nocms-editor from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install nocms-editor --save
```

## Usage

```
import { Simple, LinkEditor } from 'nocms-editor';

<Simple text={text} placeholder={placeholder} scope={scope} />
```

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).

## API

### Simple
This is the simple version of the text editor and is based on an ordinary input field.

#### text, string
Text to display in the input field

**Default** '""'

#### placeholder, string
Placeholder string. Typically used to indicate which content the publisher should add.

**Default** 'Add text...'

#### scope, string
The full path to this key in pageData. E.g. 'components.2.header'

### LinkEditor WIP
A slightly more advanced editor. Features (for the moment) bold, italic and underline and link option.
TODO: Solve persistence of typed text

#### text, string
Text to display in the input field

**Default** '""'

#### placeholder, string
Placeholder string. Typically used to indicate which content the publisher should add.

**Default** 'Add text...'
