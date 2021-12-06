import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElRadio,
  ElSubMenu,
  ElTabPane,
  ElTabs,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElSwitch,
  ElRow,
  ElCol,
  ElTableColumn,
  ElTable,
  ElPagination,
  ElTree,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElCard,
  ElTooltip
} from 'element-plus/lib'

import 'element-plus/dist/index.css'
import ElBreadcrumb, {
  ElBreadcrumbItem
} from 'element-plus/es/components/breadcrumb'
import { ElDialog, ElImage } from 'element-plus'
const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElSwitch,
  ElRow,
  ElCol,
  ElBreadcrumbItem,
  ElBreadcrumb,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElCard,
  ElTooltip
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
