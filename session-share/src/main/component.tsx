import * as React from 'react';
import { useEffect } from 'react';

import {
  ActionsBarButton, ActionsBarInterface, ActionsBarPosition, ActionsBarSeparator,
  BbbPluginSdk, GraphqlResponseWrapper, PluginApi, UsersBasicInfoResponseFromGraphqlWrapper 
} from 'bigbluebutton-html-plugin-sdk';
import { SessionSharePluginProps } from './types';
import { ShareModal } from '../config-modal/modal';

function SessionSharePlugin({
  pluginUuid: uuid,
}: SessionSharePluginProps): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [newJoinUrl, setNewJoinUrl] = React.useState('');

  // Toolbar button
  useEffect(() => {
    const buttonToUserListItem:
          ActionsBarInterface = new ActionsBarButton({
            icon: 'add',
            tooltip: 'Invite',
            onClick: () => {
              setModalOpen(true);
            },
            position: ActionsBarPosition.RIGHT,
          });
    const dropdownToUserListItem:
      ActionsBarInterface = new ActionsBarSeparator({
          position: ActionsBarPosition.RIGHT,
        });
    
    pluginApi.setActionsBarItems([dropdownToUserListItem, buttonToUserListItem]);
  }, []);

  // Handle popup confirmation
  const handleConfirm = async (shareType: string) => {
    let joinOptions = {};

    if(shareType === 'inviteUsers') {
      joinOptions = {fullName: null};
    }

    const joinUrl = await pluginApi.getJoinUrl(joinOptions);
    setNewJoinUrl(joinUrl);
  };


  return (
    <>
      <ShareModal isOpen={isModalOpen} newJoinUrl={newJoinUrl} onClose={() => { setModalOpen(false); setNewJoinUrl(null); } } onConfirm={handleConfirm} />
    </>
  );
}

export default SessionSharePlugin;
