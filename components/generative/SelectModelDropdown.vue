<template>
  <b-field>
    <b-select
      v-model="selectedAction"
      placeholder="Select Model"
      class="select-dropdown">
      <option v-for="action in actions" :key="action" :value="action">
        {{ $t('sort.model.' + action) }}
      </option>
    </b-select>
  </b-field>
</template>

<script lang="ts">
import { Component, VModel, mixins } from 'nuxt-property-decorator'
import { availableReplicateModels } from '@/utils/constants'
import PrefixMixin from '@/utils/mixins/prefixMixin'

@Component
export default class SelectModelDropdown extends mixins(PrefixMixin) {
  @VModel({ type: [Array, String] }) selectedAction!: string | string[]

  get actions(): string[] {
    return availableReplicateModels
  }
}
</script>
