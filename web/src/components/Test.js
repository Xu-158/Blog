export default {
  // 通过配置functional属性指定组件为函数式组件
  functional: true,
  props: {
    name: {
      type: String,
      default: 'nnn'
    }
  },
  render(h, context) {
    const { props } = context
    return <h2>{props.name}</h2>
  }
}