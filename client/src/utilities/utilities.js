export const isValidUrl = (string) => {
  // Regular expression for URL validation
  const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  return urlRegex.test(string);
};