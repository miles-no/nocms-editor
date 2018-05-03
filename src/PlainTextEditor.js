import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

class PlainTextEditor extends Component {
  constructor(props) {
    super(props);
    const convertedText = stateFromHTML(props.text);
    this.state = {
      editorState: EditorState.createWithContent(convertedText, this.decorator),
    };
    this.onChange = (editorState) => this.setState({ editorState }); //eslint-disable-line
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    const html = stateToHTML(this.state.editorState.getCurrentContent());
    if (html === this.props.text) {
      return;
    }
    triggerGlobal('nocms.value-changed', this.props.scope, html);
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div className="text-editor">
        <div className="text-editor__body">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder={placeholder}
            onBlur={this.onBlur}
          />
        </div>
      </div>
    );
  }
}

PlainTextEditor.propTypes = {
  text: PropTypes.string,
  scope: PropTypes.string,
  placeholder: PropTypes.string,
};

PlainTextEditor.defaultProps = {
  text: '',
};

export default PlainTextEditor;
