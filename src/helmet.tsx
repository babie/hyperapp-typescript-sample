import { h, VNode, Component } from 'hyperapp'
import traverse from 'traverse'

const HELMET_CONTAINER_CLASS_NAME = 'hyperapp-helmet-container'
const HELMET_CHILD_CLASS_NAME = 'hyperapp-helmet-child'

function assortVNodes(nodes: VNode[]) {
  const titleNodes = nodes.filter(node => node.nodeName === 'title')
  const tagNames = ['meta', 'base', 'link', 'style', 'script']
  const otherNodes = nodes.filter(node => tagNames.includes(node.nodeName))

  return [titleNodes, otherNodes]
}

function appendHelmet(helmet: THelmet) {
  const [titleNodes, otherNodes] = assortVNodes(helmet.children)

  updateTitle(titleNodes)
  appendTags(otherNodes)
}

function appendTags(nodes: VNode[]) {
  const headElement = document.getElementsByTagName('head')[0]
  nodes
    .map((child: VNode) => VNodeToDOM(child))
    .forEach((t: Element) => headElement.appendChild(t))
}

function updateHelmet(helmet: THelmet) {
  const [titleNodes, otherNodes] = assortVNodes(helmet.children)
  updateTitle(titleNodes)
  removeTags(`.${HELMET_CHILD_CLASS_NAME}.${helmet.key}`)
  appendTags(otherNodes)
}

function removeHelmet(helmet: THelmet) {
  removeTags(`.${HELMET_CHILD_CLASS_NAME}.${helmet.key}`)
}

function removeTags(selector: string) {
  const headElement = document.getElementsByTagName('head')[0]
  const oldTags: Element[] = Array.prototype.slice.call(
    headElement.querySelectorAll(selector)
  )
  oldTags.forEach((t: Element) => {
    headElement.removeChild(t)
  })
}

function updateTitle(titleNodes: VNode[]) {
  const title = titleNodes
    .map(titleNode =>
      titleNode.children
        .filter<string>((child): child is string => !!child)
        .map((child: string) => child)
        .join('')
    )
    .join('')
  if (title !== '' && title !== document.title) {
    document.title = title
  }
}

function VNodeToDOM({ nodeName, attributes, children }: VNode) {
  const element = document.createElement(nodeName)
  if (attributes !== undefined) {
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
      .map(child => VNodeToDOM(child))
  }

  return element
}

interface THelmet {
  key: string
  children: VNode[]
}
interface HelmetAttributes {
  key: string
}

export const Helmet: Component<HelmetAttributes, {}, {}> = (
  attributes: HelmetAttributes,
  children: any[]
) => {
  const tmpChildren: VNode[] = children
    .filter<VNode>((child): child is VNode => !!child)
    .map((child: VNode) => {
      if (child.nodeName !== 'title') {
        child.attributes = {
          ...child.attributes,
          class: [HELMET_CHILD_CLASS_NAME, attributes['key']].join(' ')
        }
      }
      return child
    })
  const helmet: THelmet = {
    key: attributes['key'],
    children: tmpChildren
  }
  const oncreate = () => {
    appendHelmet(helmet)
  }
  const onupdate = () => {
    updateHelmet(helmet)
  }
  const onremove = (_e: Element, done: () => void) => {
    removeHelmet(helmet)
    done()
  }
  return (
    <div
      key={attributes['key']}
      class={HELMET_CONTAINER_CLASS_NAME}
      style={{ display: 'none' }}
      oncreate={oncreate}
      onupdate={onupdate}
      onremove={onremove}
    />
  )
}

export const getHelmetChildren = (node: any, state: any, actions: any): any => {
  const tree = resolveNode(node, state, actions)
  return traverse(tree).reduce((acc: any[], n: any) => {
    if (
      n &&
      typeof n === 'object' &&
      n.nodeName === 'div' &&
      n.attributes['class'] === HELMET_CONTAINER_CLASS_NAME
    ) {
      return [...acc, ...n.children]
    }
    return acc
  }, [])
}

const resolveNode = (node: any, state: any, actions: any): any => {
  if (typeof node === 'function') {
    return resolveNode(node(state, actions), state, actions)
  }

  return node
}
