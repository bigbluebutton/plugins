import { BbbPluginSdk, DataChannelTypes, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';

import Styled from './styles';
import { TypedCaptionsInput } from './input-captions/component';
import { CaptionMessage } from '../../common/types';
import { CaptionMessagesList } from './caption-messages-list/component';

interface GenericContentExampleProps {
  uuid: string;
  captionLocale: string;
}

export function TypedCaptionsSidekickArea(props: GenericContentExampleProps) {
  const {
    uuid,
    captionLocale,
  } = props;
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [
    captionMessagesResponseFromDataChannel,
    pushCaptionMessagesResponseFromDataChannel,
  ] = pluginApi.useDataChannel<CaptionMessage>('typed-captions-data-channel', DataChannelTypes.All_ITEMS, `caption-messages-${captionLocale}`);

  return (
    <Styled.CaptionsWrapper>
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
