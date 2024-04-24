import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  ActionButtonDropdownOption,
  ActionButtonDropdownSeparator,
  BbbPluginSdk,
  GenericComponentSidekickContent,
  PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { TypedCaptionsProps } from './types';

function TypedCaptions(
  { pluginUuid: uuid }: TypedCaptionsProps,
): React.ReactElement {
  BbbPluginSdk.initialize(uuid);

  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  pluginApi.setActionButtonDropdownItems([
    new ActionButtonDropdownSeparator(),
    new ActionButtonDropdownOption({
      label: 'Fetch presentation content',
      icon: 'copy',
      tooltip: 'this is a button injected by plugin',
      allowed: true,
      onClick: () => {
        pluginApi.setGenericComponents([
          new GenericComponentSidekickContent({
            contentFunction: (element: HTMLElement) => {
              const root = ReactDOM.createRoot(element);
              root.render(
                <React.StrictMode>
                  <div>
                    teste aqui----
                  </div>
                </React.StrictMode>,
              );
            },
          }),
        ]);
        pluginApi.serverCommands.caption.save({ text: 'save something in the captions' });
      },
    }),
  ]);

  return null;
}

export default TypedCaptions;
