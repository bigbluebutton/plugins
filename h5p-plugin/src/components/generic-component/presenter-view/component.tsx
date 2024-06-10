import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import * as React from 'react';
import { PresenterViewComponentProps } from './types';
import { UserH5pCurrentState } from '../types';
import * as Styled from './styles';
import { H5pPlayerManagerComponent } from './h5p-player-manager/component';

const mapObject = (
  currentUserH5pStateList: DataChannelEntryResponseType<UserH5pCurrentState>[],
  jsonContent: string,
) => (
  currentUserH5pStateList?.map((item) => (
    <H5pPlayerManagerComponent
      key={item.payloadJson.userId}
      currentH5pStateToBeApplied={item.payloadJson.currentState}
      jsonContent={jsonContent}
    />
  ))
);

function PresenterViewComponent(props: PresenterViewComponentProps) {
  const {
    h5pLatestStateUpdate, jsonContent,
  } = props;

  return (
    <div
      id="h5p-container"
      style={
        {
          width: '100%',
          background: '#F3F6F9',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 40px',
        }
      }
    >
      <h1>Answers of each student</h1>
      <Styled.H5pGridWrapper>
        {mapObject(h5pLatestStateUpdate?.data, jsonContent)}
      </Styled.H5pGridWrapper>
    </div>
  );
}

export default PresenterViewComponent;
