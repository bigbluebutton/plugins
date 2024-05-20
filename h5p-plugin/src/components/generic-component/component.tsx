import { BbbPluginSdk, DataChannelTypes, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import { GenericComponentRenderFunctionProps, TestResult, UsersMoreInformationGraphqlResponse } from './types';
import H5pContentRenderFunction from './non-presenter-view/component';
import PresenterViewerRenderFunction from './presenter-view/component';
import { USERS_MORE_INFORMATION } from './subscriptions';

export function GenericComponentRenderFunction(props: GenericComponentRenderFunctionProps) {
  const {
    jsonContent, currentUser,
    pluginUuid, linkThatGeneratedJsonContent,
  } = props;

  const currentUserPresenter = currentUser?.presenter;
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

  // TODO: Refactor the test results to be just a request done for an external server to be
  // validated and all
  const [testResult, testResultDispatcher] = pluginApi.useDataChannel<TestResult>('testResult', DataChannelTypes.All_ITEMS, linkThatGeneratedJsonContent);

  const allUsersInfo = pluginApi.useCustomSubscription<UsersMoreInformationGraphqlResponse>(
    USERS_MORE_INFORMATION,
  );
  const usersList = allUsersInfo?.data?.user;
  return (
    currentUserPresenter
      ? (
        <PresenterViewerRenderFunction
          currentUserId={currentUser?.userId}
          testResult={testResult}
          usersList={usersList}
        />
      )
      : (
        <H5pContentRenderFunction
          currentUserId={currentUser?.userId}
          jsonContent={jsonContent}
          testResultDispatcher={testResultDispatcher}
        />
      )
  );
}
