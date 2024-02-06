import * as React from 'react';
import { PickedUserViewComponentProps } from './types';

export function PickedUserViewComponent(props: PickedUserViewComponentProps) {
  const {
    title,
    pickedUser,
    currentUser,
    setShowPresenterView,
  } = props;

  const handleBackToPresenterView = () => {
    if (currentUser?.presenter) {
      setShowPresenterView(true);
    }
  };
  return (
    <div
      style={{
        width: '100%', height: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column',
      }}
    >
      <h1 className="title">{title}</h1>
      {
                (pickedUser) ? (
                  <>
                    <div
                      className="modal-avatar"
                      style={{ backgroundColor: `${pickedUser?.color}` }}
                    >
                      {pickedUser?.name.slice(0, 2)}
                    </div>
                    <p className="user-name">{pickedUser?.name}</p>
                  </>
                ) : null
            }
      {
                (currentUser?.presenter) ? (
                  <button type="button" onClick={handleBackToPresenterView}>back</button>
                ) : null
            }
    </div>
  );
}
