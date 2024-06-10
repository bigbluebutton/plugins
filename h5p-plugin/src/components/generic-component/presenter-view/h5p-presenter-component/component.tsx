import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { renderH5pForPresenter } from '../../h5p-renderer/utils';
import * as Styled from '../../styles';
import { H5pPresenterComponentProps } from './types';
import { CurrentH5pStateWindow } from '../../../../commons/types';

declare const window: CurrentH5pStateWindow;

window.currentH5pState = '';
function H5pPresenterComponent(props: H5pPresenterComponentProps) {
  const containerRef = useRef(null);
  const [contentRendered, setContentRendered] = useState(false);

  const {
    jsonContent,
    currentH5pStateToBeApplied,
    setLatestH5pStates, idOfCurrentState,
  } = props;

  useEffect(() => {
    if (setLatestH5pStates && contentRendered) {
      setTimeout(() => {
        setLatestH5pStates((prev) => {
          const result = prev.map((state) => {
            const modifiedState = { ...state };
            if (state.id === idOfCurrentState) modifiedState.rendered = true;
            return modifiedState;
          });
          return result;
        });
      }, 1000);
    }
  }, [contentRendered]);

  useEffect(() => {
    const timeoutReference = setTimeout(
      renderH5pForPresenter(
        containerRef,
        currentH5pStateToBeApplied,
        jsonContent,
        setContentRendered,
      ),
      100,
    );

    return () => {
      clearTimeout(timeoutReference);
    };
  }, []);

  return (
    <div
      style={{ position: 'relative' }}
    >
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
          style={{
            position: 'absolute',
            blockSize: 'fit-content',
          }}
          ref={containerRef}
        />
      </div>
    </div>
  );
}

export default H5pPresenterComponent;
