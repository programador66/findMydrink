import axios from "axios";

class Api {
  constructor() {
    const api = axios.create({
      baseURL: `https://www.thecocktaildb.com/api/json/v1/1/`,
    });
    this.api = api;
  }
}

export default Api;
