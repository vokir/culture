<template>
  <news-form
    :closeModalProp="closeModalProp"
    @onSave="(event) => create(event, true)"
    @onCopy="create"
  />
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { CREATE_NEWS } from "../../../api/mutations/createNews";
import { CREATE_NEWS_LINK } from "../../../api/mutations/createNewsLink";
import NewsForm from "../news-form/news-form.vue";


export default {
  name: "news-add",
  components: { NewsForm },
  setup() {
    const toast = useToast();
    const closeModalProp = ref(false)
    const { mutate: createNews, onDone: onDoneCreateNews, onError: onErrorCreateNews } = useMutation(CREATE_NEWS, {
      // update: (cache, { data: { createNews } }) => {
      //   try {
      //     const data = cache.readQuery({ query: GET_NEWS });
      //     data.getNews.push(createNews);
      //     cache.writeQuery({ query: GET_NEWS, data });
      //   }
      //   catch(error) {
      //     console.error(error);
      //   }
      // }
    })
    const { mutate: createNewsLink, onDone: onDoneCreateNewsLink, onError: onErrorCreateNewsLink } = useMutation(CREATE_NEWS_LINK)

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
        contacts: data.contacts.map(contact => contact.ID),
        priority: Object.keys(data.priority).length ? data.priority.ID : 1,
        documents: data.docs.map(el => el.ID),
      }
      createNews(news).then((id) => {
        let links = data.links
        let linksArr = []

        links.forEach((link) => {
          const newLink = {
            title:link.name,
            link:link.link,
            newsID:id.data.createNews.ID
          }
          let newID = createNewsLink(newLink)
          linksArr.push(newID)
        })

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
