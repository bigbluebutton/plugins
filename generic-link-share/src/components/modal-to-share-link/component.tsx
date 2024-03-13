import * as React from 'react';
import * as ReactModal from 'react-modal';

import './style.css';
import { ModalToShareLinkProps } from './types';

export function ModalToShareLink(props: ModalToShareLinkProps) {
  const {
    previousModalState,
    setPreviousModalState,
    showModal,
    handleCloseModal,
    linkError,
    handleSendLinkToIframe,
    handleCheckboxChange,
    setLinkError,
  } = props;

  const {
    isUrlSameForRole = true,
    url: incomingUrl,
    viewerUrl: incomingViewerUrl,
  } = previousModalState;
  const url = incomingUrl || '';
  const viewerUrl = incomingViewerUrl || '';
  return (
    <ReactModal
      className="plugin-modal"
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={handleCloseModal}
    >
      <div
        style={{
          width: '100%', height: '100%', alignItems: 'flex-start', display: 'flex', flexDirection: 'column',
        }}
      >
        {
          !linkError
            ? (
              <>
                <button
                  type="button"
                  className="clickable-close"
                  onClick={() => {
                    handleCloseModal();
                  }}
                >
                  <i
                    className="icon-bbb-close"
                  />
                </button>
                <h1>Share your link</h1>
                <form
                  className="form-to-send-url"
                  onSubmit={handleSendLinkToIframe}
                >
                  <label
                    className="form-to-send-url-item form-checkbox-item"
                    htmlFor="same-links-for-pres-viewer"
                  >
                    <input
                      id="same-links-for-pres-viewer"
                      type="checkbox"
                      name="isUrlSameForRole"
                      checked={isUrlSameForRole}
                      onChange={handleCheckboxChange}
                    />
                    <span className="label-form label-form-checkbox">Same URL for presenter and viewer</span>
                  </label>
                  <label
                    htmlFor="link-receiver"
                    className="form-to-send-url-item"
                  >
                    <span className="label-form">{isUrlSameForRole ? 'URL: ' : 'Presenter Url: '}</span>
                    <input
                      className="label-form-text-input"
                      id="link-receiver"
                      value={url}
                      type="text"
                      name="link"
                      placeholder="https://..."
                      onChange={(e) => {
                        setPreviousModalState((p) => ({
                          isUrlSameForRole: p?.isUrlSameForRole,
                          url: e?.target?.value,
                          viewerUrl: p?.viewerUrl,
                        }));
                      }}
                    />
                  </label>
                  {
                    !isUrlSameForRole
                      ? (
                        <label
                          htmlFor="extra-link-receiver"
                          className="form-to-send-url-item"
                        >
                          <span className="label-form">Viewer URL (It can be set later on): </span>
                          <input
                            className="label-form-text-input"
                            id="extra-link-receiver"
                            value={viewerUrl}
                            type="text"
                            name="viewerLink"
                            placeholder="https://..."
                            onChange={(e) => {
                              setPreviousModalState((p) => ({
                                isUrlSameForRole: p?.isUrlSameForRole,
                                url: p?.url,
                                viewerUrl: e?.target?.value,
                              }));
                            }}
                          />
                        </label>
                      ) : null
                  }
                  <input className="button-style sending-button" type="submit" value="Send" />
                </form>
              </>
            ) : (
              <div>
                <h1>Error: </h1>
                <div className="error-content-block">
                  <span className="error-span">{linkError}</span>
                  <button type="button" className="button-style" onClick={() => { setLinkError(null); }}>clear</button>
                </div>
              </div>
            )
        }
      </div>
    </ReactModal>
  );
}
