import { CurrentUserData, DeletionFunction } from 'bigbluebutton-html-plugin-sdk';
import { DispatcherFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { DataChannelArrayMessages, PickedUser } from '../pick-random-user/types';

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
  dataChannelPickedUsers?: DataChannelArrayMessages<PickedUser>[];
  deletionFunction: DeletionFunction;
  dispatcherPickedUser: DispatcherFunction;
}
