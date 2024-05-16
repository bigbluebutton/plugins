import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { getSpeechVoices } from './service';
import Styled from './styles';
import { Locale, PanelState } from '../types';
import LocalesDropdown from './locales-dropdown/component';
import { TypedCaptionsSidekickContent } from '../typed-captions-sidekick-content/component';
import './styles.css';
import { AVAILABLE_LOCALES } from './constants';

interface TypedCaptionsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setIsOpen: (value: boolean) => void;
  uuid: string;
  sidekickMenuMounted: boolean;
  pluginApi: BbbPluginSdk.PluginApi;
  setSidekickMenuMounted: (value: boolean) => void,
  panelState: PanelState;
  setPanelState: (value: PanelState) => void;
  currentUserRole: string;
}

const TIMEOUT_RENDER_ERROR = 3000;

const intlMessages = {
  start: 'Start',
  select: 'Select',
};

function TypedCaptionsModal(props: TypedCaptionsModalProps) {
  const {
    isOpen,
    onRequestClose,
    setSidekickMenuMounted,
    sidekickMenuMounted,
    setIsOpen,
    uuid,
    pluginApi,
    panelState,
    setPanelState,
    currentUserRole,
  } = props;

  const [availableLocales, setAvailableLocales] = React.useState<Locale[]>([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const speechVoices = getSpeechVoices();
    setAvailableLocales(AVAILABLE_LOCALES.filter(
      (locale: Locale) => speechVoices.includes(locale?.locale),
    ));
    return () => {
      setIsOpen(false);
      setAvailableLocales([]);
    };
  }, []);
  const [locale, setLocale] = React.useState('');

  const handleStart: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (locale !== '') {
      setSidekickMenuMounted(true);
      setIsOpen(false);
    } else {
      setError('Please select a language!');
      setTimeout(() => {
        setError('');
      }, TIMEOUT_RENDER_ERROR);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (event) => {
    setLocale(event.target.value);
  };

  React.useEffect(() => {
    if (sidekickMenuMounted && currentUserRole === 'MODERATOR') {
      if (!panelState.isPanelOpen) pluginApi.setGenericComponents([]);
      if (!(panelState.isPanelOpen && panelState.lastSetByGenericComponent)) {
        pluginApi.setGenericComponents([
          new BbbPluginSdk.GenericComponentSidekickContent({
            menuItemContentMessage: `Transcription ${locale}`,
            menuItemIcon: 'closed_caption',
            menuItemTitle: 'Captions',
            open: panelState.isPanelOpen,
            contentFunction: (element: HTMLElement) => {
              const root = ReactDOM.createRoot(element);
              root.render(
                <React.StrictMode>
                  <TypedCaptionsSidekickContent
                    captionLocale={locale}
                    setIsPanelOpen={setPanelState}
                    uuid={uuid}
                  />
                </React.StrictMode>,
              );
            },
          }),
        ]);
      }
    }
  }, [panelState, sidekickMenuMounted]);

  return (
    <Styled.TypedCaptionsModal
      overlayClassName="modal-overlay"
      {...{
        isOpen,
        onRequestClose,
        setIsOpen,
      }}
    >
      <Styled.CloseButton
        type="button"
        className="clickable-close"
        onClick={() => {
          handleCloseModal();
        }}
      >
        <i
          className="icon-bbb-close"
        />
      </Styled.CloseButton>
      <Styled.Content>
        <span>
          Please select a language and styles for closed captions within your session.
        </span>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="captionsLangSelector"
        />
        <Styled.WriterMenuSelect>
          <LocalesDropdown
            allLocales={availableLocales}
            handleChange={handleChange}
            value={locale}
            elementId="captionsLangSelector"
            selectMessage={intlMessages.select}
          />
        </Styled.WriterMenuSelect>
        {error ?? (
          <Styled.ErrorLabel>
            {error}
          </Styled.ErrorLabel>
        )}
        <Styled.StartBtn
          type="button"
          onClick={handleStart}
        >
          {intlMessages.start}
        </Styled.StartBtn>
      </Styled.Content>
    </Styled.TypedCaptionsModal>
  );
}

export { TypedCaptionsModal };
