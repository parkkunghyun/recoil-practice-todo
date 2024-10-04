import { atom } from "recoil";

interface Todo {
    id: number;
    title: string;
    is_completed: boolean;
}


export const todoListState = atom<Todo[]>({
    key: 'todoListState',
    default: [
    ],
})