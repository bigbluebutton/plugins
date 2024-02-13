import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, ExternalVideoVolumeEventsNames, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { DecreaseVolumeOnSpeakProps, ExternalVideoMeetingSubscription } from './types';
import MEETING_SUBSCRIPTION from './subscription';

function DecreaseVolumeOnSpeak(
  { pluginUuid: uuid }: DecreaseVolumeOnSpeakProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const intervalId = React.useRef<NodeJS.Timeout>(null);
  const volumeSetByUser = React.useRef(1);
  const volumeSetByMachine = React.useRef(1);
  const externalVideoData = pluginApi.useCustomSubscription<ExternalVideoMeetingSubscription>(
    MEETING_SUBSCRIPTION,
  );

  const setVolume = (volume: number) => {
    pluginApi.uiCommands.externalVideo.volume.set({
      volume,
    });
    volumeSetByMachine.current = volume;
  };

  const [isSomeoneTalking, setIsSomeoneTalking] = React.useState(false);

  const talkingIndicatorResult = pluginApi.useTalkingIndicator();

  const talkingIndicatorList = talkingIndicatorResult.data;

  pluginApi.useUiEvent(
    ExternalVideoVolumeEventsNames.VOLUME_VALUE_CHANGED,
    (value) => {
      if (value.detail.value * 100 !== volumeSetByMachine.current * 100) {
        volumeSetByUser.current = value.detail.value;
      }
    },
  );

  useEffect(() => {
    if (talkingIndicatorList?.some((userVoice) => userVoice.talking) !== isSomeoneTalking) {
      setIsSomeoneTalking(talkingIndicatorList?.some((userVoice) => userVoice.talking));
    }
  }, [talkingIndicatorResult]);

  useEffect(() => {
    if (isSomeoneTalking && !intervalId.current
      && externalVideoData.data?.meeting[0]?.externalVideo?.playerPlaying) {
      let counter = 1;
      const total = 10;
      const finalVolume = 0.2;
      const partToSubtract = (
        volumeSetByUser.current - volumeSetByUser.current * finalVolume) / total;
      intervalId.current = setInterval(() => {
        const volumeToSet = Math.floor((volumeSetByUser.current - counter * partToSubtract) * 100);
        setVolume(volumeToSet / 100);
        if (counter === total) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
        counter += 1;
      }, 100);
    } else if (
      !isSomeoneTalking && !intervalId.current) {
      setVolume(volumeSetByUser.current);
    }
  }, [isSomeoneTalking]);

  return null;
}

export default DecreaseVolumeOnSpeak;
