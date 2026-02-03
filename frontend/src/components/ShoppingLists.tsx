import React, {useEffect, useState} from 'react';
import type {List} from "../Types/List.ts";
import ListCard from "./ListCard.tsx";
import axios from "axios";

export default function ShoppingLists(props) {

    //Test data
    const dummyLists: List[] = [
        { id: 1, name: "Wocheneinkauf",content:"Milch" },
        { id: 2, name: "Party-Einkauf",content:"Getränke" },
        { id: 3, name: "Obst & Gemüse",content:"Erdbeeren" },
    ];
    const [lists, setLists] = useState<List[]>();
    const [error, setError] = useState("");
    useEffect(()=>{axios.get("/api/lists")
        .then(response => setLists(response.data))
        .catch(() => setError("Failed to load shopping lists"))},[])

    if(!lists){
        return "No shopping lists yet!"
    }

    return (
        <><h1>My shopping lists</h1>
            {error && <p>{error}</p>}
        <div className={"ShoppingLists"}>
            {lists.map(list =><ListCard list={list} key={list.id}/>)}
        </div>
        </>
    );
}

