import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import DecreaseVolumeOnSpeak from './decrease-volume-on-talk/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <DecreaseVolumeOnSpeak {...{
      pluginUuid: uuid,
      pluginName,
    }}
    />
  </React.StrictMode>,
);
