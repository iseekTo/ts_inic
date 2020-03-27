import { expect } from "chai";

interface Action<T> {
    payload?: T;
    type: string;
}

type Connected = {
    school: school,
    delay(input: number): Action<string>,
    setMessage(action: Date): Action<number>
};


type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type PickOnlyFuncType<T> = Pick<T, FunctionPropertyNames<T>>

// 仅挑选函数类型
let only_func: PickOnlyFuncType<Connected> = {
    delay() {
        return {
            payload: 'ss',
            type: '2'
        }
    },
    setMessage(action) {
        return {
            payload: action.getMilliseconds(),
            type: '2'
        }
    }
}

type someso = { 
    school: school,
    n: number,
    r: RegExp
}

type str = P<someso, 'school'>

// P泛型接收一个 T 类型，内部 U 从类型 T 获取全部的 键 --- 前置条件
// 定义 K 为键 遍历之前的 U(可以理解为一个string[])
// 最后根据第二个选择的 类型键 渲染对应的数据类型
type P<T, U extends keyof T> = {
    [K in U]: T[K]
} 