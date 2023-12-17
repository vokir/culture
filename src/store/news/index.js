import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getColumns, getList, getType, remove } from '@/store/news/api.js';
import { mapColumns } from '@/store/global/map.js';

export const useNewsStore = defineStore('news', () => {
  const news = ref([]);
  const newsTypes = ref([]);
  const isLoading = ref(true);
  const pagination = ref({
    total: 100,
    per_page: 15,
    current_page: 1
  });

  const columns = ref([]);

  const getNewsColumns = async () => {
    try {
      const res = await getColumns();
      if (res.status === 200) {
        news.value = res.data.data.map(mapColumns);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getNewsList = async () => {
    try {
      isLoading.value = true;
      const res = await getList({
        page: pagination.value.current_page,
        per_page: pagination.value.per_page,
        include: 'icon',
        paginate: 1
      });
      if (res.status === 200) {
        news.value = res.data?.data ?? [];

        const { current_page, total } = res.data.meta.pagination;
        pagination.value.current_page = current_page;
        pagination.value.total = total;
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const getNewsType = async () => {
    try {
      const res = await getType();

      if (res.status === 200) {
        newsTypes.value = res.data.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNews = async (id) => {
    try {
      await remove(id);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getNewsList,
    getNewsColumns,
    deleteNews,
    getNewsType,
    news,
    newsTypes,
    isLoading,
    columns,
    pagination
  };
});
