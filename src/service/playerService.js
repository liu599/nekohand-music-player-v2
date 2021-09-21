import All from './index';

export const FetchPlayerList = (params) => {
  return All.fetchUrl(All.optionConvert(params));
}
