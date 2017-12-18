import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} className="editor-link" title={url}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.string,
  contentState: PropTypes.object,
  children: PropTypes.node,
};

module.exports = Link;
