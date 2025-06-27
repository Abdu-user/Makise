// idb wrapper (easy IndexedDB API)
function openImageDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("image-cache", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function fetchWithCache(url: string): Promise<string> {
  const db = await openImageDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("images", "readonly");
    const store = tx.objectStore("images");
    const getRequest = store.get(url);

    getRequest.onsuccess = async () => {
      const cachedBlob = getRequest.result;
      if (cachedBlob) {
        const cachedUrl = URL.createObjectURL(cachedBlob);
        resolve(cachedUrl);
      } else {
        // Not cached: fetch and store
        try {
          const response = await fetch(url);
          const blob = await response.blob();

          const saveTx = db.transaction("images", "readwrite");
          const saveStore = saveTx.objectStore("images");
          saveStore.put(blob, url);

          const objectUrl = URL.createObjectURL(blob);
          resolve(objectUrl);
        } catch (err) {
          reject(err);
        }
      }
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}
