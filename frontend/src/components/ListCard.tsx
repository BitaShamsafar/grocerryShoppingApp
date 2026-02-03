import type {List} from "../Types/List.ts";

type ListProps={
    list:List
}
export default function ListCard(props:ListProps) {
    return (
        <div className={"ListCard"}>
            <h3>{props.list.name}</h3>
            <p>{props.list.content || "Empty!"}</p>
        </div>
    );
}
