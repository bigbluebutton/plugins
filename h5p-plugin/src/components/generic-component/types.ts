import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';

export interface GenericComponentRenderFunctionProps {
  jsonContent: string;
  currentUser: CurrentUserData;
  linkThatGeneratedJsonContent: string;
  pluginUuid: string;
}

export interface TestResultObject {
  score: number
}

export interface TestResult {
  userId: string;
  testResultObject: number;
  testResultMaximumScore: number;
}

export interface MoreInfoUser {
  presenter: boolean;
  userId: string;
  name: string;
  role: string;
  color: string;
}

export interface UsersMoreInformationGraphqlResponse {
  user: MoreInfoUser[];
}
