import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { renderH5pForNonPresenter } from '../h5p-renderer/utils';
import { NonPresenterViewComponentProps } from './types';
import * as Styled from '../styles';
import { CurrentH5pStateWindow } from '../../../commons/types';

declare const window: CurrentH5pStateWindow;

window.currentH5pState = '';
function NonPresenterViewComponent(props: NonPresenterViewComponentProps) {
  const containerRef = useRef(null);

  const [h5pState, setH5pState] = useState({});
  const {
    jsonContent,
    testResultDispatcher, currentUserId,
    pushH5pCurrentState, lastUpdateId, lastPayloadJson,
    replaceH5pCurrentState,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventHandler = (event: any) => {
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
    if (pushH5pCurrentState
      && h5pState
      && Object.keys(h5pState).length !== 0 && replaceH5pCurrentState) {
      if (lastUpdateId) {
        replaceH5pCurrentState(lastUpdateId, {
          userId: currentUserId,
          currentState: h5pState,
        });
      } else {
        pushH5pCurrentState({
          userId: currentUserId,
          currentState: h5pState,
        });
      }
    }
  }, [h5pState]);
  useEffect(() => {
    const timeoutReference = setTimeout(
      renderH5pForNonPresenter(
        containerRef,
        lastPayloadJson,
        setH5pState,
        jsonContent,
      ),
      100,
    );

    return () => {
      window.H5P?.externalDispatcher?.off('xAPI', eventHandler);
      clearTimeout(timeoutReference);
    };
  }, []);

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

export default NonPresenterViewComponent;
