"use client"

import { useRecoilState, useRecoilValue } from "recoil"
import Todo from "./todo"
import { todoListState } from "../atom"
import { useEffect } from "react"
import { supabase } from "../lib/supabase"


export default function TodoList() {
    const [todoList, setTodoList] = useRecoilState(todoListState)

    useEffect(() => {
        const fetchTodos = async () => {
            const { data, error } = await supabase.from("todo2").select("*")

            if (error) {
                console.error("Error")
            } else {
                setTodoList(data)
            }
        }
        fetchTodos()
    }, [])

    return (
        <div>
            {
                todoList.map(todoItem => (
                    <Todo key={todoItem.id} item={todoItem} />
                ))
            }
        </div>
    )
}