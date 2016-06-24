import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, ContentState } from 'draft-js';
import FormattingButton from './FormattingButton';

const INLINE_STYLES = [
  { label: 'B', style: 'BOLD' },
  { label: 'I', style: 'ITALIC' },
  { label: 'U', style: 'UNDERLINE' },
];

const FormattingControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <span className="text-editor__formatting">
      {INLINE_STYLES.map(type =>
        <FormattingButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </span>
  );
};

FormattingControls.propTypes = {
  editorState: React.PropTypes.object,
  onToggle: React.PropTypes.func,
};

module.exports = FormattingControls;
