const BASE_URL = "http://3.120.199.183/api";

export const getData = <T>(
  path: string,
  setFunc: React.Dispatch<React.SetStateAction<T>>
) => {
  fetch(BASE_URL + path)
    .then((res) => res.json())
    .then((res) => setFunc(res))
    .catch(console.log);
};
