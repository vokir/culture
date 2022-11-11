<template>
  <news-form
    :closeModalProp="closeModalProp"
    @onSave="create($event, true)"
    @onCopy="create"
		@onCancel="onCancel"
  />
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { CREATE_NEWS } from "../../../api/mutations/createNews";
import { useNewsStore } from "../../../store/newsStore";

import NewsForm from "../news-form/news-form.vue";


export default {
  name: "news-add",
  components: { NewsForm },
  emits: ['onCreate'],
  setup(_, { emit }) {
    const toast = useToast();
    const closeModalProp = ref(false)
    const store = useNewsStore()
    const {
      createNews,
      onDoneCreateNews,
      onErrorCreateNews,
      createNewsLink
    } = store

    onDoneCreateNews(() => {
      toast.success('Новость успешно создана')
      emit('onCreate')
    })

    onErrorCreateNews(response => {
      let error = JSON.parse(JSON.stringify(response))
      toast.error(error.message)
    })

    const create = (data, closeModal = false) => {
      const news = {
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
        houses: data.houses.map(el => el.ID),
        approaches: data.approaches.map(el => el.ID),
        floors: data.floors.map(el => el.ID),
        premises: data.premises.map(el => el.ID),
        contacts: data.contacts.map(contact => contact.ID),
        priority: data.priority.ID,
        documents: data.docs.map(el => el.ID),
      }
			if(news.title.length && news.icon && news.priority){
				createNews(news).then((result) => {
				if (result) {
					let links = data.links
					let linksArr = []

					links.forEach((link) => {
						const newLink = {
							title: link.name,
							link: link.link,
							newsID: result.data.createNews.ID
						}
						let newID = createNewsLink(newLink)
						linksArr.push(newID)
					})
					if (closeModal) {
						closeModalProp.value = true
					}
				}
			})
			}
			else{
				toast.error("Заполните обязательные поля (степень важности, заголовок и иконка)")
			}

		}

		const onCancel = () => {
			closeModalProp.value = true
		}

    return {
      closeModalProp,
      create,
			onCancel
    }
  }
}
</script>
