<template>
  <div class="search">
    <div class="search-filter">
      <input v-model="str" class="search-input" type="text">
    </div>
    <div class="search-btns">
      <button @click="filterTable" class="search-searchBtn">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.8286 13.9238L11.3486 9.44382C11.9386 8.52682 12.2846 7.42682 12.2846 6.24582C12.2846 2.96582 9.61662 0.298828 6.33762 0.298828C3.05762 0.298828 0.390625 2.96582 0.390625 6.24582C0.390625 9.52582 3.05862 12.1928 6.33762 12.1928C7.62062 12.1928 8.80262 11.7858 9.77962 11.0928L14.2196 15.5328C14.4416 15.7568 14.7896 15.7568 15.0116 15.5328L15.8466 14.6978C16.0506 14.4938 16.0506 14.1478 15.8266 13.9238H15.8286ZM1.32862 6.26582C1.32862 3.49582 3.56862 1.25583 6.33862 1.25583C9.10863 1.25583 11.3486 3.49582 11.3486 6.26582C11.3486 9.03582 9.10863 11.2758 6.33862 11.2758C3.56862 11.2758 1.32862 9.03582 1.32862 6.26582Z"
            fill="#F2F4F5"
          />
        </svg>
      </button>
      <button class="search-clearBtn">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.25 3.75L3.75004 14.25"
            stroke="#F2F4F5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.75 3.75L14.25 14.25"
            stroke="#F2F4F5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>

</template>
<script>
  import { ref } from 'vue';
  export default {
    setup(props,context){
      let str = ref('')

      const filterTable = () => {
        if(str.value.length > 0){

          context.emit('filterTable', str)

        }
      }
      return{
        str,
        filterTable
      }
    }
  };
</script>

<style lang="scss" src="./style.scss" scoped />
