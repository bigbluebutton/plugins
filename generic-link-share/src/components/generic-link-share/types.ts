interface DecreaseVolumeOnSpeakProps {
    pluginName: string,
    pluginUuid: string,
}

interface ExternalVideoMeetingSubscription {
    meeting: {
        externalVideo: {
            playerPlaying: boolean
            externalVideoUrl: string
        }
    }[]
}

export { DecreaseVolumeOnSpeakProps, ExternalVideoMeetingSubscription };
