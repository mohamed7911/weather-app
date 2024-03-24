import { QueryFunction, QueryKey, useQuery } from "react-query";

import { Toast } from "components";

interface UseFetchOptions<T> {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  options?: any;
}

export default function useFetch<T>({ queryKey, queryFn, options }: UseFetchOptions<T>) {
  return useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...options,
    onError: (error: any) => {
      Toast({ icon: "error", title: error.data.error.message });
    },
  });
}
