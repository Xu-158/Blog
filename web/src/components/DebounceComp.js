function debounce(fn, delay = 500, Switch = true) {
  let timer = null
  return function (params) {
    if (timer) clearTimeout(timer)

    if (!Switch) {
      return fn(params)
    }

    timer = setTimeout(() => {
      // el-button获取到的是数组，input获取到的是function
      if (!Array.isArray(fn)) {
        fn = [fn]
      }
      fn[0](params)
    }, delay)
  }
}

export default {
  functional: true,
  render: function (createElement, context) {
    const vNodeLists = context.slots().default
    const delay = context.props.delay
    const Switch = context.props.Switch

    if (!vNodeLists) {
      console.warn('必须有子元素');
      return null;
    }

    const vNode = vNodeLists[0] || {}

    console.log('vNode: ', vNode);

    console.log('vNode.componentOptions: ', vNode.componentOptions);

    if (vNode.componentOptions && vNode.componentOptions.tag === 'el-button') {
      console.log('vNode.componentOptions.listeners: ', vNode.componentOptions.listeners);
      const funDefault = vNode.componentOptions.listeners && vNode.componentOptions.listeners.click
      if (!funDefault) {
        console.warn('必须传入Click事件')
        return null;
      }
      const fun = debounce(funDefault, delay, Switch)

      vNode.componentOptions.listeners.click = fun
    } else if (vNode.tag && vNode.tag === 'input') {
      console.log('vNode: ', vNode);
      const funDefault = vNode.data.on && vNode.data.on.input
      if (!funDefault) {
        console.warn('必须传入input事件')
        return null;
      }
      const fun = debounce(funDefault, delay, Switch)

      vNode.data.on.input = fun
    } else {
      console.warn('仅支持input和el-button')
      return null;
    }

    return vNode;
  }
}