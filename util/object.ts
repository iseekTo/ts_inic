/*
 * @Date: 2020-05-12 14:45:16
 * @Author: lyb
 * @LastEditors: lyb
 * @LastEditTime: 2020-06-06 17:34:51
 */

type keyString = {
    [x: string]: unknown;
}

/** 是否是对象 */
export const isObject = (obj: object): boolean => typeof obj === 'object' && typeof obj !== null

/**
 * @Quote of Redux
 * @returns 是否是一个简单的对象
 */
export const isPlainObject = (obj: object): boolean => {
    if (isObject(obj)) return false;
    let proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
};


/**
 * @description 浅拷贝
 * @param obj 空对象
 * @param sourceObj 待copy对象
 * @returns { obj }
 */
export const shallowCopy = (obj: keyString, sourceObj: keyString): object | Error => {
    if (!isObject(obj) || !isObject(sourceObj)) {
        throw 'element must be a 【object】'
    }

    for (const _key in sourceObj) {
        obj[_key]  = sourceObj[_key]
    }
    return obj
}

export const toObject = (ary: Array<keyString>): object => {
    const obj: keyString = Object.create(null)
    for (let i = 0; i < ary.length; i++){
        if (ary[i]) {
            shallowCopy(obj, ary[i])
        }
    }
    return obj
}

/**
 * @description 约束全局对象，禁止修改
 * @created 2020年06月06日17:21:40
 * @author lyb
 * @use 
 *     GlobalDefineConst(_env, 'production')
 *     _env -> 'production'  -> can not modify
 */
export const GlobalDefineConst = <T>(variable: string, value: T): Error | T => {
    return Object.defineProperty(_window, variable, {
        set() {
            throw 'Not Allow Assignment to constant variable'
        },
        get() {
            return value
        }
    })
}