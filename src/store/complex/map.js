import { getFileFromUrl } from '@/helpers/getFileFromUrl.js';

const mapComplex = async (item) => ({
  ...item,
  accommodationPolicy: item.accommodationPolicy ?? [],
  active: item.active ? 'Да' : 'Нет',
  icon: item.icon?.url ? await getFileFromUrl(item.icon.url) : null,
  avatar: item.icon?.url ?? item.icon.url
});

export { mapComplex };
