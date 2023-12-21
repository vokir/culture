import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import axiosInstance from '@/services/api.js';

export const useAuthStore = defineStore('auth', () => {
  const isAuth = useLocalStorage('isAuth', ref(false));
  const accessToken = useLocalStorage('accessToken', ref(''));
  const refreshToken = useLocalStorage('refreshToken', ref(''));

  const logout = () => {
    isAuth.value = false;
  };

  const signIn = async (email, password) => {
    try {
      const res = await axiosInstance.post('/admin/web/login', {
        email,
        password
      });

      if (res.status === 200) {
        const { data } = res.data;
        accessToken.value = `${data.tokenType} ${data.accessToken}`;
        refreshToken.value = data.refreshToken;
        isAuth.value = true;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isAuth,
    accessToken,
    refreshToken,
    signIn,
    logout
  };
});
