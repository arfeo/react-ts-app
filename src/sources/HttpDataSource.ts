class HttpDataSource {
  public get(url: string): Promise<any> {
    return this.send(encodeURI(url), 'GET');
  }

  public post(url: string, data = {}): Promise<any> {
    return this.send(encodeURI(url), 'POST', data);
  }

  public put(url: string, data = {}): Promise<any> {
    return this.send(encodeURI(url), 'PUT', data);
  }

  public remove(url: string, data = {}): Promise<any> {
    return this.send(encodeURI(url), 'DELETE', data);
  }

  private send(url: string, method = 'POST', data?: any): Promise<any> {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: data && JSON.stringify(data),
    }).then(this.response);
  }

  private response = async (response: any): Promise<any> => {
    const raw: string = await response.text();
    const parsed: any = raw ? JSON.parse(raw) : { success: response.ok };

    return response.ok ? Promise.resolve(parsed) : Promise.reject(parsed);
  }
}

export { HttpDataSource };
