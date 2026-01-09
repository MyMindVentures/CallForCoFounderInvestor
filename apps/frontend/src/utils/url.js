export const normalizeUrl = (value, fallback = '') => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return fallback;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return fallback;
    }
  }
};

export const isValidUrl = (value) => {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
