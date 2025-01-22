# BigBlueButton Plugins

## What are BigBlueButton Plugins?

BigBlueButton plugins are small software components developed to expand its functionalities. With the plugin architecture, developers can add new features without modifying the core BigBlueButton source code.

## What are the existing BigBlueButton Plugins?

Here is a list of the official open source plugins supported by BigBlueButton, along with their respective repository.

| Plugin Name                     | Description                                                                                                                                                                                                 | Repository Link                                                                                           | Manifest URLs *                                                                                                                         |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| plugin-decrease-volume-on-speak | Decreases the volume of external videos when a user is speaking in the session.                                                                                                                             | [Repository](https://github.com/bigbluebutton/plugin-decrease-volume-on-speak)                            | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-decrease-volume-on-speak/dist/manifest.json)  |
| plugin-generic-link-share       | Allows the presenter to display a web page to all viewers inside a session, supporting content that can be rendered in an iFrame, such as videos or documents.                                              | [Repository](https://github.com/bigbluebutton/plugin-generic-link-share)                                  | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-generic-link-share/dist/manifest.json)        |
| plugin-session-share            | Enables users to share the current session by providing options to share the session link or invite other users directly.                                                                                   | [Repository](https://github.com/bigbluebutton/plugin-session-share)                                       | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-session-share/dist/manifest.json)             |
| plugin-h5p                      | Expands the types of activities supported by BigBlueButton by integrating H5P interactive content, such as crosswords and drag-and-drop exercises, into sessions.                                           | [Repository](https://github.com/bigbluebutton/plugin-h5p)                                                 | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-h5p/dist/manifest.json)                      |
| plugin-code-highlight           | Serves as a chat tool for students and users to demonstrate and comprehend code blocks in simpler, more visual ways by adding code syntax highlighting to messages.                                          | [Repository](https://github.com/bigbluebutton/plugin-code-highlight)                                      | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-code-highlight/dist/manifest.json)            |
| plugin-pick-random-user         | Provides moderators with a modal to randomly select a user (viewer or moderator) from the list of participants present in a session, facilitating interactive activities.                                     | [Repository](https://github.com/bigbluebutton/plugin-pick-random-user)                                    | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-pick-random-user/dist/manifest.json)          |
| plugin-typed-captions           | Implements a feature allowing users to type captions during a session, displaying them at the bottom of the presentation area, enhancing accessibility for participants.                                     | [Repository](https://github.com/bigbluebutton/plugin-typed-captions)                                      | [Manifest URL](https://bigbluebutton.nyc3.digitaloceanspaces.com/plugins/bbb30/latest/plugin-typed-captions/dist/manifest.json)            |

\* these links are for demonstration purposes, in production use your own hosting.

## Capabilities and technical details

Plugins are activated at the session creation stage, meaning the system responsible for creating the session must specify which plugins will be used. To enable a plugin in a session, the system administrator only needs to provide the URL of the plugin's *manifest* file. This file contains the necessary information for loading the plugin in the browser, as well as details about its integrations with the server. Plugins may also accept configurations; in such cases, in addition to the manifest URL, the system responsible for creating the session must also specify these configurations.

Plugins have real-time access to session data, either through predefined methods or custom *GraphQL* queries. Any [information available in *GraphQL*](https://github.com/bigbluebutton/bigbluebutton/blob/v3.0.x-release/bbb-graphql-server/bbb-graphql-schema.md) can be accessed by a plugin. These *GraphQL* queries are limited to the user's scope when running client-side or to the session's scope when running server-side.

With [extensible UI areas](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#extensible-ui-areas), plugins can enhance the BigBlueButton interface by adding buttons, creating floating windows, or positioning elements in specific areas such as the content area or the *sidekick panel*. Additionally, it is possible to customize the display of chat messages. This integration with the user interface is **reactive**, allowing the plugin to dynamically adjust interface elements in real time based on session events and data.

The [data channels](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#real-time-data-exchange) allow plugins to exchange information in real time between different users within the same BigBlueButton session. This functionality expands collaboration possibilities, enabling the creation of new interactive experiences.

Plugins can also [query the state of the user interface](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#real-time-ui-data-consumption), retrieving information such as whether the user list is visible or if the message input field in the chat is focused.

Additionally, it is possible to [perform actions on behalf of the user](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#real-time-ui-data-consumption), such as adjusting the volume of an external video or opening the message composition form in the chat, providing a more automated and personalized experience.

Plugins can also [invoke server-side functionalities](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#real-time-ui-data-consumption) without requiring direct user interface interaction. A practical example is sending public chat messages via direct server calls.

For analytical purposes, plugins can log information to be displayed in the [Learning Analytics Dashboard](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#learning-analytics-dashboard-integration), allowing for monitoring and evaluating participant engagement in the session.

Additionally, plugins can [record events](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk?tab=readme-ov-file#event-persistence), which are saved in the `events.xml` file for future processing. This enables further analysis and insights into session activities.

Finally, plugins can register [external data sources](https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk/blob/main/README.md#external-data-resources), which are accessed securely and efficiently by the BigBlueButton server. These data sources can provide additional information, such as user data from the LMS (Learning Management System), further enriching the session experience.


## Developing

If you want to play around or modify one of these plugins, or create a new one, please refer back to https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk
