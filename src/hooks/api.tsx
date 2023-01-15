import { AxiosResponse } from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { Store } from './store';

interface iX {
  [index: string]: any;
}

export function useMany<T extends iX>(
  model: string,
  params?: {},
  initialData?: T,
  enabled: boolean = true,
  queryKey: string = ''
) {
  return useQuery<T>(
    queryKey || `${model}/${new URLSearchParams(params)}`,
    Store.finds<T>(model, params),
    { initialData, enabled }
  );
}

export function useInfiniteData<T extends iX>(
  model: string,
  added: number,
  params: { page: string; cmd: string },
  enabled: boolean = false,
  options?: {}
) {
  return useInfiniteQuery<AxiosResponse<T>, Error, T>(
    `${model}/${new URLSearchParams(params.cmd)}`,
    ({ pageParam = 0 }) =>
      Store.get<T>(
        `${model}?${new URLSearchParams(params)}slimit=${
          pageParam * Number(params.page) + added
        }`
      ),
    { ...options, enabled }
  );
}
