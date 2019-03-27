export function zip(...arrays) {
  return arrays[0].map((_, i) => arrays.map((array) => array[i]));
}

export function zipObj(obj) {
  return Object.values(obj)[0].map((_, i) => Object.keys(obj).reduce((prev, key) => ({
    ...prev,
    [key]: obj[key][i],
  }), {}));
}

export function getUrlParams(url) {
  const search = (url ? new URL(url) : location).search.substring(1).
    replace(/&/g, '","').
    replace(/=/g, '":"');

  if (search) {
    return JSON.parse(
      `{"${search}"}`,
      (key, value) => key === '' ? value : decodeURIComponent(value),
    );
  } else {
    return {};
  }
}

export function getUrlQueryByParams(params) {
  const stringParams = Object.keys(params)
    .reduce((obj, key) => ({...obj, [key]: params[key] + ''}), {});
  const paramsJson = JSON.stringify(stringParams);
  const query = paramsJson.substring(2, paramsJson.length - 2)
    .replace(/":"/g, '=')
    .replace(/","/g, '&');
  return `?${query}`;
}
