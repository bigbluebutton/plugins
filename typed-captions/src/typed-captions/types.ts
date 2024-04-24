interface TypedCaptionsProps {
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

export { TypedCaptionsProps, ExternalVideoMeetingSubscription };
