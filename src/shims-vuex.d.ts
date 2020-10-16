import { StoreState } from './store/index'
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StoreState>
  }
}
