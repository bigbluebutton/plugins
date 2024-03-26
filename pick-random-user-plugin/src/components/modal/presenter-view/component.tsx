import * as React from 'react';
import { RESET_DATA_CHANNEL } from 'bigbluebutton-html-plugin-sdk';

import { DataChannelArrayMessages, PickedUser } from '../../pick-random-user/types';
import { PresenterViewComponentProps } from './types';

const MAX_NAMES_TO_SHOW = 3;

const makeHorizontalListOfNames = (list?: PickedUser[]) => {
  const length = list?.length;
  const formattedList = list?.filter((_, index) => {
    if (length > MAX_NAMES_TO_SHOW) return index < MAX_NAMES_TO_SHOW;
    return true;
  }).reduce((accumulator, currentValue) => ((accumulator !== '') ? `${accumulator}, ${currentValue.name}` : currentValue.name), '');
  if (length > MAX_NAMES_TO_SHOW) return `${formattedList}...`;
  return formattedList;
};

const makeVerticalListOfNames = (
  list?: DataChannelArrayMessages<PickedUser>[],
) => list?.filter((u) => !!u.payloadJson).map((u) => {
  const time = new Date(u.createdAt);
  return (
    <li key={u.payloadJson.userId}>
      {u.payloadJson.name}
      {' '}
      (
      {time.getHours().toString().padStart(2, '0')}
      :
      {time.getMinutes().toString().padStart(2, '0')}
      )
    </li>
  );
});

export function PresenterViewComponent(props: PresenterViewComponentProps) {
  const {
    filterOutPresenter,
    setFilterOutPresenter,
    userFilterViewer,
    setUserFilterViewer,
    deletionFunction,
    handlePickRandomUser,
    dataChannelPickedUsers,
    pickedUser,
    users,
    userRole,
  } = props;

  return (
    <div
      style={{
        width: '100%', height: '100%', alignItems: 'flex-start', display: 'flex', flexDirection: 'column',
      }}
    >
      <div className="moderator-view-wrapper">
        <p className="moderator-view-label">Options</p>
        <p className="moderator-view-value">
          <label className="check-box-label-container" htmlFor="skipModerators">
            <input
              type="checkbox"
              id="skipModerators"
              checked={userFilterViewer}
              onChange={() => {
                setUserFilterViewer(!userFilterViewer);
              }}
              name="options"
              value="skipModerators"
            />
            <span className="check-box-label">Skip moderators</span>
          </label>
          <label className="check-box-label-container" htmlFor="skipPresenter">
            <input
              type="checkbox"
              id="skipPresenter"
              checked={filterOutPresenter}
              onChange={() => {
                setFilterOutPresenter(!filterOutPresenter);
              }}
              name="options"
              value="skipPresenter"
            />
            <span className="check-box-label">Skip Presenter</span>
          </label>
        </p>
      </div>
      <div className="moderator-view-wrapper">
        <p className="moderator-view-label">Available for selection</p>
        <p className="moderator-view-value">
          {users?.length}
          {' '}
          {userRole}
          :
          {' '}
          {makeHorizontalListOfNames(users)}
        </p>
      </div>
      <div className="moderator-view-wrapper">
        <div className="moderator-view-wrapper-title">
          <p className="moderator-view-label">Previously picked</p>
          <button
            type="button"
            className="clickable"
            onClick={() => {
              deletionFunction([RESET_DATA_CHANNEL]);
            }}
          >
            Clear All
          </button>
        </div>
        <ul className="moderator-view-list">
          {
            makeVerticalListOfNames(dataChannelPickedUsers)
          }
        </ul>
      </div>
      {
        users?.length > 0 ? (
          <button
            type="button"
            className="button-style"
            onClick={() => {
              handlePickRandomUser();
            }}
          >
            {
            (pickedUser) ? 'Pick again' : `Pick ${userRole}`
            }
          </button>
        ) : (
          <p>
            No
            {' '}
            {userRole}
            {' '}
            available to randomly pick from
          </p>
        )
      }
    </div>
  );
}
