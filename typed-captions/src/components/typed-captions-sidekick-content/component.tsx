import { BbbPluginSdk, DataChannelTypes, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';

// import 'react-chat-elements/dist/main.css';

// import { ChatItem, MessageBox, Input } from 'react-chat-elements';

import Styled from './styles';
import { TypedCaptionsInput } from './input-captions/component';
import { CaptionMessage } from '../common/types';
import { CaptionMessagesList } from './caption-messages-list/component';
import { PanelState } from '../types';

interface GenericComponentExampleProps {
  uuid: string;
  setIsPanelOpen: (value: PanelState) => void;
  captionLocale: string;
}

export function TypedCaptionsSidekickContent(props: GenericComponentExampleProps) {
  const {
    setIsPanelOpen,
    uuid,
    captionLocale,
  } = props;
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  React.useEffect(() => {
    setIsPanelOpen({
      isPanelOpen: true,
      lastSetByGenericComponent: true,
    });
  }, []);
  const [
    captionMessagesResponseFromDataChannel,
    pushCaptionMessagesResponseFromDataChannel,
  ] = pluginApi.useDataChannel<CaptionMessage>('typed-captions-data-channel', DataChannelTypes.All_ITEMS, `caption-messages-${captionLocale}`);

  return (
    <Styled.CaptionsWrapper>
      <Styled.HeaderWrapper>
        <Styled.SidekickMenuMinimizer
          onClick={() => {
            setIsPanelOpen({
              isPanelOpen: false,
              lastSetByGenericComponent: true,
            });
          }}
        >
          <i className="icon-bbb-left_arrow" />
          Transcription
        </Styled.SidekickMenuMinimizer>
      </Styled.HeaderWrapper>
      <CaptionMessagesList
        captionMessagesResponse={captionMessagesResponseFromDataChannel?.data}
      />
      <TypedCaptionsInput
        pluginApi={pluginApi}
        captionLocale={captionLocale}
        pushCaptionMessages={pushCaptionMessagesResponseFromDataChannel}
      />
    </Styled.CaptionsWrapper>
  );
}
