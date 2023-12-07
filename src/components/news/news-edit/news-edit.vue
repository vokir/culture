<template>
  <news-form
    edit
    title="Редактировать новость"
    :close-modal-prop="closeModalProp"
    @on-save="update"
    @on-cancel="onCancel"
  />
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useNewsStore } from '../../../store/newsStore';

import NewsForm from '../news-form/news-form.vue';

export default {
  name: 'NewsEdit',
  components: { NewsForm },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['onDone'],
  setup({ id }, { emit }) {
    const toast = useToast();
    const closeModalProp = ref(false);
    const store = useNewsStore();
    const {
      updateNews,
      onDoneUpdateNews,
      onErrorUpdateNews,
      refetch,
      createNewsLink,
      deleteNewsLink
    } = store;

    onDoneUpdateNews(() => {
      toast.success('Новость успешно обновлена');
      emit('onDone');
      refetch();
    });

    onErrorUpdateNews((response) => {
      let error = JSON.parse(JSON.stringify(response));
      toast.error(error.message);
    });

    const update = (data, addedLinks, removedLinks) => {
      addedLinks.forEach((link) => {
        const newLink = {
          title: link.name,
          link: link.link,
          newsID: Number(id)
        };
        createNewsLink(newLink);
      });

      removedLinks.forEach((link) => {
        const newLink = {
          id: link.id
        };
        deleteNewsLink(newLink);
      });

      const news = {
        id: Number(id),
        title: data.title,
        icon: data.icon?.id,
        types: Object.keys(data.type).length ? [data.type].map((type) => type.ID) : [],
        desc: data.desc,
        imgLandscape: data.imgLandscape?.id ?? null,
        imgLibrary: data.imgLibrary?.id ?? null,
        fullDesc: data.fullDesc,
        phone: data.phone,
        btnLink: data.button.length ? data.button[0].link : '',
        btnText: data.button.length ? data.button[0].name : '',
        complexes: Object.keys(data.complex).length
          ? [data.complex].map((complex) => complex.ID)
          : [],
        contacts: data.contacts.map((contact) => contact.ID),
        houses: data.houses.map((el) => el.ID),
        approaches: data.approaches.map((el) => el.ID),
        floors: data.floors.map((el) => el.ID),
        premises: data.premises.map((el) => el.ID),
        priority: Object.keys(data.priority).length ? data.priority.ID : 1,
        documents: data.docs.map((el) => el.ID),
        image: data.image?.id
      };
      if (news.title.length && (news.icon || news.image) && news.priority) {
        updateNews(news);
      } else {
        toast.error(
          'Заполните обязательные поля (степень важности, заголовок, иконка или изображение)'
        );
      }
    };

    const onCancel = () => {
      closeModalProp.value = true;
    };

    return {
      closeModalProp,
      update,
      onCancel
    };
  }
};
</script>
