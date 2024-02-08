import { DeletionFunction } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelArrayMessages, PickedUser } from '../../pick-random-user/types';

export interface PresenterViewComponentProps {
    filterOutPresenter: boolean;
    setFilterOutPresenter: (filter: boolean) => void;
    userFilterViewer: boolean;
    setUserFilterViewer: (filter: boolean) => void;
    deletionFunction: DeletionFunction;
    handlePickRandomUser: () => void;
    dataChannelPickedUsers?: DataChannelArrayMessages<PickedUser>[];
    pickedUser: PickedUser;
    users?: PickedUser[];
    userRole: string;
}
