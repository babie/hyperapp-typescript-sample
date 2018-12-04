import { h, VNode, Component } from 'hyperapp'
import HeadManager from './helmet-manager'
import traverse from 'traverse'

let idealHeadChildren: VNode[] = []
const mountedHeadChildrenSets = new Set<VNode[]>()
const headManager = new HeadManager()

function updateCurrentHeadChildren() {
  idealHeadChildren = Array.from(mountedHeadChildrenSets)
    .reduce((a, b) => {
      return a.concat(b)
    }, [])
    .map(child => {
      child.attributes = { ...child.attributes, class: 'hyperapp-helmet' }
      return child
    })
  if (typeof window !== 'undefined') {
    headManager.updateHead(idealHeadChildren)
  }
}

interface HelmetAttributes {
  key: string
}
export const Helmet: Component<HelmetAttributes, {}, {}> = (
  attributes: HelmetAttributes,
  children: any[]
) => {
  const headChildren = children.filter<VNode>(
    (child): child is VNode => !!child
  )
  const oncreate = () => {
    mountedHeadChildrenSets.add(headChildren)
    updateCurrentHeadChildren()
  }
  const onupdate = () => {
    updateCurrentHeadChildren()
  }
  const onremove = (_el: Element, done: () => void) => {
    mountedHeadChildrenSets.delete(headChildren)
    updateCurrentHeadChildren()
    done()
  }
  return (
    <div
      key={attributes['key']}
      class="hyperapp-helmet-div"
      style={{ display: 'none' }}
      oncreate={oncreate}
      onupdate={onupdate}
      onremove={onremove}
    />
  )
}

export const getHeadChildren = (node: any, state: any, actions: any): any => {
  const tree = resolveNode(node, state, actions)
  return traverse(tree).reduce((acc: any[], n: any) => {
    if (
      n &&
      typeof n === 'object' &&
      n.nodeName === 'div' &&
      n.attributes['class'] === 'hyperapp-helmet-div'
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
