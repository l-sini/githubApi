import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
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
    { initialData, enabled, onError: error => console.error(error) }
  );
}
