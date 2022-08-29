import { ref, watch } from "vue";

const usePaginate = (initialCurrentPage = 1, initialPerPage = 20) => {
  const currentPage = ref(initialCurrentPage ?? initialCurrentPage)
  const perPage = ref(initialPerPage ?? initialPerPage)

  const updatePage = (callback) => watch(currentPage, callback)


  return { currentPage, perPage, updatePage }
}

export default usePaginate
