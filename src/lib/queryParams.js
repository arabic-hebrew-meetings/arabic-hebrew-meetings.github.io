// Returns a query-string parameter: null if it's missing, '' if it has no value.
// Moved from getQueryParamByName() in public/headerFooterScript.js.
export function getQueryParam(name, url = window.location.href) {
  name = name.replace(/[[\]]/g, '\\$&');
  const results = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)').exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
