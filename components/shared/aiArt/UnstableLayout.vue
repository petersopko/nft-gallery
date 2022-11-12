<template>
  <div>
    <div v-if="$route.query.search" class="block">
      {{ $t('general.searchResultsText') }}
      <span class="text__stroked is-size-3">{{ $route.query.search }}</span>
    </div>
    <b-tabs v-model="selectedTab" data-cy="tabs">
      <b-tab-item label="LexicaGallery" value="LexicaGallery">
        <template v-if="selectedTab === 'LexicaGallery'">
          <LexicaGallery :v-bind="selectedTab" />
        </template>
      </b-tab-item>
      <b-tab-item label="Replicate Generated" value="Replicate Generated">
        <!--        <Gallery v-if="selectedTab === 'GALLERY'"-->
        <!--      />-->
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import PrefixMixin from '~/utils/mixins/prefixMixin'

@Component<UnstableLayout>({
  components: {
    LexicaGallery: () => import('./LexicaGallery.vue'),
  },
})
export default class UnstableLayout extends mixins(PrefixMixin) {
  get tabOrder(): string {
    return this.$store.state.preferences.exploreTabOrder
  }

  get selectedTab(): string {
    let defaultTab = 'COLLECTION'
    if (this.tabOrder) {
      defaultTab = this.tabOrder
    }
    return (this.$route.query.tab as string) || defaultTab
  }

  set selectedTab(val) {
    this.$route.query.page = ''
    let queryOptions: {
      tab: string
      page: string
      search?: string | (string | null)[]
    } = {
      tab: val,
      page: '1',
    }
    if (this.$route.query.search) {
      queryOptions.search = this.$route.query.search
    }

    this.$router.replace({
      query: queryOptions,
    })
  }
}
</script>
