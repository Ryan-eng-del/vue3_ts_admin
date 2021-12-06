interface RDform {
  itemMenus: inputItem<optionItem>[]
  labelWidth: string
  layoutStyle?: any
}
interface optionItem {
  value?: string
  label?: string
  title?: string
}
export interface inputItem<optionItem> {
  filed: string
  labelName: string
  placeholder?: string
  rules?: any[]
  type: string
  // 针对select
  options?: any
  itemStyle?: any
  //针对其他组件的v-bind= 对象 ==> 对象属性展开
  otherOptions?: any
}
export default RDform
