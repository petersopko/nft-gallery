<template>
  <div class="collections">
    <Loader :value="isLoading" />
    <Search
      v-bind.sync="searchQuery"
      hide-search
      :sort-option="collectionSortOption"
      @resetPage="resetPage">
      <b-field class="is-flex">
        <Layout class="mr-5" @change="onResize" />
        <Pagination
          v-model="currentValue"
          has-magic-btn
          simple
          replace
          preserve-scroll
          :total="total"
          :per-page="first" />
      </b-field>
    </Search>

    <div>
      <InfiniteLoading
        v-if="startPage > 1 && !isLoading && total > 0"
        direction="top"
        @infinite="reachTopHandler" />
      <div
        :id="scrollContainerId"
        class="columns is-multiline"
        @scroll="onScroll">
        <div
          v-for="collection in results"
          :key="collection.id"
          :class="`column is-4 column-padding ${scrollItemClassName} ${classLayout}`">
          <nuxt-link
            :to="`/${urlPrefix}/collection/${collection.id}`"
            tag="div"
            class="card collection-card"
            :data-cy="results.indexOf(collection)">
            <div class="card-image">
              <BasicImage
                :src="collection.image"
                :alt="collection.name"
                custom-class="collection__image-wrapper" />
            </div>

            <div class="card-content">
              <nuxt-link :to="`/${urlPrefix}/collection/${collection.id}`">
                <CollectionDetail
                  :nfts="collection.nfts"
                  :name="collection.name" />
              </nuxt-link>
              <b-skeleton :active="isLoading" />
            </div>
          </nuxt-link>
        </div>
      </div>
      <InfiniteLoading
        v-if="canLoadNextPage && !isLoading && total > 0"
        @infinite="reachBottomHandler" />
      <ScrollTopButton />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratedCollection.vue',
}
</script>

<style scoped></style>
