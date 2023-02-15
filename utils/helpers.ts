import { get } from 'lodash';

export const parseResult = async (query: Promise<any>) => {
  const result = await query;
  const data = get(result, 'dataValues') || result;
  return data;
};
