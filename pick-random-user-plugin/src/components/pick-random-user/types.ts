export interface PickedUser {
    presenter: boolean;
    userId: string;
    name: string;
    role: string;
    color: string;
}

export interface PickRandomUserPluginProps {
    pluginName: string,
    pluginUuid: string,
}

export interface UsersMoreInformationGraphqlResponse {
    user: PickedUser[];
}

export interface ModalInformationFromPresenter {
    skipModerators: boolean;
    skipPresenter: boolean;
}

export interface DataChannelArrayMessages <T> {
    createdAt: string;
    dataChannel: string;
    fromUserId: string;
    messageId: string;
    payloadJson: T;
    pluginName: string;
    toRoles: string[];
}

export interface DataChannelPickedUserResponse {
    pluginDataChannelMessage: DataChannelArrayMessages<PickedUser>[];
}

export interface DataChannelLastResetTimeResponse {
    pluginDataChannelMessage: DataChannelArrayMessages<Date>[];
}
