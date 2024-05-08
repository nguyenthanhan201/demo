// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { vueFetch } from 'use-lightweight-fetch';
import { Module } from 'vuex';

// get images
const {
  handleData: handleGetImages,
  fetchedData: fetchedMedia,
  isError: isErrorImages,
  error: errorImages,
  errors: errorsImages,
  isLoading: isLoadingImages,
  isSuccess: isSuccessImages
} = vueFetch();

const unsplashStore: Module<any, any> = {
  namespaced: true,
  // state
  state: {
    unsplashImages: null,
    searchTerm: '',
    currentPageNumber: 1,
    orientationValue: null
    // end state
  },

  // getters
  getters: {
    getUnsplashImages(state) {
      return state.unsplashImages;
    },
    getSearchTerm(state) {
      return state.searchTerm;
    },
    getCurrentPageNumber(state) {
      return state.currentPageNumber;
    },
    getOrientationValue(state) {
      return state.orientationValue;
    }
    // end getters
  },

  // mutations
  mutations: {
    setUnsplashImages(state, payload) {
      state.unsplashImages = payload;
    },

    setSearchTerm(state, payload) {
      state.searchTerm = payload;
    },
    setCurrentPageNumber(state, payload) {
      state.currentPageNumber = payload;
    },
    setOrientationValue(state, payload) {
      state.orientationValue = payload;
    }
    // end mutations
  },

  // actions
  actions: {
    // load products
    loadUnsplashImages(context, payload) {
      // current orientation is null
      let orientationType = null;

      // check of search term is empty
      if (payload.orientation === null) {
        orientationType = '';
      }
      if (payload.orientation !== null) {
        orientationType = `&orientation=${payload.orientation}`;
      }

      // const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
      const unsplashKey = 'Client-ID 5m9Y7Ewvxu686LvPcfccdUKxIEJNWhhcnI2IkO95-ao';

      handleGetImages(
        `https://api.unsplash.com/search/photos?page=${payload.currentPage}&per_page=24&query=${payload.searchTerm}${orientationType}`,
        {
          headers: {
            'Accept-Version': 'v1',
            Authorization: unsplashKey
          }
        }
      );

      // context & send to mutation
      context.commit('setUnsplashImages', {
        fetchedMedia: fetchedMedia,
        isError: isErrorImages,
        error: errorImages,
        errors: errorsImages,
        isLoading: isLoadingImages,
        isSuccess: isSuccessImages
      });
    }
    // end action
  }
};

export default unsplashStore;
