import { useState, useEffect } from "react";

const cache = {}; // Cache to store responses by URL

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Check if cached data exists
      if (cache[url]) {
        setData(cache[url]);
        setLoading(false);
        return;
      }

      let retries = 3;
      while (retries > 0) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch data");

          const result = await response.json();
          cache[url] = result; // Cache the result
          setData(result);
          setLoading(false);
          return;
        } catch (err) {
          retries -= 1;
          if (retries === 0) {
            setError(err.message);
            setLoading(false);
          }
        }
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
