import axios from 'axios';

const { VITE_HOST } = import.meta.env;
const { VITE_GITHUB_ID } = import.meta.env;

const xapi = axios.create({
  baseURL: `${VITE_HOST}`,
  headers: {
    Authorization: `Bearer ${VITE_GITHUB_ID}`,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain',
  },
});

interface iX {
  [index: string]: any;
}

interface idX {
  [index: string]: any;
  id?: number;
}

export const Store = {
  finds<T extends iX>(model: string, params?: {}) {
    return () =>
      this.fetches<T>(model, params).catch(err => {
        return err.response.status;
      });
  },
  async fetches<T extends iX>(model: string, params?: {}) {
    const url =
      params && Object.keys(params).length
        ? `${model}?${new URLSearchParams(params)}`
        : `${model}`;
    const res = await this.get<T>(url);
    return res.data;
  },

  get<T>(uri: string) {
    return xapi.get<T>(uri);
  },
};
