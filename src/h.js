import { withoutNulls } from './utils/array.js'

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
}

export function h(tag, props = {}, children = []) {
    return {
        type: DOM_TYPES.ELEMENT,
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
    }
}

export function hString(str) {
    return {
        type: DOM_TYPES.TEXT,
        value: str,
    }
}

export function hFragment(children) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(children)),
    }
}

function mapTextNodes(children) {
    return children.map((child) => {
        if (typeof child === 'string') {
            return hString(child)
        }
        return child
    })
}
