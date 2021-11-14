import fetch from 'node-fetch';

type NvmTagsResponse = Array<{ name: string }>;

const isNvmTagsResponse = (json: unknown): json is NvmTagsResponse => {
  if (!Array.isArray(json)) return false;
  return json.every(entry => {
    if (!entry) return false;
    if (typeof entry !== 'object') return false;
    return typeof entry.name === 'string';
  });
};

export const getLatestNvmVersion = async () => {
  const json = await fetch('https://api.github.com/repos/nvm-sh/nvm/tags').then(
    res => res.json()
  );

  if (!isNvmTagsResponse(json)) throw new Error('Unable to parse response');
  if (json.length === 0) throw new Error('Unable to parse response');

  return json[0].name;
};
