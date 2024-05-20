# H5P Plugin

## What is it?

This plugin is part of the closed-source plugins. What it does is basically expand the activities possibility since it embeds the h5p into the presentation area with whatever content the teacher wants.

Moreover, this plugin has its specific libraries to properly render the h5p-content, so pay attention to the instructions ahead. 

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/plugins-pro/h5p-plugin
npm run fetch-dependencies
npm install
npm start
```

The `fetch-dependencies` script is responsible for cloning the `bigbluebutton/h5p-standalone` repository locally, and can then add more dependencies as it goes.

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: H5pPlugin
      url: http://127.0.0.1:4701/static/H5pPlugin.js
      dataChannels:
        - name: jsonContent
          writePermission: ['moderator','presenter']
          deletePermission: ['moderator', 'sender']
        - name: testResult
          writePermission: ['all']
          deletePermission: ['moderator', 'sender']
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/plugins-pro/h5p-plugin
npm run fetch-dependencies
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `H5pPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: H5pPlugin
      url: <<PLUGIN_URL>>
      dataChannels:
        - name: jsonContent
          writePermission: ['moderator','presenter']
          deletePermission: ['moderator', 'sender']
        - name: testResult
          writePermission: ['all']
          deletePermission: ['moderator', 'sender']
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/H5pPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/H5pPlugin.js`.
