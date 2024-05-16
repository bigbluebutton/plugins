import { WindowWithSettings } from '../common/types';

declare const window: WindowWithSettings;

const CONFIG = window.meetingClientSettings.public.app.audioCaptions;
const LANGUAGES = CONFIG.language.available;

export const getSpeechVoices = () => window
  .speechSynthesis
  .getVoices()
  .map((v) => v.lang)
  .filter((v) => LANGUAGES.includes(v));
