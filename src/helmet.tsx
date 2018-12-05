import { h, VNode, Component, app } from 'hyperapp'

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
    .map((child: VNode) => {
      const tmp: VNode = {
        ...child,
        attributes: {
          ...child.attributes,
          class: [HELMET_CHILD_CLASS_NAME, helmet.key].join(' ')
        }
      }
      return NodeToDOM(tmp)
    })
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

const assortNodes = (nodes: VNode[]): [VNode, VNode[]] => {
  const titleNode = nodes.filter(node => node.nodeName === 'title')[0]
  const tagNames = ['meta', 'base', 'link', 'style', 'script']
  const otherNodes = nodes.filter(node => tagNames.includes(node.nodeName))

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

let hyperappHelmets: IHelmet[] = []
export const Helmet: Component<IHelmetAttr, {}, {}> = (
  attributes: IHelmetAttr,
  children: any[]
) => {
  const [titleNode, otherNodes] = assortNodes(children)
  const helmet: IHelmet = {
    key: attributes['key'],
    titleNode,
    otherNodes
  }
  hyperappHelmets.push(helmet)
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

export const rewind = (view: any, state: any, actions: any): IHelmet => {
  const div = document.createElement('div')
  app(state, actions, view, div)
  const helmet: IHelmet = hyperappHelmets.reduce(
    (acc, cur) => {
      const tmpTitleNode: VNode = {
        nodeName: 'title',
        children: acc.titleNode
          ? [
              [...acc.titleNode.children, ...cur.titleNode.children]
                .filter(c => typeof c === 'string')
                .join('')
            ]
          : cur.titleNode.children,
        key: ''
      }
      const tmpOtherNodes: VNode[] = acc.otherNodes
        ? [...acc.otherNodes, ...cur.otherNodes]
        : cur.otherNodes
      return {
        key: '',
        titleNode: tmpTitleNode,
        otherNodes: tmpOtherNodes
      }
    },
    {} as IHelmet
  )
  hyperappHelmets = []
  console.dir(helmet)
  return helmet
}
