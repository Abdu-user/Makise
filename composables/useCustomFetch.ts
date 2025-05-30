import { ref } from "vue";

export function useCustomFetch<T = unknown>(url: string, options?: RequestInit) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      data.value = await response.json();
    } catch (err: any) {
      error.value = err;
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, error, loading, refetch: fetchData };
}
