import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { H5P } from 'h5p-standalone';
import * as Styled from './styles';

function H5pContentRenderFunction(props) {
  const stopInfinitLoop = useRef(false);
  const containerRef = useRef(null);
  const [contentRendered, setContentRendered] = useState(false);

  const { jsonContent, testResultDispatcher, currentUserId } = props;

  const eventHandler = (event) => {
    if (event.getScore && event.getMaxScore && event.getVerb && testResultDispatcher) {
      const score = event.getScore();
      const maxScore = event.getMaxScore();
      const verb = event.getVerb();
      if (verb === 'answered') {
        testResultDispatcher({
          userId: currentUserId,
          testResultObject: score,
          testResultMaximumScore: maxScore,
        });
      }
    }
  };

  useEffect(() => {
    const timeoutReference = setTimeout(
      async () => {
        const el = containerRef.current;

        if (el) {
          if (!el.querySelector('.h5p-iframe-wrapper')) {
            const options = {
              contentAsJson: jsonContent.replace(/(\r\n|\n|\r)/gm, ''),
              h5pJsonPath: 'https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets',
              frameJs: 'https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets/frame.bundle.js',
              frameCss: 'https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/h5p/assets/styles/h5p.css',
              assetsRequestFetchOptions: {},
            };
            await new H5P(el, options)
              .then(() => {
                setContentRendered(true);
              });
          }
        }
      },
      100,
    );

    return () => {
      window.H5P?.externalDispatcher?.off('xAPI', eventHandler);
      clearTimeout(timeoutReference);
    };
  }, []);

  if (testResultDispatcher && !stopInfinitLoop.current && contentRendered) {
    stopInfinitLoop.current = true;
    window.H5P?.externalDispatcher?.on('xAPI', eventHandler);
  }
  return (
    <div
      id="h5p-container"
      style={
        {
          width: '100%',
          background: '#F3F6F9',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }
      }
    >
      <Styled.ScrollboxVertical
        ref={containerRef}
      />
    </div>
  );
}

export default H5pContentRenderFunction;
