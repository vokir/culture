import {useLazyQuery, useMutation, useQuery} from '@vue/apollo-composable';
import dayjs from 'dayjs';
import {CREATE_NEWS} from '../api/mutations/createNews';
import {DELETE_NEWS} from '../api/mutations/deleteNews';
import {UPDATE_NEWS} from '../api/mutations/updateNews';
import {GET_NEWS} from '../api/queries/getNews';
import {defineStore} from 'pinia';
import {computed, watch} from 'vue';
import {GET_NEWS_TYPES} from '../api/queries/getNewsTypes';
import computePhone from '../helpers/phoneFormat';
import usePaginate from '../hooks/usePaginate';
import {CREATE_NEWS_LINK} from '../api/mutations/createNewsLink';
import {DELETE_NEWS_LINK} from '../api/mutations/deleteNewsLink';
import {GET_NEWS_DEGREES} from '../api/queries/getNewsDegrees';
import {GET_COMPLEXES} from '../api/queries/getComplexes';
import {GET_HOUSES} from '../api/queries/getHouses';
import {GET_APPROACHES} from '../api/queries/getApproaches';
import {GET_FLOORS} from '../api/queries/getFloors';
import {GET_PREMISES} from '../api/queries/getPremises';
import {CREATE_FILTER} from '../api/mutations/createFilter';
import {DELETE_FILTER} from '../api/mutations/deleteFilter';
import {UPDATE_FILTER} from '../api/mutations/updateFilter';
import {GET_FILTERS} from '../api/queries/getFilters';
import {GET_IMAGE_CATEGORIES} from '../api/queries/getImageCategories';
import {GET_IMAGES} from '../api/queries/getImages';
import {GET_ICONS} from '../api/queries/getIcons';
import {GET_DOCUMENT_CATEGORIES} from '../api/queries/getDocumentCategories';
import {GET_DOCUMENT_TYPES} from '../api/queries/getDocumentTypes';
import {GET_DOCUMENTS} from '../api/queries/getDocuments';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useNewsStore = defineStore('news', () => {
  const { currentPage, perPage, updatePage } = usePaginate(1, 20);

  const { result, loading, variables, refetch, query, start } = useQuery(GET_NEWS, {
    currentPage: currentPage.value,
    perPage: perPage.value,
    dateFilterType: 'exact_date'
  });

  const {
    result: resultImages,
    loading: loadingImages,
    variables: variablesImages,
    refetch: refetchImages,
    query: queryImages,
    start: startImages
  } = useQuery(GET_IMAGES, {
    currentPage: currentPage.value,
    perPage: perPage.value
  });

  const {
    result: resultIcons,
    loading: loadingIcons,
    variables: variablesIcons,
    refetch: refetchIcons,
    query: queryIcons,
    start: startIcons
  } = useQuery(GET_ICONS, {
    currentPage: currentPage.value,
    perPage: perPage.value
  });
  const {
    result: resultDocuments,
    loading: loadingDocuments,
    variables: variablesDocuments,
    refetch: refetchDocuments,
    query: queryDocuments,
    start: startDocuments
  } = useQuery(GET_DOCUMENTS, {
    currentPage: currentPage.value,
    perPage: 100
  });

  const {
    result: resultFiltersNews,
    load: loadFiltersNews,
    loading: loadingFiltersNews,
    refetch: refetchFiltersNews,
    onResult: onResultFiltersNews
  } = useLazyQuery(GET_FILTERS, {
    entity: 'news'
  });

  const {
    result: resultFiltersImage,
    load: loadFiltersImage,
    loading: loadingFiltersImage,
    refetch: refetchFiltersImage,
    onResult: onResultFiltersImage
  } = useLazyQuery(GET_FILTERS, {
    entity: 'image'
  });

  const {
    result: resultFiltersIcon,
    load: loadFiltersIcon,
    loading: loadingFiltersIcon,
    refetch: refetchFiltersIcon,
    onResult: onResultFiltersIcon
  } = useLazyQuery(GET_FILTERS, {
    entity: 'icon'
  });
  const {
    result: resultFiltersDocument,
    load: loadFiltersDocument,
    loading: loadingFiltersDocument,
    refetch: refetchFiltersDocument,
    onResult: onResultFiltersDocument
  } = useLazyQuery(GET_FILTERS, {
    entity: 'document'
  });

  const { result: resultTypes, load: loadTypes } = useLazyQuery(GET_NEWS_TYPES);
  const { result: resultDegrees, load: loadDegrees } = useLazyQuery(GET_NEWS_DEGREES);
  const { result: resultComplexes, load: loadComplexes } = useLazyQuery(GET_COMPLEXES);
  const { result: resultHouses, load: loadHouses } = useLazyQuery(GET_HOUSES);
  const { result: resultApproaches, load: loadApproaches } = useLazyQuery(GET_APPROACHES);
  const { result: resultFloors, load: loadFloors } = useLazyQuery(GET_FLOORS);
  const { result: resultPremises, load: loadPremises } = useLazyQuery(GET_PREMISES);
  const { result: resultImageCategories, load: loadImageCategories } =
    useLazyQuery(GET_IMAGE_CATEGORIES);
  const { result: resultDocumentCategories, load: loadDocumentCategories } =
    useLazyQuery(GET_DOCUMENT_CATEGORIES);
  const { result: resultDocumentTypes, load: loadDocumentTypes } = useLazyQuery(GET_DOCUMENT_TYPES);

  const newsTypes = computed(() => {
    return resultTypes.value?.getNewsTypes ?? [];
  });
  const news = computed(() => {
    return result.value?.getNews.data ?? [];
  });
  const pageInfo = computed(() => {
    return result.value?.getNews.paginatorInfo ?? [];
  });
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
  const filtersNews = computed(() => {
    return resultFiltersNews.value?.getFilters ?? [];
  });
  const filtersImage = computed(() => {
    return resultFiltersImage.value?.getFilters ?? [];
  });
  const filtersIcon = computed(() => {
    return resultFiltersIcon.value?.getFilters ?? [];
  });
  const filtersDocument = computed(() => {
    return resultFiltersDocument.value?.getFilters ?? [];
  });
  const imageCategories = computed(() => {
    return resultImageCategories.value?.getImageCategories ?? [];
  });
  const documentCategories = computed(() => {
    return resultDocumentCategories.value?.getDocumentCategories ?? [];
  });
  const documentTypes = computed(() => {
    return resultDocumentTypes.value?.getDocumentTypes ?? [];
  });
  const images = computed(() => {
    return resultImages.value?.getImages.data ?? [];
  });
  const icons = computed(() => {
    return resultIcons.value?.getIcons.data ?? [];
  });
  const documents = computed(() => {
    return resultDocuments.value?.getDocuments.data ?? [];
  });

  watch(query, (val) => {
    if (!val) {
      start();
    }
  });

  watch(queryDocuments, (val) => {
    if (!val) {
      startDocuments();
    }
  });
  watch(queryImages, (val) => {
    if (!val) {
      startImages();
    }
  });
  watch(queryIcons, (val) => {
    if (!val) {
      startIcons();
    }
  });

  updatePage(() => {
    refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    });
  });
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
      docs: data.documents.filter((el) => el.file),
      premises: data.premises,
      houses: data.houses,
      approaches: data.approaches,
      floors: data.floors,
      links: data.links
        ? data.links.map((link) => {
            return { id: link.ID, name: link.UF_TITLE, link: link.UF_LINK };
          })
        : [],
      button: data.UF_BTN_TEXT
        ? [
            {
              name: data.UF_BTN_TEXT,
              link: data.UF_BTN_LINK
            }
          ]
        : [],
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
        id: data.icon?.ID,
        name: data.icon?.file?.ORIGINAL_NAME,
        src: data.icon?.file?.SRC
      },
      image: {
        id: data.previewPicture?.ID,
        name: data.previewPicture?.ORIGINAL_NAME,
        src: data.previewPicture?.SRC
      },
      contacts: data.contacts
    };
  };
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
    };
  };

  const {
    mutate: deleteNews,
    onDone: onDoneDeleteNews,
    onError: onErrorDeleteNews
  } = useMutation(DELETE_NEWS, {
    refetchQueries: () => [
      {
        query: GET_NEWS,
        variables: {
          currentPage: currentPage.value,
          perPage: perPage.value
        }
      }
    ]
  });
  const {
    mutate: createNews,
    onDone: onDoneCreateNews,
    onError: onErrorCreateNews
  } = useMutation(CREATE_NEWS, {
    refetchQueries: () => [
      {
        query: GET_NEWS,
        variables: {
          currentPage: currentPage.value,
          perPage: perPage.value
        }
      }
    ]
  });
  const {
    mutate: updateNews,
    onDone: onDoneUpdateNews,
    onError: onErrorUpdateNews
  } = useMutation(UPDATE_NEWS);

  const { mutate: createNewsLink } = useMutation(CREATE_NEWS_LINK);
  const { mutate: deleteNewsLink } = useMutation(DELETE_NEWS_LINK);

  const { mutate: createFilter } = useMutation(CREATE_FILTER);
  const { mutate: deleteFilter } = useMutation(DELETE_FILTER);
  const { mutate: updateFilter } = useMutation(UPDATE_FILTER);

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
    createFilter,
    deleteFilter,
    updateFilter,
    filtersNews,
    refetchFiltersNews,
    loadingFiltersNews,
    onResultFiltersNews,
    filtersImage,
    refetchFiltersImage,
    loadingFiltersImage,
    onResultFiltersImage,
    filtersIcon,
    refetchFiltersIcon,
    loadingFiltersIcon,
    onResultFiltersIcon,
    imageCategories,
    loadImageCategories,
    loadDocumentCategories,
    loadDocumentTypes,
    images,
    loadingImages,
    variablesImages,
    refetchImages,
    loadFiltersNews,
    loadFiltersImage,
    loadFiltersIcon,
    loadFiltersDocument,
    resultIcons,
    loadingIcons,
    variablesIcons,
    refetchIcons,
    icons,
    documentCategories,
    documentTypes,
    filtersDocument,
    loadingFiltersDocument,
    refetchFiltersDocument,
    onResultFiltersDocument,
    loadingDocuments,
    variablesDocuments,
    refetchDocuments,
    documents
  };
});
