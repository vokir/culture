<template>
  <news-form edit title="Редактировать новость" @onSave="update"/>
</template>

<script>
import { useToast } from "vue-toastification";
import { useNewsStore } from "../../../store/newsStore";
import NewsForm from "../news-form/news-form.vue";
export default {
  name: "news-edit",
  components: { NewsForm },
  emits: ['onDone'],
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup ({ id }, { emit }) {
    const toast = useToast();

    const store = useNewsStore()
    const {
      updateNews,
      onDoneUpdateNews,
      onErrorUpdateNews
    } = store

    onDoneUpdateNews(() => {
      toast.success('Новость успешно обновлена')
      emit('onDone')
      store.refetch()
    })

    onErrorUpdateNews(response => {
      let error = JSON.parse(JSON.stringify(response))
      toast.error(error.message)
    })

    const update = (data) => {
      const news = {
        id: Number(id),
        title: data.title,
        icon: data.icon?.id,
        types: Object.keys(data.type).length ? [data.type].map(type => type.ID) : [],
        desc: data.desc,
        imgLandscape: data.imgLandscape?.id ?? null,
        imgLibrary: data.imgLibrary?.id ?? null,
        fullDesc: data.fullDesc,
        phone: data.phone,
        btnLink: data.button.length ? data.button[0].link : '',
        btnText: data.button.length ? data.button[0].name : '',
        complexes: Object.keys(data.complex).length ? [data.complex].map(complex => complex.ID) : [],
        contacts: data.contacts.map(contact => contact.ID),
        houses: data.houses.map(el => el.ID),
        approaches: data.approaches.map(el => el.ID),
        floors: data.floors.map(el => el.ID),
        premises: data.premises.map(el => el.ID),
        priority: Object.keys(data.priority).length ? data.priority.ID : 1,
      }
      updateNews(news)
    }

    return {
      update
    }
  }
}
</script>
