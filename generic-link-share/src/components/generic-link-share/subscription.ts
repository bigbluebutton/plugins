const MEETING_SUBSCRIPTION = `
subscription MeetingSubscription {
    meeting {
        externalVideo {
            playerPlaying
            externalVideoUrl
        }
    }
}
`;

export default MEETING_SUBSCRIPTION;
