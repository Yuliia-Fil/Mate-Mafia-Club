const BASE_URL = "https://mate-mafia-club-0mq7.onrender.com";
// const BASE_URL_LOCAL = "http://127.0.0.1:8000";

export const getData = <T>(
  path: string,
  setFunc: React.Dispatch<React.SetStateAction<T>>
) => {
  fetch(BASE_URL + path)
    .then((res) => res.json())
    .then((res) => setFunc(res))
    .catch(console.log);
};
