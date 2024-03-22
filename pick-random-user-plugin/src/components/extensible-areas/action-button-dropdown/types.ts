import { CurrentUserData, GraphqlResponseWrapper, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { PickedUser } from '../../pick-random-user/types';

export interface ActionButtonDropdownManagerProps {
    pickedUser: PickedUser;
    currentUser: CurrentUserData;
    pluginApi: PluginApi;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentUserInfo: GraphqlResponseWrapper<CurrentUserData>;
}
