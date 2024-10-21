// fetchUtils.js
export const advancedFetch = async (url, method = "GET", data = null) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      accept: "text/plain",
      "Cache-Control": "no-cache", 
    },
    cache: "no-store", 
    body: data ? JSON.stringify(data) : null,
  });

  const responseData = await response.json();
  return responseData;
};
 