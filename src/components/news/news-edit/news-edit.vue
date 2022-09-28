<template>
  <news-form edit title="Редактировать новость" @onSave="update"/>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { useToast } from "vue-toastification";
import { UPDATE_NEWS } from "../../../api/mutations/updateNews";
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

    const { mutate: updateNews, onDone: onDoneUpdateNews, onError: onErrorUpdateNews } = useMutation(UPDATE_NEWS)

    onDoneUpdateNews(() => {
      toast.success('Новость успешно обновлена')
      emit('onDone')
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
      }
      updateNews(news)
    }

    return {
      update
    }
  }
}
</script>

<style scoped>

</style>
