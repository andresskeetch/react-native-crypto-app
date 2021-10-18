export class Http {
  static instance = new Http();

  async get(url) {
    try {
      const request = (await fetch(url)).json();

      return request;
    } catch (e) {
      console.log('Error get', e);
      throw e;
    }
  }

  async post(url, data) {
    try {
      const request = (
        await fetch(url, {
          method: 'POST',
          body: data,
        })
      ).json();

      return request;
    } catch (e) {
      console.log('Error post', e);
      throw e;
    }
  }
}
