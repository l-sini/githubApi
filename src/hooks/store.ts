import axios from 'axios';

const { VITE_HOST } = import.meta.env;
const { VITE_GITHUB_ID } = import.meta.env;

const xapi = axios.create({
  baseURL: `${VITE_HOST}`,
  headers: {
    Authorization: `Bearer ${VITE_GITHUB_ID}`,
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    // 'Access-Control-Allow-Credentials': true,
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
  async fetch<T extends iX>(model: string, idcmd?: number | string) {
    const res = await this.get<T>(idcmd ? `${model}/${idcmd}` : `${model}`);
    return res.data;
  },

  finds<T extends iX>(model: string, params?: {}) {
    return () => this.fetches<T>(model, params);
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
