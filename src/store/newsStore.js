import { useMutation, useQuery, useLazyQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { CREATE_NEWS } from "../api/mutations/createNews";
import { DELETE_NEWS } from "../api/mutations/deleteNews";
import { UPDATE_NEWS } from "../api/mutations/updateNews";
import { GET_NEWS } from "../api/queries/getNews";
import { defineStore } from 'pinia'
import { computed } from "vue";
import { GET_NEWS_BY_ID } from "../api/queries/getNewsByID";
import { GET_NEWS_TYPES } from "../api/queries/getNewsTypes";
import computePhone from "../helpers/phoneFormat";
import usePaginate from "../hooks/usePaginate";
import { CREATE_NEWS_LINK } from "../api/mutations/createNewsLink";
import { DELETE_NEWS_LINK } from "../api/mutations/deleteNewsLink";
import { GET_NEWS_DEGREES } from "../api/queries/getNewsDegrees";
import { GET_COMPLEXES } from "../api/queries/getComplexes";
import { GET_HOUSES } from "../api/queries/getHouses";
import { GET_APPROACHES } from "../api/queries/getApproaches";
import { GET_FLOORS } from "../api/queries/getFloors";
import { GET_PREMISES } from "../api/queries/getPremises";


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useNewsStore = defineStore('news', () => {
  const { currentPage, perPage, updatePage } = usePaginate(1, 20)
  const route = useRoute()

  const { result, loading, variables, refetch } = useQuery(GET_NEWS, {
    currentPage: currentPage.value,
    perPage: perPage.value,
  })

  const { result: resultTypes, loading: loadingTypes, load: loadTypes } = useLazyQuery(GET_NEWS_TYPES)
  const { result: resultDegrees, loading: loadingDegrees, load: loadDegrees } = useLazyQuery(GET_NEWS_DEGREES)
  const { result: resultComplexes, loading: loadingComplexes, load: loadComplexes } = useLazyQuery(GET_COMPLEXES)
	const { result: resultHouses, loading: loadingHouses, load: loadHouses } = useLazyQuery(GET_HOUSES)
	const { result: resultApproaches, loading: loadingApproaches, load: loadApproaches } = useLazyQuery(GET_APPROACHES)
	const { result: resultFloors, loading: loadingFloors, load: loadFloors } = useLazyQuery(GET_FLOORS)
	const { result: resultPremises, loading: loadingPremises, load: loadPremises } = useLazyQuery(GET_PREMISES)

  const newsTypes = computed(() => {
    return resultTypes.value?.getNewsTypes ?? [];
  });
  const news = computed(() => {
    return result.value?.getNews.data ?? [];
  });
  const pageInfo = computed(() => {
    return result.value?.getNews.paginatorInfo ?? []
  })
  const newsDegrees = computed(() => {
    return resultDegrees.value?.getNewsDegrees ?? [];
  });
  const complexes = computed(() => {
    return resultComplexes.value?.getComplexes ?? [];
  });
	const houses = computed(() => {
    return resultHouses.value?.getHouses ?? [];
  });
	const approaches = computed(() => {
    return resultApproaches.value?.getApproaches ?? [];
  });
	const floors = computed(() => {
    return resultFloors.value?.getFloors ?? [];
  });
	const premises = computed(() => {
    return resultPremises.value?.getPremises ?? [];
  });

  updatePage(() => {
    refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    })
  })
  const createFormData = (data) => {
    return {
      id: Number(data.ID),
      date: dayjs(data.UF_CREATED_AT).format('YYYY-MM-DDTHH:mm'),
      type: data.types.length ? data.types[0] : [],
      complex: data.complexes.length ? data.complexes[0] : {},
      title: data.UF_NAME ? data.UF_NAME : '',
      desc: data.UF_PREVIEW_TEXT ? data.UF_PREVIEW_TEXT : '',
      fullDesc: data.UF_TEXT ? data.UF_TEXT : '',
      phone: computePhone(data.UF_PHONE),
      docs: data.documents.filter(el => el.file),
      premises: data.premises,
      houses: data.houses,
      approaches: data.approaches,
      floors: data.floors,
      links: data.links ? data.links.map((link => {return {id:link.ID,name:link.UF_TITLE, link:link.UF_LINK}})): [],
      button: data.UF_BTN_TEXT ? [{
        name: data.UF_BTN_TEXT,
        link: data.UF_BTN_LINK
      }] : [],
      imgLandscape: {
        file: data.imgLandscape?.SRC,
        id: data.imgLandscape?.ID
      },
      imgLibrary: {
        file: data.imgLibrary?.SRC,
        id: data.imgLibrary?.ID
      },
      priority: data.degree ?? {},
      icon: {
        id: data.icon?.file?.ID,
        name: data.icon?.file?.ORIGINAL_NAME,
        src: data.icon?.file?.SRC,
      },
      contacts: data.contacts,
    }
  }
  const clearFormData = () => {
    return {
      title: '',
      icon: {
        id: null,
        src: null,
        name: null
      },
      desc: '',
      imgLandscape: null,
      imgLibrary: null,
      fullDesc: '',
      phone: '',
      date: '',
      type: {},
      complex: {},
      docs: [],
      links: [],
      button: [],
      houses: [],
      approaches: [],
      floors: [],
      premises: [],
      contacts: [],
      priority: {}
    }
  }

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
  const { mutate: createNews, onDone: onDoneCreateNews, onError: onErrorCreateNews } = useMutation(CREATE_NEWS, {
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
  const { mutate: updateNews, onDone: onDoneUpdateNews, onError: onErrorUpdateNews } = useMutation(UPDATE_NEWS)

  const { mutate: createNewsLink, onDone: onDoneCreateNewsLink, onError: onErrorCreateNewsLink } = useMutation(CREATE_NEWS_LINK)
  const { mutate: deleteNewsLink, onDone: onDoneDeleteNewsLink, onError: onErrorDeleteNewsLink } = useMutation(DELETE_NEWS_LINK)
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
    onErrorDeleteNews,
    createNews,
    onDoneCreateNews,
    onErrorCreateNews,
    updateNews,
    onDoneUpdateNews,
    onErrorUpdateNews,
    refetch,
    createNewsLink,
    deleteNewsLink,
    createFormData,
    clearFormData,
    newsDegrees,
    complexes,
    loadTypes,
    loadDegrees,
    loadComplexes,
    houses,
    approaches,
    floors,
    premises,
    loadHouses,
    loadApproaches,
    loadFloors,
    loadPremises,
  };

})
