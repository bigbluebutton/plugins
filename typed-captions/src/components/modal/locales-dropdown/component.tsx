import * as React from 'react';
import { WindowWithSettings } from '../../../common/types';
import { Locale } from '../../types';

const DEFAULT_VALUE = 'select';
const DEFAULT_KEY = -1;

interface LocalesDropdownProps {
  allLocales: Locale[],
  value: string;
  handleChange: React.EventHandler<React.ChangeEvent<HTMLSelectElement>>;
  elementId: string;
  selectMessage: string;
}

declare const window: WindowWithSettings;

function LocalesDropdown(props: LocalesDropdownProps) {
  const {
    value, handleChange, elementId, selectMessage,
    allLocales,
  } = props;
  const defaultLocale = value || DEFAULT_VALUE;

  const [availableLocales, setAvailableLocales] = React.useState([]);

  const filterLocaleVariations = (localeValue: string) => {
    if (allLocales) {
      if (window.meetingClientSettings.public.app.showAllAvailableLocales) {
        return allLocales;
      }

      // splits value if not empty
      const splitValue = (localeValue) ? localeValue.split('-')[0] : '';

      const allLocaleCodes: string[] = [];
      allLocales.map((item) => allLocaleCodes.push(item.locale));

      return allLocales.filter(
        (locale) => (!locale.locale.includes('-') || locale.locale.split('-')[0] === splitValue || !allLocaleCodes.includes(locale.locale.split('-')[0])),
      );
    }
    return [];
  };
  React.useEffect(() => {
    setAvailableLocales(filterLocaleVariations(value));
  }, [allLocales]);
  return (
    <select
      id={elementId}
      onChange={handleChange}
      value={defaultLocale}
    >
      <option disabled key={DEFAULT_KEY} value={DEFAULT_VALUE}>
        {selectMessage}
      </option>
      {availableLocales.map((localeItem) => (
        <option key={localeItem.locale} value={localeItem.locale} lang={localeItem.locale}>
          {localeItem.name}
        </option>
      ))}
    </select>
  );
}

export default LocalesDropdown;
