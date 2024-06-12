import { CaptionsTypeEnum, PluginApi, PushEntryFunction } from 'bigbluebutton-html-plugin-sdk';
import * as React from 'react';

import Styled from './styles';
import { CaptionMessage } from '../../../common/types';

interface GenericComponentExampleProps {
  pushCaptionMessages: PushEntryFunction<CaptionMessage>;
  captionLocale: string;
  pluginApi: PluginApi;
}

export function TypedCaptionsInput(props: GenericComponentExampleProps) {
  const {
    pushCaptionMessages,
    captionLocale,
    pluginApi,
  } = props;

  const textAreaRef = React.useRef(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [caption, setCaption] = React.useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newMessage = null;
    newMessage = e.target.value;
    setCaption(newMessage);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | Event,
  ) => {
    e.preventDefault();
    if (caption !== '') {
      pushCaptionMessages({
        text: caption,
        locale: 'en',
      });
      pluginApi.serverCommands.caption.save({
        text: caption,
        locale: captionLocale,
        captionType: CaptionsTypeEnum.TYPED,
      });
      setCaption('');
    }
  };

  const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // TODO Prevent send message pressing enter on mobile and/or virtual keyboard
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();

      const event = new Event('submit', {
        bubbles: true,
        cancelable: true,
      });

      handleSubmit(event);
    }
  };

  return (
    <Styled.Form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Styled.Wrapper>
        <Styled.Input
          id="message-input"
          ref={textAreaRef}
          placeholder="Type your captions"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="true"
          value={caption}
          onChange={handleMessageChange}
          onKeyDown={handleMessageKeyDown}
          onPaste={(e) => { e.stopPropagation(); }}
          onCut={(e) => { e.stopPropagation(); }}
          onCopy={(e) => { e.stopPropagation(); }}
        />
        <Styled.SendButton
          type="submit"
          color="primary"
          onClick={() => { }}
          data-test="sendMessageButton"
        >
          <i
            className="icon-bbb-send"
            style={{ color: 'white' }}
          />
        </Styled.SendButton>
      </Styled.Wrapper>
    </Styled.Form>
  );
}
