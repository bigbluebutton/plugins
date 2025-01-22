# BigBlueButton Plugins

## What are BigBlueButton Plugins?

BigBlueButton plugins are small software components developed to expand its functionalities. With the plugin architecture, developers can add new features without modifying the core BigBlueButton source code.

## What are the existing BigBlueButton Plugins?

Here is a list of the official open source plugins supported by BigBlueButton, along with their respective repository.

| Plugin Name                     | Description                                                                                                                                                                                                 | Repository Link                                                                                           |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| plugin-decrease-volume-on-speak | Decreases the volume of external videos when a user is speaking in the session.                                                                                                                             | [Repository](https://github.com/bigbluebutton/plugin-decrease-volume-on-speak)                                |
| plugin-generic-link-share       | Allows the presenter to display a web page to all viewers inside a session, supporting content that can be rendered in an iFrame, such as videos or documents.                                              | [Repository](https://github.com/bigbluebutton/plugin-generic-link-share)                                      |
| plugin-session-share            | Enables users to share the current session by providing options to share the session link or invite other users directly.                                                                                   | [Repository](https://github.com/bigbluebutton/plugin-session-share)                                           |
| plugin-h5p                      | Expands the types of activities supported by BigBlueButton by integrating H5P interactive content, such as crosswords and drag-and-drop exercises, into sessions.                                           | [Repository](https://github.com/bigbluebutton/plugin-h5p)                                                     |
| plugin-code-highlight           | Serves as a chat tool for students and users to demonstrate and comprehend code blocks in simpler, more visual ways by adding code syntax highlighting to messages.                                          | [Repository](https://github.com/bigbluebutton/plugin-code-highlight)                                          |
| plugin-pick-random-user         | Provides moderators with a modal to randomly select a user (viewer or moderator) from the list of participants present in a session, facilitating interactive activities.                                     | [Repository](https://github.com/bigbluebutton/plugin-pick-random-user)                                        |
| plugin-typed-captions           | Implements a feature allowing users to type captions during a session, displaying them at the bottom of the presentation area, enhancing accessibility for participants.                                     | [Repository](https://github.com/bigbluebutton/plugin-typed-captions)                                          |

## Developing

If you want to play around or modify one of these plugins, or create a new one, please refer back to https://github.com/bigbluebutton/bigbluebutton-html-plugin-sdk
