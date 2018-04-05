# NoCMS Editor (Work in progress)

Editor for NoCMS. Used by publishers. Features editors of different complexity and options.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-editor.svg)](https://david-dm.org/miles-no/nocms-editor)
[![devDependencies](https://david-dm.org/miles-no/nocms-editor/dev-status.svg)](https://david-dm.org/miles-no/nocms-editor?type=dev)


## Installation

Install nocms-editor from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install nocms-editor
```
## Usage

```
import { Simple } from 'nocms-editor';

<Simple text={text} placeholder={placeholder} scope={scope} />
```

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).

## API

### Simple
This is the simple version of the text editor and is based on an ordinary input field.

#### `text` PropTypes.string
Text to display in the input field

#### `placeholder` PropTypes.string
Placeholder string. Typically used to indicate which content the publisher should add.
Default 'Add text...'

#### `scope` PropTypes.string
The full path to this key in pageData. E.g. 'components.2.header'

### LinkEditor
A slightly more advanced editor. Features bold, italic, underline, lists and link option.

#### `text` PropTypes.string
Text to display in the input field

#### `placeholder` PropTypes.string
Placeholder string. Typically used to indicate which content the publisher should add.

#### `scope` PropTypes.string
The full path to this key in pageData. E.g. 'components.2.header'

### PlainTextEditor
Text editor without any formatting options. Intended for use where you normally would use textarea, but without e.g. resizing limitations of native text areas.

#### `text` PropTypes.string
Text to display in the input field

#### `placeholder` PropTypes.string
Placeholder string. Typically used to indicate which content the publisher should add.

#### `scope` PropTypes.string
The full path to this key in pageData. E.g. 'components.2.header'

### SimpleMultiline `deprecated`
Was intended to use as a simpler editor without formatting options. Based on text area. We don't recommand the use of it, as it lacks a proper auto resize option and does not save markup like the rest of the editors. Will be removed in a later release.

#### `text` PropTypes.string
Text to display in the input field.

#### `placeholder` PropTypes.string
Placeholder string

#### `scope` PropTypes.string
The full path to this key in pageData. E.g. 'components.2.header'

#### `center` PropTypes.bool
Adds a center class for styling

#### `autoresize` PropTypes.bool
Buggy. If the text area should auto resize with height or not.

