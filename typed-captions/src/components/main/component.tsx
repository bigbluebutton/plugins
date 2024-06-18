import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  ActionButtonDropdownOption,
  ActionButtonDropdownSeparator,
  BbbPluginSdk,
  DataChannelTypes,
  GenericContentSidekickArea,
  PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { TypedCaptionsProps } from './types';
import { TypedCaptionsModal } from '../modal/component';
import { CaptionMenu } from '../../common/types';
import { TypedCaptionsSidekickArea } from '../typed-captions-sidekick-content/component';

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

  /// contentFunction, name, section, buttonIcon
  React.useEffect(() => {
    if (captionMenusResponseFromDataChannel?.data && currentUserResponse?.data?.role === 'MODERATOR') {
      const sidekickMenuComponentList = captionMenusResponseFromDataChannel?.data
        .map((menu) => new GenericContentSidekickArea({
          name: `Transcription (${menu.payloadJson.captionLocale})`,
          buttonIcon: 'closed_caption',
          section: 'Captions',
          open: true,
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <TypedCaptionsSidekickArea
                  captionLocale={menu.payloadJson.captionLocale}
                  uuid={uuid}
                />
              </React.StrictMode>,
            );
          },
        }));
      pluginApi.setGenericContentItems(sidekickMenuComponentList);
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
      pluginApi.setGenericContentItems([]);
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
      pluginApi={pluginApi}
      setIsOpen={setIsModalOpen}
    />
  );
}

export default TypedCaptions;
