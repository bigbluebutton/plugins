import * as React from 'react';
import Iframe from 'react-iframe';

interface GenericComponentLinkShareProps {
  link: string;
}

function GenericComponentLinkShare(props: GenericComponentLinkShareProps): React.ReactElement {
  const { link } = props;

  return (
    <div style={{
      background: 'white',
      width: '100%',
      height: '100%',
    }}
    >
      <Iframe
        url={link}
        width="100%"
        height="100%"
        display="block"
        position="relative"
      />
    </div>
  );
}

export default GenericComponentLinkShare;
