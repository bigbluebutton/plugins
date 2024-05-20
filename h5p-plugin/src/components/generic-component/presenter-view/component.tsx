import * as React from 'react';
import { PresenterViewerRenderFunctionProps } from './types';
import { MoreInfoUser, TestResult } from '../types';
import * as Styled from './styles';

const mapObject = (results: TestResult[], usersList: MoreInfoUser[], presenterId: string) => (
  usersList?.map((item) => {
    const userResult = results?.filter((r) => (r.userId === item.userId))[0];
    return item.userId !== presenterId ? (
      <Styled.ListItemRender
        key={item.userId}
      >
        <span>
          Name:
          {' '}
          {item.name}
        </span>
        <span>
          Score:
          {' '}
          {userResult?.testResultObject}
          {userResult ? '/' : null}
          {userResult?.testResultMaximumScore}
        </span>
      </Styled.ListItemRender>
    ) : null;
  })
);

function PresenterViewerRenderFunction(props: PresenterViewerRenderFunctionProps) {
  const { testResult, usersList, currentUserId } = props;

  const restults = testResult.data?.map((data) => ({
    userId: data.payloadJson.userId,
    testResultObject: data.payloadJson.testResultObject,
    testResultMaximumScore: data.payloadJson.testResultMaximumScore,
  } as TestResult));
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
      <h1>Results of each student</h1>
      {mapObject(restults, usersList, currentUserId)}
    </div>
  );
}

export default PresenterViewerRenderFunction;
