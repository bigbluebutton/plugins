import { CurrentUserData, DeleteEntryFunction } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelEntryResponseType, PushEntryFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { PickedUser } from '../pick-random-user/types';

export interface PickUserModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  users?: PickedUser[];
  pickedUser: PickedUser;
  handlePickRandomUser: () => void;
  currentUser: CurrentUserData;
  filterOutPresenter: boolean,
  setFilterOutPresenter: (filter: boolean) => void,
  userFilterViewer: boolean;
  setUserFilterViewer: (filter: boolean) => void;
  dataChannelPickedUsers?: DataChannelEntryResponseType<PickedUser>[];
  deletionFunction: DeleteEntryFunction;
  dispatcherPickedUser: PushEntryFunction;
}
