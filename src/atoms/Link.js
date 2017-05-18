import React from 'react';
import PropTypes from 'prop-types';
import { Editor, Entity } from 'draft-js';

const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} className="editor-link" title={url}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.string,
  children: PropTypes.node,
};

module.exports = Link;
