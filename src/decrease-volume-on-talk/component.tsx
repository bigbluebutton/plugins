import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { DecreaseVolumeOnSpeakProps } from './types';

function DecreaseVolumeOnSpeak(
  { pluginUuid: uuid }: DecreaseVolumeOnSpeakProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const talkingIndicatorResult = pluginApi.useTalkingIndicator();

  const talkingIndicatorList = talkingIndicatorResult.data;

  useEffect(() => {
    if (talkingIndicatorList?.some((userVoice) => userVoice.talking)) {
      pluginApi.uiCommands.externalVideo.volume.set({
        volume: 0.2,
      });
    } else {
      pluginApi.uiCommands.externalVideo.volume.set({
        volume: 1,
      });
    }
  }, [talkingIndicatorResult]);

  return null;
}

export default DecreaseVolumeOnSpeak;
