import React from 'react';
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
  entityKey: React.PropTypes.string,
  children: React.PropTypes.node,
};

module.exports = Link;
