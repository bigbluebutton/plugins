import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, ExternalVideoVolumeUiDataNames, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { DecreaseVolumeOnSpeakProps, ExternalVideoMeetingSubscription } from './types';
import MEETING_SUBSCRIPTION from './subscription';

const intervalBetweenIteration = 100; // In milliseconds
const totalIterationsToDecrease = 10;
const finalVolumeTarget = 0.2;

function DecreaseVolumeOnSpeak(
  { pluginUuid: uuid }: DecreaseVolumeOnSpeakProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [isDecreasingVolume, setIsDecreasingVolume] = React.useState(false);
  const volumeSetByUser = React.useRef(1);
  const lastVolumeSetByMachine = React.useRef<number>(null);
  const volumeSetByMachine = React.useRef<number[]>([]);
  const externalVideoData = pluginApi.useCustomSubscription<ExternalVideoMeetingSubscription>(
    MEETING_SUBSCRIPTION,
  );
  const { value: isMuted } = pluginApi.useUiData(ExternalVideoVolumeUiDataNames.IS_VOLUME_MUTED, {
    value: false,
  });

  const setVolume = (volume: number) => {
    pluginApi.uiCommands.externalVideo.volume.set({
      volume,
    });
    volumeSetByMachine.current.push(volume);
  };

  const [isSomeoneTalking, setIsSomeoneTalking] = React.useState(false);

  const talkingIndicatorResult = pluginApi.useTalkingIndicator();

  const talkingIndicatorList = talkingIndicatorResult.data;

  const volumeFromUiDataHook = pluginApi.useUiData(ExternalVideoVolumeUiDataNames
    .CURRENT_VOLUME_VALUE, { value: 1 });

  useEffect(() => {
    if (
      volumeSetByMachine.current.findIndex(
        (vol) => volumeFromUiDataHook.value * 100 !== vol * 100,
      ) === -1
    ) {
      volumeSetByUser.current = volumeFromUiDataHook.value;
    }
  }, [volumeFromUiDataHook]);

  useEffect(() => {
    if (talkingIndicatorList?.some((userVoice) => userVoice.talking) !== isSomeoneTalking) {
      setIsSomeoneTalking(talkingIndicatorList?.some((userVoice) => userVoice.talking));
    }
  }, [talkingIndicatorResult]);

  useEffect(() => {
    if (isSomeoneTalking && !isDecreasingVolume
      && volumeSetByMachine.current.length < totalIterationsToDecrease
      && externalVideoData.data?.meeting[0]?.externalVideo?.playerPlaying
      && !isMuted) {
      setIsDecreasingVolume(true);
      const currentVolumeSetByUser = volumeSetByUser.current;
      const partToSubtract = (currentVolumeSetByUser * (
        1 - finalVolumeTarget)) / totalIterationsToDecrease;
      for (let i = 0; i < totalIterationsToDecrease; i += 1) {
        const vol = currentVolumeSetByUser - partToSubtract * i;
        const volumeToSet = Math.floor((vol) * 100);
        setTimeout(() => {
          setVolume(volumeToSet / 100);
          if (i === totalIterationsToDecrease - 1) {
            lastVolumeSetByMachine.current = volumeToSet / 100;
            setIsDecreasingVolume(false);
          }
        }, intervalBetweenIteration * i);
      }
    } else if (!isDecreasingVolume
      && !isSomeoneTalking && volumeSetByMachine.current.length >= totalIterationsToDecrease) {
      volumeSetByMachine.current = [];
      pluginApi.uiCommands.externalVideo.volume.set({
        volume: volumeSetByUser.current,
      });
    }
  }, [isSomeoneTalking, isDecreasingVolume]);

  return null;
}

export default DecreaseVolumeOnSpeak;
