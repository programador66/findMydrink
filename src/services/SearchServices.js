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
}

export default new SearchServices();
