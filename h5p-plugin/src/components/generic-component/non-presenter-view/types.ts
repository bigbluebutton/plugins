import { ReplaceEntryFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { PushEntryFunction } from 'bigbluebutton-html-plugin-sdk';
import { TestResult, UserH5pCurrentState } from '../types';

export interface NonPresenterViewComponentProps {
  jsonContent: string;
  testResultDispatcher: PushEntryFunction<TestResult>;
  currentUserId: string;
  pushH5pCurrentState: PushEntryFunction<UserH5pCurrentState>;
  lastUpdateId: string;
  lastPayloadJson: UserH5pCurrentState;
  replaceH5pCurrentState: ReplaceEntryFunction<UserH5pCurrentState>;
}
