import * as React from 'react';
import { useState, useEffect } from 'react';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import hljs from 'highlight.js';
import { CodeHighlighterProps } from './types';
import './styles.css';
import 'highlight.js/styles/night-owl.css';

const CODE_BLOCK_REGEX = /```\w+[\r\n\s]+([\s\S]*?)\n```/;
const CODE_LANGUAGE_REGEX = /```\w+/;

interface MessageIdAndCodeLanguage {
  messageId: string;
  codeLanguage: string;
  messageText: string;
}

function CodeHighlighter({ pluginUuid: uuid }: CodeHighlighterProps): React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  const [
    chatMessagesToApplyHighlights,
    setChatIdsToApplyHighlights,
  ] = useState<MessageIdAndCodeLanguage[]>([]);
  const alreadyHighlightedMessages = React.useRef<string[]>([]);
  const response = pluginApi.useLoadedChatMessages();

  useEffect(() => {
    if (response.data) {
      const messagesToHighlight = response.data.filter(
        (message) => message.message.search(CODE_BLOCK_REGEX) !== -1
            && !alreadyHighlightedMessages.current.includes(message.messageId),
      ).map((message) => {
        const codeLanguageIndex = message.message.search(CODE_LANGUAGE_REGEX);
        let codeLanguage = '';
        if (codeLanguageIndex !== -1) {
          codeLanguage = CODE_LANGUAGE_REGEX.exec(message.message)?.[0].slice(3);
        }

        return {
          messageId: message.messageId,
          codeLanguage,
          messageText: message.message,
        };
      });
      setChatIdsToApplyHighlights(messagesToHighlight);
    }
  }, [response]);

  useEffect(() => {
    alreadyHighlightedMessages.current = alreadyHighlightedMessages.current
      .concat(chatMessagesToApplyHighlights.map((message) => message.messageId));
  }, [chatMessagesToApplyHighlights]);

  const chatMessagesDomElements = pluginApi.useChatMessageDomElements(chatMessagesToApplyHighlights
    .map((message) => message.messageId));

  useEffect(() => {
    chatMessagesDomElements?.map((chatMessageDomElement) => {
      const messageIdFromUi = chatMessageDomElement.getAttribute('data-chat-message-id');
      const messageFromGraphql = chatMessagesToApplyHighlights
        .find((message) => message.messageId === messageIdFromUi);

      const codeHTMLTags = chatMessageDomElement.querySelectorAll('code');

      codeHTMLTags.forEach((codeTagItem) => {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.classList.add('hljs');
        code.classList.add(messageFromGraphql.codeLanguage);
        const pureTextCode = codeTagItem.innerText;
        const highlightedCode = hljs
          .highlight(messageFromGraphql.codeLanguage, pureTextCode).value;
        code.innerHTML = highlightedCode;
        pre.appendChild(code);
        codeTagItem.replaceWith(pre);
      });
      return true;
    });
  }, [response]);
  return null;
}

export default CodeHighlighter;
