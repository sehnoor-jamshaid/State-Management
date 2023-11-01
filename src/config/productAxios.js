
import { AppAxios, Headers, liveAppAxios } from "../axios";

export const FAQS = `/products`;


export function getAllProducts() {
    return liveAppAxios.get(FAQS);
}

export function getFaqsById(id) {
    return liveAppAxios.get(`${FAQS}/${id}?resourceVersion=id%3A28408`);
}
