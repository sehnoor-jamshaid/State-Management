
import axios from "axios";


export const liveAppAxios = axios.create({
  baseURL: "https://dummyjson.com/",
})

export const AppAxios = axios.create({
  baseURL: "http://192.168.0.30:85",

});

export const Headers = () => {

  return {
    Accept: "application/json",
    // "Content-Type": "application/json",

  };
};

