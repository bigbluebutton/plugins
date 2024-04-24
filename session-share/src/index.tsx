import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SessionSharePlugin from './main/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <div className="session-share-plugin">
      <SessionSharePlugin {...{
        pluginUuid: uuid,
        pluginName,
      }}
      />
    </div>
  </React.StrictMode>,
);
