import { LatestH5pStateItem } from '../h5p-player-manager/types';

export interface H5pPresenterComponentProps {
  jsonContent: string;
  indexOfCurrentStateInList: number;
  stateListLength: number;
  currentH5pStateToBeApplied: object;
  setLatestH5pStates: React.Dispatch<React.SetStateAction<LatestH5pStateItem[]>>;
  idOfCurrentState: string;
}
