import * as React from 'react';
import * as uuidLib from 'uuid';
import { useEffect, useState } from 'react';
import { H5pPlayerManagerComponentProps, LatestH5pStateItem } from './types';
import H5pPresenterComponent from '../h5p-presenter-component/component';

export function H5pPlayerManagerComponent(props: H5pPlayerManagerComponentProps) {
  const {
    jsonContent,
    currentH5pStateToBeApplied,
  } = props;
  const [latestH5pStates, setLatestH5pStates] = useState<LatestH5pStateItem[]>([]);

  useEffect(() => {
    setLatestH5pStates((list) => {
      let resultList = [...list];
      if (currentH5pStateToBeApplied) {
        resultList = [...resultList, {
          state: currentH5pStateToBeApplied, rendered: false, id: uuidLib.v4(),
        }];
      }
      return resultList;
    });
  }, [currentH5pStateToBeApplied]);

  return (
    <div>
      {[...latestH5pStates].filter(
        (state, index) => !state.rendered
        || index === latestH5pStates.length - 1
        || !latestH5pStates[index + 1]?.rendered,
      ).map((state, index) => (
        <H5pPresenterComponent
          key={state.id}
          indexOfCurrentStateInList={index}
          stateListLength={latestH5pStates.length}
          setLatestH5pStates={setLatestH5pStates}
          currentH5pStateToBeApplied={state.state}
          idOfCurrentState={state.id}
          jsonContent={jsonContent}
        />
      ))}
    </div>
  );
}
