"use client"

import {RecoilRoot} from 'recoil'
import TodoList from './components/todolist'
import Logo from './components/logo'
import TodoAdd from './components/todoadd'

export default function UI () {
    return (
        <div className='flex flex-col items-center w-full h-screen bg-[#212121]'>
            <RecoilRoot>
                <Logo />
                <TodoList />
                <TodoAdd/>
            </RecoilRoot>
        </div>
    )
}