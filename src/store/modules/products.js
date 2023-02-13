import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

const products = {
  state() {
    return {
      countDataset: [],
      recentDataset: [],
      rateDataset: [],
      mdDataset: [],
      currentCategory: "",
      currentSort: "count",
      rankingDataset: [],
      DetailData: [],
      SearchValue: [],
    };
  },
  actions: {
    getCountDataset(context) {
      axios.get("api/products/sort/count").then((data) => {
        context.commit("setCountDataset", data);
      });
    },
    getRecents(context) {
      axios.get("api/products/sort/recents").then((data) => {
        context.commit("setRecents", data);
      });
    },
    getRating(context) {
      axios.get("api/products/sort/rating").then((data) => {
        context.commit("setRating", data);
      });
    },
    getMD(context) {
      axios.get("api/products/sort/rating").then((data) => {
        context.commit("setMD", data);
      });
    },
    getCatCount(context, state) {
      axios.get(`api/products/sort/count/category/${state}`).then((data) => {
        context.commit("setCatCount", data);
      });
    },
    getCatRecent(context, state) {
      axios.get(`api/products/sort/recent/category/${state}`).then((data) => {
        context.commit("setCatRecent", data);
      });
    },
    rankingDataset(context) {
      if (this.state.currentCategory) {
        axios
          .get(
            `api/products/sort/${this.state.currentSort}/category/${this.state.currentCategory}`
          )
          .then((data) => {
            context.commit("setRankingDataset", data);
          });
      } else if (this.state.currentCategory == "") {
        axios
          .get(`api/products/sort/${this.state.currentSort}/`)
          .then((data) => {
            context.commit("setRankingDataset", data);
          });
      }
    },
    rankingDatasetInit(context, state) {
      axios.get(`api/products/sort/${state}`).then((data) => {
        context.commit("setRankingDatasetInit", data);
      });
    },
    getDetailData(context, state) {
      axios.get(`api/products/${state.id}`).then((data) => {
        context.commit("setDetailData", data);
      });
    },
    getSearchResult(context, state) {
      axios.get(`api/products/search?value=${state}`).then((data) => {
        context.commit("setSearchValue", data);
      });
    },
  },
};
export default products;