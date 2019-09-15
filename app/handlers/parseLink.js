import {parse} from 'query-string';

export default string => {
  const output = {};
  const regex = /<([^>]+)>; rel="([^"]+)"/g;

  let m;
  while ((m = regex.exec(string))) {
    const [_, v, k] = m;
    output[k] = v;
  }
  if (!output.next) {
    return null;
  }
  let [, next] = output.next.split('?');
  let [, last] = output.last.split('?');
  next = parse(next);
  last = parse(last);
  return {
    nextPage: Number(next.page),
    prevPage: Number(next.page) - 2,
    lastPage: Number(last.page),
  };
};
