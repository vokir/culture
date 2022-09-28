<template>
  <news-form :closeModalProp="closeModalProp" @onSave="(event) => create(event, true)" @onCopy="create"/>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { CREATE_NEWS } from "../../../api/mutations/createNews";
import NewsForm from "../news-form/news-form.vue";
import { GET_NEWS } from "../../../api/queries/getNews";

export default {
  name: "news-add",
  components: { NewsForm },
  setup() {
    const toast = useToast();
    const closeModalProp = ref(false)
    const { mutate: createNews, onDone: onDoneCreateNews, onError: onErrorCreateNews } = useMutation(CREATE_NEWS, {
      update: (store, { data: { addNews } }) => {
        // Add to All tasks list
        const data = store.readQuery({ query: GET_NEWS })
        console.log(data)
        data.getNews.data.push(addNews)
        store.writeQuery({ query: GET_NEWS, data })
        // Add to Todo tasks list
        const todoQuery = {
          query: GET_NEWS,
          variables: { filter: { done: false } },
        }
        const todoData = store.readQuery(todoQuery)
        todoData.getNews.push(addNews)
        store.writeQuery({ ...todoQuery, data: todoData })
      },
    })

    onDoneCreateNews(() => {
      toast.success('Новость успешно создана')
    })

    onErrorCreateNews(response => {
      let error = JSON.parse(JSON.stringify(response))
      toast.error(error.message)
    })

    const create = (data, closeModal = false) => {
      const news = {
        title: data.title,
        icon: data.icon?.id ?? 1996,
        types: Object.keys(data.type).length ? [data.type].map(type => type.ID) : [],
        desc: data.desc,
        imgLandscape: data.imgLandscape?.id ?? null,
        imgLibrary: data.imgLibrary?.id ?? null,
        fullDesc: data.fullDesc,
        phone: data.phone,
        btnLink: data.button.length ? data.button[0].link : '',
        btnText: data.button.length ? data.button[0].name : '',
        complexes: Object.keys(data.complex).length ? [data.complex].map(complex => complex.ID) : [],
        houses: data.houses.map(el => el.ID),
        approaches: data.approaches.map(el => el.ID),
        floors: data.floors.map(el => el.ID),
        premises: data.premises.map(el => el.ID),
        priority: Object.keys(data.priority).length ? data.priority.ID : 1,
      }
      createNews(news).then(() => {
        if (closeModal) {
          closeModalProp.value = true
        }
      })
    }

    return {
      closeModalProp,
      create
    }
  }
}
</script>
