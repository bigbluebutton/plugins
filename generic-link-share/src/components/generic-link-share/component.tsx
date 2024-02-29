import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ActionButtonDropdownOption,
  ActionButtonDropdownSeparator,
  BbbPluginSdk,
  GenericComponent,
  LayoutComponentListEnum,
  PluginApi,
  LayoutPresentatioAreaUiDataNames,
  UiLayouts,
} from 'bigbluebutton-html-plugin-sdk';

import GenericComponentLinkShare from '../generic-component/component';

import { DecreaseVolumeOnSpeakProps } from './types';
import { ModalToShareLink } from '../modal-to-share-link/component';

interface DataToGenericLink {
  isUrlSameForRole: boolean;
  url: string;
  viewerUrl?: string
}

function GenericLinkShare(
  { pluginUuid: uuid }: DecreaseVolumeOnSpeakProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const [showModal, setShowModal] = useState<boolean>(false);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [showingPresentationContent, setShowingPresentationContent] = useState(false);
  const { data: currentUser } = pluginApi.useCurrentUser();
  const [link, setLink] = useState<string>(null);
  const [isUrlSameForRole, setIsUrlSameForRole] = useState(true);
  const [data, dispatcher] = pluginApi.useDataChannel<DataToGenericLink>('urlToGenericLink');
  const [linkError, setLinkError] = useState<string>(null);

  const currentLayout = pluginApi.useUiData(LayoutPresentatioAreaUiDataNames.CURRENT_ELEMENT, {
    isOpen: true,
    currentElement: UiLayouts.ONLY_PRESENTATION,
  });

  useEffect(() => {
    if (currentLayout?.currentElement !== UiLayouts.GENERIC_COMPONENT) {
      setShowingPresentationContent(false);
    } else setShowingPresentationContent(true);
  }, [currentLayout]);

  const handleCheckboxChange = () => {
    setIsUrlSameForRole((value) => !value);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setLinkError(null);
  };

  const handleChangePresentationAreaContent = (changeToShare: boolean) => {
    if (!changeToShare) {
      pluginApi.uiCommands.layout.unset(LayoutComponentListEnum.GENERIC_COMPONENT);
      setShowingPresentationContent(false);
    } else {
      pluginApi.uiCommands.layout.set(LayoutComponentListEnum.GENERIC_COMPONENT);
      setShowingPresentationContent(true);
    }
  };

  const handleSendLinkToIframe = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let objectToDispatch: DataToGenericLink;
    const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/g;
    if (isUrlSameForRole) {
      const target = e.target as typeof e.target & {
        link: { value: string };
      };
      if (target.link.value.match(regex)) {
        objectToDispatch = {
          isUrlSameForRole: true,
          url: target.link.value,
        };
      }
    } else {
      const target = e.target as typeof e.target & {
        link: { value: string };
        viewerLink: { value: string };
      };
      if (target.link.value.match(regex) && target.viewerLink.value.match(regex)) {
        objectToDispatch = {
          isUrlSameForRole: false,
          url: target.link.value,
          viewerUrl: target.viewerLink.value,
        };
      }
    }
    if (objectToDispatch) {
      dispatcher(objectToDispatch);
      setShowModal(false);
    } else {
      setLinkError('Link is malformed, please insert a valid one');
    }
  };

  useEffect(() => {
    if (
      data.data?.pluginDataChannelMessage
      && data
        .data?.pluginDataChannelMessage[data.data.pluginDataChannelMessage.length - 1]?.payloadJson
    ) {
      const isUrlTheSame = data
        .data?.pluginDataChannelMessage[
          data.data.pluginDataChannelMessage.length - 1
        ]?.payloadJson.isUrlSameForRole;
      if (!isUrlTheSame && !currentUser.presenter) {
        setLink(data
          .data?.pluginDataChannelMessage[
            data.data.pluginDataChannelMessage.length - 1
          ]?.payloadJson.viewerUrl);
        handleChangePresentationAreaContent(true);
      } else {
        setLink(data
          .data?.pluginDataChannelMessage[
            data.data.pluginDataChannelMessage.length - 1
          ]?.payloadJson.url);
        handleChangePresentationAreaContent(true);
      }
    } else if (
      data.data?.pluginDataChannelMessage
      && !data
        .data?.pluginDataChannelMessage[data.data.pluginDataChannelMessage.length - 1]?.payloadJson
    ) {
      setLink(null);
      handleChangePresentationAreaContent(false);
    }
  }, [data]);

  useEffect(() => {
    if (currentUser?.presenter) {
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator(),
        new ActionButtonDropdownOption({
          label: showingPresentationContent ? 'Remove link share' : 'Share link',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: showingPresentationContent ? () => {
            dispatcher(null);
            setShowingPresentationContent(false);
          } : () => {
            setShowModal(true);
          },
        }),
      ]);
    }
  }, [currentUser, showingPresentationContent]);

  useEffect(() => {
    if (link && link !== '') {
      pluginApi.setGenericComponents([
        new GenericComponent({
          contentFunction: (element: HTMLElement) => {
            const root = ReactDOM.createRoot(element);
            root.render(
              <React.StrictMode>
                <GenericComponentLinkShare
                  link={link}
                />
              </React.StrictMode>,
            );
          },
        }),
      ]);
    }
  }, [link]);

  return (
    <ModalToShareLink
      {...{
        showModal,
        handleCloseModal,
        linkError,
        handleSendLinkToIframe,
        isUrlSameForRole,
        handleCheckboxChange,
        setLinkError,
      }}
    />
  );
}

export default GenericLinkShare;
