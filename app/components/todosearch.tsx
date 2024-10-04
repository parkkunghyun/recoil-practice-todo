"use client"

import { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../atom";

export default function SearchBar() {
    const todoList = useRecoilValue(todoListState)
    const [inputValue, setInputValue] = useState("")

    return (
        <div className="mx-auto my-8 flex w-[320px] md:w-[550px] justify-center items-center relative">
            <input placeholder="찾고 싶은 todo를 검색해주세요" type="text" className="flex-1 p-4 pr-12 text-3xl text-white bg-transparent border rounded-2xl"
                value={inputValue}  />
            <button className="absolute text-4xl text-white cursor-pointer right-4" >
                <FaSearchPlus/>
            </button>
        </div>
    )
}