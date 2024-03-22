import * as React from 'react';
import { useState, useEffect } from 'react';

import { BbbPluginSdk, PluginApi, RESET_DATA_CHANNEL } from 'bigbluebutton-html-plugin-sdk';
import {
  ModalInformationFromPresenter,
  PickRandomUserPluginProps,
  PickedUser,
  UsersMoreInformationGraphqlResponse,
} from './types';
import { USERS_MORE_INFORMATION } from './queries';
import { PickUserModal } from '../modal/component';
import { Role } from './enums';
import ActionButtonDropdownManager from '../extensible-areas/action-button-dropdown/component';

function PickRandomUserPlugin({ pluginUuid: uuid }: PickRandomUserPluginProps) {
  BbbPluginSdk.initialize(uuid);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pickedUser, setPickedUser] = useState<PickedUser | undefined>();
  const [userFilterViewer, setUserFilterViewer] = useState<boolean>(true);
  const [filterOutPresenter, setFilterOutPresenter] = useState<boolean>(true);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const currentUserInfo = pluginApi.useCurrentUser();
  const { data: currentUser } = currentUserInfo;
  const allUsersInfo = pluginApi
    .useCustomSubscription<UsersMoreInformationGraphqlResponse>(USERS_MORE_INFORMATION);
  const { data: allUsers } = allUsersInfo;

  const [pickedUserFromDataChannelResponse, dispatcherPickedUser, deletionFunction] = pluginApi.useDataChannel<PickedUser>('pickRandomUser');
  const [modalInformationFromPresenter, dispatchModalInformationFromPresenter, deleteModalInformationForPresenter] = pluginApi.useDataChannel<ModalInformationFromPresenter>('modalInformationFromPresenter');

  const pickedUserFromDataChannel = {
    data: {
      pluginDataChannelMessage: pickedUserFromDataChannelResponse?.data?.pluginDataChannelMessage,
    },
    loading: false,
  };

  useEffect(() => {
    const modalInformation = modalInformationFromPresenter
      .data?.pluginDataChannelMessage[0]?.payloadJson;
    if (modalInformation) {
      setFilterOutPresenter(modalInformation.skipPresenter);
      setUserFilterViewer(modalInformation.skipModerators);
    }
  }, [modalInformationFromPresenter]);

  const usersToBePicked: UsersMoreInformationGraphqlResponse = {
    user: allUsers?.user.filter((user) => {
      let roleFilter = true;
      if (userFilterViewer) roleFilter = user.role === Role.VIEWER;
      return roleFilter
          && pickedUserFromDataChannel
            .data?.pluginDataChannelMessage?.findIndex(
              (u) => u?.payloadJson?.userId === user?.userId,
            ) === -1;
    }).filter((user) => {
      if (filterOutPresenter) return !user.presenter;
      return true;
    }),
  };

  const handlePickRandomUser = () => {
    if (usersToBePicked && usersToBePicked.user.length > 0 && currentUser?.presenter) {
      const randomIndex = Math.floor(Math.random() * usersToBePicked.user.length);
      const randomlyPickedUser = usersToBePicked.user[randomIndex];
      dispatcherPickedUser(randomlyPickedUser);
    }
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    deleteModalInformationForPresenter([RESET_DATA_CHANNEL]);
    dispatchModalInformationFromPresenter<ModalInformationFromPresenter>({
      skipModerators: userFilterViewer,
      skipPresenter: filterOutPresenter,
    });
    if (currentUser?.presenter) dispatcherPickedUser(null);
    setShowModal(false);
  };

  useEffect(() => {
    if (pickedUserFromDataChannel.data
      && pickedUserFromDataChannel.data?.pluginDataChannelMessage?.length > 0) {
      const pickedUserToUpdate = pickedUserFromDataChannel
        .data?.pluginDataChannelMessage[
          pickedUserFromDataChannel.data.pluginDataChannelMessage.length - 1
        ];
      setPickedUser(pickedUserToUpdate?.payloadJson);
      if (pickedUserToUpdate?.payloadJson) setShowModal(true);
    } else if (pickedUserFromDataChannel.data
        && pickedUserFromDataChannel.data?.pluginDataChannelMessage?.length === 0) {
      setPickedUser(null);
      if (currentUser && !currentUser.presenter) setShowModal(false);
    }
  }, [pickedUserFromDataChannelResponse]);

  useEffect(() => {
    if (!pickedUser && !currentUser?.presenter) setShowModal(false);
  }, [pickedUser]);

  useEffect(() => {
    if (!currentUser?.presenter && dispatchModalInformationFromPresenter) handleCloseModal();
  }, [currentUser]);
  return (
    <>
      <PickUserModal
        {...{
          showModal,
          handleCloseModal,
          users: usersToBePicked?.user,
          pickedUser,
          handlePickRandomUser,
          currentUser,
          filterOutPresenter,
          setFilterOutPresenter,
          userFilterViewer,
          setUserFilterViewer,
          dataChannelPickedUsers: pickedUserFromDataChannel.data?.pluginDataChannelMessage,
          dispatcherPickedUser,
          deletionFunction,
        }}
      />
      <ActionButtonDropdownManager
        {...{
          pickedUser,
          currentUser,
          pluginApi,
          setShowModal,
          currentUserInfo,
        }}
      />
    </>
  );
}

export default PickRandomUserPlugin;
