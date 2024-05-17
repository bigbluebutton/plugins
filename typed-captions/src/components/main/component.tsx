import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  ActionButtonDropdownOption,
  ActionButtonDropdownSeparator,
  BbbPluginSdk,
  DataChannelTypes,
  GenericComponentSidekickContent,
  PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { TypedCaptionsProps } from './types';
import { TypedCaptionsModal } from '../modal/component';
import { CaptionMenu } from '../../common/types';
import { TypedCaptionsSidekickContent } from '../typed-captions-sidekick-content/component';

function TypedCaptions(
  { pluginUuid: uuid }: TypedCaptionsProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const [
    captionMenusResponseFromDataChannel,
    pushCaptionMenuResponseFromDataChannel,
    excludeCaptionMenuResponseFromDataChannel,
  ] = pluginApi.useDataChannel<CaptionMenu>('typed-captions-data-channel', DataChannelTypes.All_ITEMS, 'caption-menus');

  const [captionLocale, setCaptionLocale] = React.useState('');

  const currentUserResponse = pluginApi.useCurrentUser();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onRequestClose = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (captionMenusResponseFromDataChannel?.data && currentUserResponse?.data?.role === 'MODERATOR') {
      const totalCaptionsLength = captionMenusResponseFromDataChannel?.data?.length;
      const sidekickMenuComponentList = captionMenusResponseFromDataChannel?.data
        .map((menu, index) => new GenericComponentSidekickContent({
          menuItemContentMessage: `Transcription (${menu.payloadJson.captionLocale})`,
          menuItemIcon: 'closed_caption',
          menuItemTitle: 'Captions',
          open: (captionLocale !== '') ? (menu.payloadJson.captionLocale === captionLocale) : index === totalCaptionsLength - 1,
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <TypedCaptionsSidekickContent
                  captionLocale={menu.payloadJson.captionLocale}
                  uuid={uuid}
                />
              </React.StrictMode>,
            );
          },
        }));
      pluginApi.setGenericComponents(sidekickMenuComponentList);
    }
  }, [captionMenusResponseFromDataChannel]);

  React.useEffect(() => {
    if (currentUserResponse?.data?.role === 'MODERATOR') {
      let captionLocaleFromMenus = '';
      if (captionLocale === '') {
        captionMenusResponseFromDataChannel?.data?.forEach((item) => {
          if (item.fromUserId === currentUserResponse?.data?.userId) {
            setCaptionLocale(item.payloadJson.captionLocale);
            captionLocaleFromMenus = item.payloadJson.captionLocale;
          }
        });
      }
      const entryIdToRemove = captionMenusResponseFromDataChannel?.data?.filter(
        (item) => item.payloadJson.captionLocale === captionLocale
        || captionLocaleFromMenus === item.payloadJson.captionLocale,
      )[0]?.entryId;
      let actionButtonDropdownOnClick = () => {
        excludeCaptionMenuResponseFromDataChannel([entryIdToRemove]);
      };
      let actionButtonDropdownLabel = 'Remove typed closed captions';
      if (!entryIdToRemove) {
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
  }, [currentUserResponse, captionMenusResponseFromDataChannel]);

  return (
    <TypedCaptionsModal
      availableCaptionMenus={captionMenusResponseFromDataChannel?.data}
      pushCaptionMenu={pushCaptionMenuResponseFromDataChannel}
      captionLocale={captionLocale}
      setCaptionLocale={setCaptionLocale}
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      setIsOpen={setIsModalOpen}
    />
  );
}

export default TypedCaptions;
