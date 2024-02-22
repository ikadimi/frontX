import { setAttributes } from './attributes'
import { addEventListeners } from './events'

export function mountDOM(vdom, parentEl) {
    switch (vdom.type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl)
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl)
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNode(vdom, parentEl)
            break;
        default: {
            throw new Error(`Invalid vdom type: ${vdom.type}`)
        }
    }
}

function createTextNode(vdom, parentEl) {
    const textNode = document.createTextNode(vdom.value)
    vdom.el = textNode
    parentEl.appendChild(textNode)
}

function createFragmentNode(vdom, parentEl) {
    vdom.el = parentEl;
    vdom.children.forEach((child) => {
        mountDOM(child, vdom.el)
    })
}

function createElementNode(vdom, parentEl) {
    const { tag, props, children } = vdom

    const element = document.createElement(tag)
    addProps(element, props, vdom)
    vdom.el = element

    children.forEach((child) => {
        mountDOM(child, element)
    })
    parentEl.appendChild(element)
}

function addProps(el, props, vdom) {
    const { on: events, ...attrs } = props;

    vdom.listeners = addEventListeners(events, el)
    setAttributes(el, attrs)
}