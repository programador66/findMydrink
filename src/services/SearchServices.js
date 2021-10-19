import Api from "./Api";

class SearchServices extends Api {
  /**
   * @author Caio César Lacerda
   * @Params letter
   * @return object drinks
   */
  async getDrinkByFirstLetter(letter) {
    const response = await this.api.get(`search.php?f=${letter}`);
    return response;
  }

  /**
   * @author Caio César Lacerda
   * @Params letter
   * @return object drinks
   */
  async getDrinkByName(name) {
    const response = await this.api.get(`search.php?s=${name}`);
    return response;
  }

  /**
   * @author Caio César Lacerda
   * @Params letter
   * @return object drinks
   */
  async getCategories() {
    const response = await this.api.get(`list.php?c=list`);
    return response;
  }

  /**
   * @author Caio César Lacerda
   * @Params category
   * @return object drinks
   */
  async filterCategoryByName(category) {
    const response = await this.api.get(`filter.php?c=${category}`);
    return response;
  }

  /**
   * @author Caio César Lacerda
   * @Params id
   * @return object drinks
   */
  async getDrinkDetailById(id) {
    const response = await this.api.get(`lookup.php?i=${id}`);
    return response;
  }
}

export default new SearchServices();
