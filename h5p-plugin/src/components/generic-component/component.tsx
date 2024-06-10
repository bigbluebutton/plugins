import {
  BbbPluginSdk,
  DataChannelTypes,
  PluginApi,
  RESET_DATA_CHANNEL,
} from 'bigbluebutton-html-plugin-sdk';
import { useEffect } from 'react';
import * as React from 'react';
import {
  GenericComponentRenderFunctionProps,
  TestResult, UserH5pCurrentState, UsersMoreInformationGraphqlResponse,
} from './types';
import NonPresenterViewComponent from './non-presenter-view/component';
import PresenterViewComponent from './presenter-view/component';
import { USERS_MORE_INFORMATION } from './subscriptions';

export function GenericComponentRenderFunction(props: GenericComponentRenderFunctionProps) {
  const {
    jsonContent, currentUser,
    pluginUuid, linkThatGeneratedJsonContent,
  } = props;

  const currentUserPresenter = currentUser?.presenter;
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  const [
    responseUserH5pCurrentStateList,
    pushUserH5pCurrentStateList,
    deleteUserH5pCurrentStateList,
    replaceUserH5pCurrentStateList,
  ] = pluginApi.useDataChannel<UserH5pCurrentState>('testResult', DataChannelTypes.All_ITEMS, 'userH5pCurrentState');

  // TODO: Refactor the test results to be just a request done for an external server to be
  // validated and all
  const [testResult, testResultDispatcher] = pluginApi.useDataChannel<TestResult>('testResult', DataChannelTypes.LATEST_ITEM, linkThatGeneratedJsonContent);

  useEffect(() => () => {
    if (currentUser && currentUser.presenter) deleteUserH5pCurrentStateList([RESET_DATA_CHANNEL]);
  }, []);

  const allUsersInfo = pluginApi.useCustomSubscription<UsersMoreInformationGraphqlResponse>(
    USERS_MORE_INFORMATION,
  );
  const usersList = allUsersInfo?.data?.user;
  const responseObject = responseUserH5pCurrentStateList?.data?.filter(
    (h5pState) => h5pState.payloadJson.userId === currentUser?.userId,
  ).map((h5pState) => ({ entryId: h5pState.entryId, payloadJson: h5pState.payloadJson }))[0];

  // TODO: Filter the ones where the loading is not done yet (needs refactor in html5)
  // if (responseUserH5pCurrentStateList.loading) return null;
  return (
    currentUserPresenter
      ? (
        <PresenterViewComponent
          currentUserId={currentUser?.userId}
          testResult={testResult}
          usersList={usersList}
          h5pLatestStateUpdate={responseUserH5pCurrentStateList}
          jsonContent={jsonContent}
        />
      )
      : (
        <NonPresenterViewComponent
          currentUserId={currentUser?.userId}
          jsonContent={jsonContent}
          testResultDispatcher={testResultDispatcher}
          pushH5pCurrentState={pushUserH5pCurrentStateList}
          lastUpdateId={responseObject?.entryId}
          lastPayloadJson={responseObject?.payloadJson}
          replaceH5pCurrentState={replaceUserH5pCurrentStateList}
        />
      )
  );
}
