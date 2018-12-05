import { h, VNode, Component, app } from 'hyperapp'
import traverse = require('traverse')

const HELMET_CONTAINER_CLASS_NAME = 'hyperapp-helmet-container'
const HELMET_CHILD_CLASS_NAME = 'hyperapp-helmet-child'

const appendHelmet = (helmet: IHelmet) => {
  updateTitle(helmet)
  appendOthers(helmet)
}

const updateHelmet = (helmet: IHelmet) => {
  removeHelmet(helmet)
  appendHelmet(helmet)
}

const removeHelmet = (helmet: IHelmet) => {
  const selector = `.${HELMET_CHILD_CLASS_NAME}.${helmet.key}`

  const headElement = document.getElementsByTagName('head')[0]
  const oldTags: Element[] = Array.prototype.slice.call(
    headElement.querySelectorAll(selector)
  )

  oldTags.forEach((t: Element) => {
    headElement.removeChild(t)
  })
}

const updateTitle = (helmet: IHelmet) => {
  const title = helmet.titleNode.children.join('')
  if (typeof title === 'string' && title !== document.title) {
    document.title = title
  }
}

const appendOthers = (helmet: IHelmet) => {
  const headElement = document.getElementsByTagName('head')[0]
  helmet.otherNodes
    .map((child: VNode) => NodeToDOM(child))
    .forEach((t: Element) => headElement.appendChild(t))
}

const NodeToDOM = ({ nodeName, attributes, children }: VNode) => {
  const element = document.createElement(nodeName)
  if (typeof attributes !== 'undefined') {
    const attrs: Map<string, string> = new Map(Object.entries(attributes))
    attrs.forEach((attrVal, attrKey) => {
      element.setAttribute(attrKey.toLowerCase(), attrVal)
    })
  }

  if (typeof children === 'string') {
    element.textContent = children
  } else if (typeof children !== 'undefined') {
    children
      .filter<VNode>((child): child is VNode => !!child)
      .map(child => NodeToDOM(child))
  }

  return element
}

const setupNodes = (key: string, nodes: VNode[]): [VNode, VNode[]] => {
  const titleNode = nodes.filter(node => node.nodeName === 'title')[0]
  const tagNames = ['meta', 'base', 'link', 'style', 'script']
  const otherNodes = nodes
    .filter(node => tagNames.includes(node.nodeName))
    .map((child: VNode) => {
      return {
        ...child,
        attributes: {
          ...child.attributes,
          class: [HELMET_CHILD_CLASS_NAME, key].join(' ')
        }
      }
    })

  return [titleNode, otherNodes]
}

interface IHelmet {
  key: string
  titleNode: VNode
  otherNodes: VNode[]
}

interface IHelmetAttr {
  key: string
}

export const Helmet: Component<IHelmetAttr, {}, {}> = (
  attributes: IHelmetAttr,
  children: any[]
) => {
  const key = attributes.key
  const [titleNode, otherNodes] = setupNodes(key, children)
  const helmet: IHelmet = {
    key,
    titleNode,
    otherNodes
  }
  const oncreate = () => {
    updateHelmet(helmet)
  }
  const onupdate = () => {
    updateHelmet(helmet)
  }
  const onremove = (_e: Element, done: () => void) => {
    removeHelmet(helmet)
    done()
  }
  return (
    <template
      key={key}
      id={key}
      class={HELMET_CONTAINER_CLASS_NAME}
      style={{ display: 'none' }}
      oncreate={oncreate}
      onupdate={onupdate}
      onremove={onremove}
    >
      {titleNode}
      {otherNodes}
    </template>
  )
}

export const rewind = (view: any, state: any, actions: any): VNode => {
  const nodes = resolveNode(view, state, actions)
  return traverse(nodes).reduce((acc, node: VNode) => {
    if (node && node.nodeName === 'template') {
      const attributes = node.attributes as any
      if (attributes && attributes.class === HELMET_CONTAINER_CLASS_NAME) {
        return [...acc, ...node.children]
      }
    }
    return acc
  }, [])
}

const resolveNode = (node: any, state: any, actions: any): VNode => {
  return typeof node !== 'function'
    ? node
    : resolveNode(node(state, actions), state, actions)
}
