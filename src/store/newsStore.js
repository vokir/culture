import { useMutation, useQuery } from "@vue/apollo-composable";
import { CREATE_NEWS } from "../api/mutations/createNews";
import { DELETE_NEWS } from "../api/mutations/deleteNews";
import { UPDATE_NEWS } from "../api/mutations/updateNews";
import { GET_NEWS } from "../api/queries/getNews";
import { defineStore } from 'pinia'
import { computed } from "vue";
import { GET_NEWS_BY_ID } from "../api/queries/getNewsByID";
import { GET_NEWS_TYPES } from "../api/queries/getNewsTypes";
import usePaginate from "../hooks/usePaginate";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useNewsStore = defineStore('news', () => {
  const { currentPage, perPage, updatePage } = usePaginate(1, 20)


  const { result, loading, variables } = useQuery(GET_NEWS, {
    currentPage: currentPage.value,
    perPage: perPage.value,
  })
  const { result: resultTypes } = useQuery(GET_NEWS_TYPES)

  const newsTypes = computed(() => {
    return resultTypes.value?.getNewsTypes ?? [];
  });
  const news = computed(() => {
    return result.value?.getNews.data ?? [];
  });
  const pageInfo = computed(() => {
    return result.value?.getNews.paginatorInfo ?? []
  })

  updatePage(() => {
    variables.value = {
      currentPage: currentPage.value,
      perPage: perPage.value
    }
  })

  const { mutate: deleteNews, onDone: onDoneDeleteNews, onError: onErrorDeleteNews } = useMutation(DELETE_NEWS, {
    refetchQueries: () => [
      {
        query: GET_NEWS,
        variables: {
          currentPage: currentPage.value,
          perPage: perPage.value
        }
      }
    ]
  })
  const { mutate: createNews, onDone: onDoneCreateNews, onError: onErrorCreateNews } = useMutation(CREATE_NEWS)
  const { mutate: updateNews, onDone: onDoneUpdateNews, onError: onErrorUpdateNews } = useMutation(UPDATE_NEWS)

  return {
    news,
    loading,
    variables,
    pageInfo,
    newsTypes,
    currentPage,
    perPage,
    deleteNews,
    onDoneDeleteNews,
    onErrorDeleteNews
  }

})
