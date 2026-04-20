import axios from "axios";

export const fetchAdvice = async () => {
  const res = await axios.get("https://api.adviceslip.com/advice");
  return res.data.slip.advice;
};