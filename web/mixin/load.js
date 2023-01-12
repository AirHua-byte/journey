export default {
  data() {
    return {
      page: 1,
      loadType: 'more',
      time: null,
    };
  },
  methods: {
    $loadMore(type, callback, from) {
      if (type === 'none') {
        // reset
        this.page = 1;
        this.loadType = 'more';
        return;
      }
      if (this.loadType === 'loading' || this.loadType === 'nomore') {
        return;
      }
      const axios = this.$nuxt.$options?.$axios;

      this.page++;
      this.setLoadType('loading');

      this.time = new Date().getTime();

      const params = { page: this.page, from };
      axios
        .get(type, { params })
        .then((res) => {
          const data = res.data.body;
          const result = data.page === data.totalPage ? 'nomore' : 'more';

          // loading 效果最少 500ms
          let timer = 500 - new Date().getTime() + this.time;
          timer = timer < 0 ? 0 : timer;

          setTimeout(() => {
            callback(res.data);
            this.setLoadType(result);
            this.$setScroll('index');
          }, timer);
        })
        .catch((err) => {
          this.page--;
          this.setLoadType('more');
          callback(err);
        });
    },
    setLoadType(type) {
      const store = this.$nuxt.$store;
      store.commit('setStatus', type);
      this.loadType = type;
      this.time = null;
    },
    $loadStatus(data) {
      if (data && data.page === data.totalPage) {
        this.setLoadType('nomore');
      }
    },
  },
};
