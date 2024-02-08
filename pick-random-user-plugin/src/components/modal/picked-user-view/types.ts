import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';
import { DispatcherFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { PickedUser } from '../../pick-random-user/types';

export interface PickedUserViewComponentProps {
    title: string;
    pickedUser: PickedUser;
    currentUser: CurrentUserData;
    setShowPresenterView: React.Dispatch<React.SetStateAction<boolean>>;
    dispatcherPickedUser: DispatcherFunction
}
