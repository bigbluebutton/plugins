# Decrease external video's volume on speak

## What is it?

This plugin is one of the official bbb plugins. It basically decreases the external video's volume when a user is speaking in the meeting.

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/plugins/typed-captions
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: TypedCaptions
      url: http://127.0.0.1:4701/static/TypedCaptions.js
      dataChannels:
        - name: typed-captions-data-channel
          writePermission: ['moderator','presenter']
          deletePermission:
              - moderator
              - sender
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/plugins/typed-captions
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `TypedCaptions.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: TypedCaptions
      url: <<PLUGIN_URL>>
      dataChannels:
        - name: typed-captions-data-channel
          writePermission: ['moderator','presenter']
          deletePermission:
              - moderator
              - sender
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/TypedCaptions.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/TypedCaptions.js`.
