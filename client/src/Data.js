import config from './config';

export default class Data {
  // API function
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) { 
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //function used to encode
      options.headers["Authorization"] = `Basic ${encodedCredentials}`; //adds crednetials th headers in options above // Basic because we are using basic authentication ex.: Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
    }

    return fetch(url, options);
  }
  // getUser Function
  async getUser(emailAddress, password) { //uses emailAddress and password to see who the user is
    const response = await this.api("/users", 'GET', null, true, {emailAddress, password}); // It stops here unless I change requiresAuth to false
    if (response.status === 200) {
      return response.json().then(data => data); //then return data
    }
    else if (response.status === 401) {
      console.log("1");
      return null;
    }
    else {
      throw new Error();
    }
  }
  // createUser Function
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
