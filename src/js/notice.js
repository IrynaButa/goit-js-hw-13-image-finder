import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { error } from '@pnotify/core';

export default function errorNotice() {
    error({
    text: 'Please enter a more spesific query!',
    delay: '2000',
    maxTextHeight: null,
  });
}