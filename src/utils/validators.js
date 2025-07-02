export const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidCustomAlias = (alias) => {
  // Allow alphanumeric characters, hyphens, and underscores
  // Must be between 3-50 characters
  const aliasRegex = /^[a-zA-Z0-9_-]{3,50}$/;
  return aliasRegex.test(alias);
};

export const validateLinkData = (data) => {
  const errors = {};
  
  if (!data.originalUrl) {
    errors.originalUrl = 'URL is required';
  } else if (!isValidUrl(data.originalUrl)) {
    errors.originalUrl = 'Please enter a valid URL';
  }
  
  if (data.customAlias && !isValidCustomAlias(data.customAlias)) {
    errors.customAlias = 'Alias must be 3-50 characters and contain only letters, numbers, hyphens, and underscores';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeUrl = (url) => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  
  return url;
};