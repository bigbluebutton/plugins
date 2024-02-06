import { CurrentUserData, GraphqlResponseWrapper, PluginApi } from 'bigbluebutton-html-plugin-sdk';

export interface ActionButtonDropdownManagerProps {
    currentUser: CurrentUserData;
    pluginApi: PluginApi;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentUserInfo: GraphqlResponseWrapper<CurrentUserData>;
}
