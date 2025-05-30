// composables/useAsyncFunction.ts
import { ref } from "vue";

/**
 * A composable function for handling asynchronous operations with loading and error state management in Vue.
 *
 * @template T The expected type of the resolved value.
 * @param callback - An async function returning a Promise of a Response.
 * @param loadingCB - (Optional) A callback function called with the loading state (true/false).
 * @param errorCb - (Optional) A callback function called with the error message string.
 * @returns An object containing:
 *   - `value`: The result of the async operation (or null).
 *   - `isLoading`: A boolean indicating if the operation is in progress.
 *   - `error`: A string containing any error message.
 *   - `cb`: A function to execute the async operation.
 *
 
 * @example
 * const { value, isLoading, error, cb } = useAsyncFunction<MyType>(
 *   async () => await fetchData(),
 *   (loading) => {  handle loading state  },
 *   (errMsg) => {  handle error  }
 * );
 * // You must manually call cb() to start the async operation.
 */
export function useAsyncFunction<T>(
  callback: () => Promise<T>,
  loadingCB?: (p: boolean) => void,
  errorCb?: (p: string) => void,
  autoCallCB: boolean = true
) {
  const value = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref("");

  const cb = async () => {
    isLoading.value = true;
    loadingCB?.(true);
    error.value = "";
    try {
      value.value = await callback();
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      error.value = errMsg;
      errorCb?.(errMsg);
    } finally {
      isLoading.value = false;
      loadingCB?.(false);
    }
  };
  autoCallCB && cb();

  return { value, isLoading, error, cb };
}
