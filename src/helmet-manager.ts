import { VNode } from 'hyperapp'

const DEFAULT_TITLE = ''

export default class HeadManager {
  handleId?: number

  updateHead(headChildren: VNode[]) {
    // perform batch update
    if (this.handleId) {
      window.cancelAnimationFrame(this.handleId)
    }
    this.handleId = window.requestAnimationFrame(() => {
      this.handleId = undefined
      this.doUpdateHead(headChildren)
    })
  }

  doUpdateHead(headChildren: VNode[]) {
    const tagNodes: Map<string, VNode[]> = new Map()
    headChildren.forEach(child => {
      const nodes: VNode[] = tagNodes.get(child.nodeName) || []
      nodes.push(child)
      tagNodes.set(child.nodeName, nodes)

      const titleNodes = tagNodes.has('title')
        ? tagNodes.get('title')
        : undefined
      if (titleNodes !== undefined) {
        this.updateTitle(titleNodes)
      }

      const tagNames = ['meta', 'base', 'link', 'style', 'script']
      tagNames.forEach(tagName => {
        this.updateTags(tagName, tagNodes.get(tagName) || [])
      })
    })
  }

  updateTitle(titleNodes: VNode[]) {
    let title = DEFAULT_TITLE
    titleNodes.forEach(titleNode =>
      titleNode.children
        .filter<string>((child): child is string => !!child)
        .forEach((child: string) => {
          title = title + child
        })
    )
    if (title !== document.title) {
      document.title = title
    }
  }

  updateTags(tagName: string, tagNodes: VNode[]) {
    const headElement = document.getElementsByTagName('head')[0]
    const tmpTags: Element[] = Array.prototype.slice.call(
      headElement.querySelectorAll(tagName + '.hyperapp-helmet')
    )
    const oldTags: Element[] =
      tmpTags.filter<Element>((el): el is Element => !!el) || []
    const newTags: Element[] = tagNodes
      .map(NodeToDOM)
      .filter((newTag: Element) => {
        for (let i = 0, len = oldTags.length; i < len; i++) {
          const oldTag = oldTags[i]
          if (oldTag.isEqualNode(newTag)) {
            oldTags.splice(i, 1)
            return false
          }
        }
        return true
      })

    oldTags.map((t: Element) => {
      if (t.parentNode) {
        t.parentNode.removeChild(t)
      }
    })
    newTags.forEach((t: Element) => headElement.appendChild(t))
  }
}

function NodeToDOM({ nodeName, attributes, children }: VNode) {
  const element = document.createElement(nodeName)
  if (attributes !== undefined) {
    const attrs: Map<string, string> = new Map(Object.entries(attributes))
    attrs.forEach((value, key) => {
      element.setAttribute(key.toLowerCase(), value)
    })
  }

  element.textContent =
    typeof children === 'string' ? children : children.join('')
  return element
}
