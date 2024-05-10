import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { DeleteEntryFunction } from 'bigbluebutton-html-plugin-sdk';
import { PickedUser } from '../../pick-random-user/types';

export interface PresenterViewComponentProps {
    filterOutPresenter: boolean;
    setFilterOutPresenter: (filter: boolean) => void;
    userFilterViewer: boolean;
    setUserFilterViewer: (filter: boolean) => void;
    deletionFunction: DeleteEntryFunction;
    handlePickRandomUser: () => void;
    dataChannelPickedUsers?: DataChannelEntryResponseType<PickedUser>[];
    pickedUser: PickedUser;
    users?: PickedUser[];
    userRole: string;
}
