import { CurrentUserData, DeletionFunction } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelArrayMessages, PickedUser } from '../pick-random-user/types';

export interface PickUserModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  users?: PickedUser[];
  pickedUser: PickedUser;
  handlePickRandomUser: () => void;
  currentUser: CurrentUserData;
  userFilterViewer: boolean;
  setUserFilterViewer: (filter: boolean) => void;
  dataChannelPickedUsers?: DataChannelArrayMessages<PickedUser>[];
  deletionFunction: DeletionFunction;
}
