const BASE_URL = import.meta.env.VITE_API_URL;

export const getData = <T>(
  path: string,
  setFunc: React.Dispatch<React.SetStateAction<T>>
) => {
  fetch(BASE_URL + path)
    .then((res) => res.json())
    .then((res) => setFunc(res))
    .catch(console.log);
};
