import {api} from "../Services/api.ts";
import {useEffect, useState} from "react";

const useFetch = <T,>(query: string) => {
   const [data, setData] = useState<T | null>(null)
    useEffect(() => {
        api.get(query)
            .then(response =>{
                setData(response.data)
            }).catch(err => {
            throw new Error("error fetching data" + err)
        })
    }, [query]);

    return data

}
export default useFetch