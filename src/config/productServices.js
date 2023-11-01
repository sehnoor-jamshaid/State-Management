
import * as requestFromServer from "./productAxios";

export const fetchProducts = async () => {
    return requestFromServer
        . getAllProducts()
        .then((res) => {
            console.log("FAQS RES", res);
           let result=res.data.products
           return result
        })
        .catch((err) => {
            
            console.log("error faqs=>", err.message)
        });
}

export const fetchFaqById = async (setData, id, openSnackbar) => {
    return requestFromServer
        .getFaqsById(id)
        .then((res) => {
            setData(res.data.data)
        })
        .catch((err) => {
            openSnackbar(err.message);
            console.log(err.message);
        })
}
