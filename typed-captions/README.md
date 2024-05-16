# Typed Captions

## What is it?

This plugin is one of the official bbb plugins. It implements the previous typed captions feature that was present in the core of BBB, but as a plugin and with some different UI and features within. So the idea is that you can simply type the captions in the sidekick panel that will appear and it will appear just like a normal automatic-captions on the bottom of the presentation area.

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
        - name: typed-captions
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

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` (`/etc/bigbluebutton/bbb-html5.yml` is the file you are looking for) as shown below:

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


## More

### Extra settings: 

Pay attention that the audio captions must be enabled, to do that, you open `/etc/bigbluebutton/bbb-html5.yml` and add the yaml directive `public.app.audioCaptions.enabled=true`, just like the following:

```yml
public:
  app:
    # You may have other setting itms here
    audioCaptions:
      enabled: true
```

Make sure you don't change any other setting, save the file, and we're good to go! 