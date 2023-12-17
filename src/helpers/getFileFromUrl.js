import mime from 'mime-types';

export const getFileFromUrl = async (url, type, name, id) => {
  if (!url) {
    return false;
  }

  const blob = await fetch(url).then((r) => r.blob());
  const mimeType = mime.types[type ?? url.split('.').pop().toLowerCase()];
  const fileName = name ?? url.split('/').pop().toLowerCase();

  const file = new File([blob], fileName, { type: mimeType });
  if (id) {
    file.id = id;
  }

  return file;
};
