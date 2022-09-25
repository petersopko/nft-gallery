<template>
  <b-field>
    <b-dropdown v-model="selectedAction" class="select-dropdown">
      <template #trigger>
        <b-button
          type="is-primary"
          icon-right="caret-down"
          data-cy="gallery-sort-by">
          {{ selectedAction }}
        </b-button>
      </template>
      <b-dropdown-item v-for="action in actions" :key="action" :value="action">
        {{ $t('sort.' + action) }}
      </b-dropdown-item>
    </b-dropdown>
  </b-field>
</template>

<script lang="ts">
import { Component, Prop, VModel, mixins } from 'nuxt-property-decorator'
import { NFT_SQUID_SORT_CONDITION_LIST } from '@/utils/constants'
import PrefixMixin from '@/utils/mixins/prefixMixin'

@Component
export default class SearchSortDropdown extends mixins(PrefixMixin) {
  @VModel({ type: [Array, String] }) selectedAction!: string | string[]
  @Prop(Array) public sortOption?: string[]
  get actions(): string[] {
    return this.sortOption || this.sort
  }

  get sort(): string[] {
    return NFT_SQUID_SORT_CONDITION_LIST
  }
}
</script>

<style lang="scss">
/* cry in scss (global) */
.select-dropdown {
  select {
    border: 1px solid #7d7d7d !important;
  }
  @media screen and (max-width: 1216px) and (min-width: 768px) {
    width: 200px;
  }
}
</style>
