import React, { useState } from 'react';
import { getAutocomplete } from '../api';

let controller = new AbortController();

export const useAutocomplete = () => {
  const [autocomplete, setAutocomplete] = useState([]);

  const onSuccess = (data) => {
    setAutocomplete(data?.features);
    controller.abort();
    controller = new AbortController();
  };

  const onError = () => {
    controller.abort();
    controller = new AbortController();
  };
  const handleClearAutocomplete = () => {
    setAutocomplete([]);
  };

  const handleAutocomplete = (value) => {
    if (value) {
      getAutocomplete({ value, onSuccess, onError, signal: controller.signal });
    } else {
      handleClearAutocomplete();
    }
  };

  return {
    autocomplete,
    onChangeAutocomplete: handleAutocomplete,
    onClearAutocomplete: handleClearAutocomplete,
  };
};
