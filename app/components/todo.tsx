"use client";

import { useRecoilState } from "recoil";
import { todoListState } from "../atom";
import { FaTrashAlt } from "react-icons/fa";
import { supabase } from "../lib/supabase";

interface TodoItem {
    id: number;
    title: string;
    is_completed: boolean;
}

interface TodoProps {
    item: TodoItem;
}

// 배열에서 특정 인덱스의 아이템을 삭제하는 함수
function deleteItemAtIndex(arr: TodoItem[], index: number): TodoItem[] {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// 배열에서 특정 인덱스의 아이템을 교체하는 함수
function replaceItemAtIndex(arr: TodoItem[], index: number, newValue: TodoItem): TodoItem[] {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export default function Todo({ item }: TodoProps) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem.id === item.id); // item의 id로 인덱스 찾기

    // 항목의 완료 상태를 토글하는 함수
    const toggleItemCompletion = async () => {
        const newCompleted = !item.is_completed;

        // Supabase에서 완료 상태 업데이트
        const { error } = await supabase
            .from("todo2") // 테이블 이름을 확인하세요.
            .update({ is_completed: newCompleted })
            .eq("id", item.id);

        if (error) {
            console.error("Error updating:", error);
            return;
        }

        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            is_completed: newCompleted,
        });
        setTodoList(newList);
    };

    // 항목을 삭제하는 함수
    const deleteItem = async () => {
        // Supabase에서 항목 삭제
        const { error } = await supabase
            .from("todo2") // 테이블 이름을 확인하세요.
            .delete()
            .eq("id", item.id);

        if (error) {
            console.error("Error deleting:", error);
            return;
        }

        const newList = deleteItemAtIndex(todoList, index);
        setTodoList(newList); // 삭제된 리스트로 업데이트
    };

    return (
        <div className="mx-auto border-b-4 p-4 flex items-center my-8 w-[320px] md:w-[550px]">
            <input
                className="w-6 h-6 mr-4" // 체크박스 크기 조정
                type="checkbox"
                checked={item.is_completed}
                onChange={toggleItemCompletion}
            />
            <p
                className={`flex-1 text-2xl font-bold text-white ${item.is_completed ? 'line-through text-gray-500' : ''}`} // 체크 상태에 따른 스타일 변경
            >
                {item.title}
            </p>
            <button className="text-4xl text-white cursor-pointer" onClick={deleteItem}>
                <FaTrashAlt />
            </button>
        </div>
    );
}
