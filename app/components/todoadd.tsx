"use client"

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../atom";
import { supabase } from "../lib/supabase";

export default function TodoAdd() {
    const [inputValue, setInputValue] = useState('')
    const setTodoList = useSetRecoilState(todoListState)
    //useRecoilValue

    const addItem = async () => {
        if (inputValue !== "") {

            const { data, error } = await supabase.from("todo2").insert({
                title: inputValue,
                is_completed: false
            })

            if (error) {
                console.error("Error add : ", error)
                return
            }

            setTodoList((oldList) => [
                ...oldList,
                {
                    id: oldList.length + 1,
                    title: inputValue,
                    is_completed : false,
                }
            ])
            setInputValue('')
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // event.target.value로 변경
    };


    return (
        <div className="relative flex items-center justify-center w-full max-w-md mx-auto my-8 md:max-w-xl">
            <input
                placeholder="할 일을 입력해주세요"
                type="text"
                className="flex-1 p-4 pr-12 text-xl text-white bg-transparent border border-white md:text-2xl lg:text-3xl rounded-2xl focus:outline-none focus:border-blue-500"
                value={inputValue}
                onChange={onChange}
            />
            <button className="absolute text-2xl text-white cursor-pointer md:text-3xl lg:text-4xl right-4" onClick={addItem}>
                <FaPlus />
            </button>
        </div>
    );
}