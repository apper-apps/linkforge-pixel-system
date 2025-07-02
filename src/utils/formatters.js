import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatDate = (date, pattern = 'MMM d, yyyy') => {
  if (!date) return '';
  return format(new Date(date), pattern);
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`;
  }
  
  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`;
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatUrl = (url, maxLength = 50) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const path = urlObj.pathname + urlObj.search;
    
    if (domain.length + path.length <= maxLength) {
      return domain + path;
    }
    
    const availableLength = maxLength - domain.length - 3; // 3 for "..."
    if (availableLength > 0) {
      return domain + path.substring(0, availableLength) + '...';
    }
    
    return domain;
  } catch (error) {
    // If URL parsing fails, just truncate the original string
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textArea);
      throw fallbackError;
    }
  }
};