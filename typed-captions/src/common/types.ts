export interface CaptionMessage {
  text: string;
  locale: string;
}

export interface CaptionMenu {
  captionLocale: string;
}

export interface sidekickMenuLocale {
  locale: string;
}

export interface WindowWithSettings extends Window {
  meetingClientSettings: {
    public: {
      app: {
        showAllAvailableLocales: boolean;
        audioCaptions: {
          language: {
            available: string[];
          }
        }
      };
    };
  };
}
