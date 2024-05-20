import { GraphqlResponseWrapper } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { MoreInfoUser, TestResult } from '../types';

export interface PresenterViewerRenderFunctionProps {
    currentUserId: string;
    testResult: GraphqlResponseWrapper<DataChannelEntryResponseType<TestResult>[]>;
    usersList: MoreInfoUser[];
}
