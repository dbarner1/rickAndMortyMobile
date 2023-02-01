export default async function fetchData(url: string, options?: any): Promise<any> {
  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      let data;
      if (options?.responseType === 'text') {
          data = await response.text();
      } else if (options?.responseType === 'json') {
          data = await response.json();
      } else if (options?.responseType === 'blob') {
          data = await response.blob();
      } else {
          data = await response.text();
      }
      return { data, response };
  } catch (error) {
      throw error;
  }
}

