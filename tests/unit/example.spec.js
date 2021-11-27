import { mount } from '@vue/test-utils'
import Menu from '../../src/components/Menu/Menu.vue'

test('view menu',  () => {
  const wrapper = mount(Menu)

  expect(wrapper.isVueInstance()).toBeTruthy()
})

test('button login',  () => {
  const wrapper = mount(Menu)

  expect(wrapper.html()).toContain('SZUKAJ LODA')
})