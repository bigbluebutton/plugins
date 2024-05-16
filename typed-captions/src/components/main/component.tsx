import * as React from 'react';

import {
  ActionButtonDropdownOption,
  ActionButtonDropdownSeparator,
  BbbPluginSdk,
  PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { TypedCaptionsProps } from './types';
import { TypedCaptionsModal } from '../modal/component';
import { PanelState } from '../types';

function TypedCaptions(
  { pluginUuid: uuid }: TypedCaptionsProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const [sidekickMenuMounted, setSidekickMenuMounted] = React.useState(false);

  const currentUserResponse = pluginApi.useCurrentUser();
  const [panelState, setPanelState] = React.useState<PanelState>({
    isPanelOpen: true,
    lastSetByGenericComponent: false,
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onRequestClose = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (currentUserResponse?.data.role === 'MODERATOR') {
      let actionButtonDropdownOnClick = () => {
        setSidekickMenuMounted(false);
        setPanelState({ isPanelOpen: true, lastSetByGenericComponent: false });
        pluginApi.setGenericComponents([]);
      };
      let actionButtonDropdownLabel = 'Remove typed closed captions';
      if (!sidekickMenuMounted) {
        actionButtonDropdownLabel = 'Write closed captions';
        actionButtonDropdownOnClick = () => {
          setIsModalOpen(true);
        };
      }
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator(),
        new ActionButtonDropdownOption({
          icon: 'closed_caption',
          label: actionButtonDropdownLabel,
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: actionButtonDropdownOnClick,
        }),
      ]);
    } else {
      pluginApi.setActionButtonDropdownItems([]);
      pluginApi.setGenericComponents([]);
    }
  }, [sidekickMenuMounted, currentUserResponse]);

  return (
    <TypedCaptionsModal
      currentUserRole={currentUserResponse?.data.role}
      sidekickMenuMounted={sidekickMenuMounted}
      panelState={panelState}
      setPanelState={setPanelState}
      setSidekickMenuMounted={setSidekickMenuMounted}
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      setIsOpen={setIsModalOpen}
      uuid={uuid}
      pluginApi={pluginApi}
    />
  );
}

export default TypedCaptions;
