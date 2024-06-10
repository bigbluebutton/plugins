import { GraphqlResponseWrapper } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { MoreInfoUser, TestResult, UserH5pCurrentState } from '../types';

export interface PresenterViewComponentProps {
    currentUserId: string;
    testResult: GraphqlResponseWrapper<DataChannelEntryResponseType<TestResult>[]>;
    usersList: MoreInfoUser[];
    h5pLatestStateUpdate: GraphqlResponseWrapper<
        DataChannelEntryResponseType<UserH5pCurrentState>[]>;
    jsonContent: string;
}
