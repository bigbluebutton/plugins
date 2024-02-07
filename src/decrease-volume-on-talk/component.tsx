import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { DecreaseVolumeOnSpeakProps } from './types';

function DecreaseVolumeOnSpeak(
  { pluginUuid: uuid }: DecreaseVolumeOnSpeakProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const intervalId = React.useRef<NodeJS.Timeout>(null);

  const talkingIndicatorResult = pluginApi.useTalkingIndicator();

  const talkingIndicatorList = talkingIndicatorResult.data;

  useEffect(() => {
    if (talkingIndicatorList?.some((userVoice) => userVoice.talking) && !intervalId.current) {
      let counter = 1;
      const total = 10;
      const finalVolume = 0.2;
      const percentage = (1 - 1 * finalVolume) / total;
      intervalId.current = setInterval(() => {
        pluginApi.uiCommands.externalVideo.volume.set({
          volume: 1 - counter * percentage,
        });
        if (counter === total) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
        counter += 1;
      }, 100);
    } else if (
      !talkingIndicatorList?.some((userVoice) => userVoice.talking) && !intervalId.current) {
      pluginApi.uiCommands.externalVideo.volume.set({
        volume: 1,
      });
    }
  }, [talkingIndicatorResult]);

  return null;
}

export default DecreaseVolumeOnSpeak;
