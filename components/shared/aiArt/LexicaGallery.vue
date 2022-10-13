<template>
  <div class="gallery container">
    <Loader :value="isLoading" />
    <PromptControls />
    <div>
      <InfiniteLoading
        v-if="startPage > 1 && !isLoading && total > 0"
        direction="top"
        @infinite="reachTopHandler"></InfiniteLoading>
      <div :id="scrollContainerId" class="columns is-multiline">
        <div
          v-for="image in lexicaResult"
          :key="image.id"
          :class="`column is-4 column-padding ${scrollItemClassName}`">
          <div class="card nft-card">
            <div class="card-image">
              <BasicImage
                :src="image.src"
                :alt="image.prompt"
                custom-class="gallery__image-wrapper" />
            </div>
            <div class="card-content">
              <div class="has-text-overflow-ellipsis">
                {{ image.title }}
              </div>
            </div>
          </div>
          <InfiniteLoading
            v-if="canLoadNextPage && !isLoading && total > 0"
            @infinite="reachBottomHandler"></InfiniteLoading>
          <ScrollTopButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'lazysizes'
import { Component, mixins } from 'nuxt-property-decorator'

import AuthMixin from '@/utils/mixins/authMixin'
import InfiniteScrollMixin from '@/utils/mixins/infiniteScrollMixin'
import PrefixMixin from '@/utils/mixins/prefixMixin'

// import passionQuery from '@/queries/rmrk/subsquid/passionFeed.graphql'

const components = {
  // GalleryCardList: () => import('./GalleryCardList.vue'),
  // Pagination: () => import('./Pagination.vue'),
  Loader: () => import('@/components/shared/Loader.vue'),
  BasicImage: () => import('@/components/shared/view/BasicImage.vue'),
  InfiniteLoading: () => import('vue-infinite-loading'),
  ScrollTopButton: () => import('@/components/shared/ScrollTopButton.vue'),
  PromptControls: () => import('@/components/shared/aiArt/PromptControls.vue'),
}

@Component<LexicaGallery>({
  components,
  name: 'Gallery',
})
export default class LexicaGallery extends mixins(
  PrefixMixin,
  InfiniteScrollMixin,
  AuthMixin
) {
  protected isLoading = false
  private hasPassionFeed = false
  private passionList: string[] = []
}
</script>

<style lang="scss" scoped>
@import '@/styles/abstracts/variables';

.card-image__burned {
  filter: blur(7px);
}

.remove-margin nav {
  margin-bottom: 0 !important;
}

.gallery {
  &-switch {
    margin-left: 10px;
  }

  &__image-wrapper {
    position: relative;
    margin: auto;
    padding-top: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  .card-image img {
    border-radius: 0px;
    top: 50%;
    transition: all 0.3s;
    display: block;
    width: 100%;
    height: auto;
    transform: scale(1);
  }

  .has-text-overflow-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fff;
  }

  .card-image__emotes__count {
    vertical-align: text-bottom;
  }

  .is-float-right {
    float: right;
  }

  .is-absolute {
    position: absolute;
  }

  .nft-collection-counter {
    top: 5px;
    right: -5px;
  }

  .columns {
    .card {
      position: relative;
      overflow: hidden;
      border-radius: 0px;

      &-image {
        &__emotes {
          position: absolute;
          background-color: $primary-light;
          border-radius: 4px;
          padding: 3px 8px;
          color: #fff;
          top: 10px;
          right: 10px;
          font-size: 14px;
          z-index: 3;
          transition: all 0.3s;
        }

        &__price {
          position: absolute;
          background-color: $grey-darker;
          border-radius: 4px;
          padding: 3px 8px;
          color: #fff;
          bottom: 10px;
          left: 10px;
          font-size: 14px;
          z-index: 3;
          transition: all 0.3s;
        }
      }

      .gallery__image-wrapper img {
        border-radius: 0px !important;
      }

      @media screen and (min-width: 1024px) {
        &-content {
          position: absolute;
          bottom: -45px;
          left: 0;
          width: 100%;
          transition: all 0.3s;
          background: #fff;
          opacity: 0;
        }

        &:hover .card-content {
          bottom: 0;
          opacity: 1;
          z-index: 2;
          background: $frosted-glass-background;
          backdrop-filter: $frosted-glass-backdrop-filter;
          border-radius: 0;
        }

        &:hover .gallery__image-wrapper img {
          transform: scale(1.1);
          transition: transform 0.3s linear;
        }

        &:hover .gallery__image-wrapper video {
          transform: scale(1.1);
          transition: transform 0.3s linear;
        }

        &:hover .card-image__emotes {
          top: 15px;
          right: 15px;
        }

        &:hover .card-image__price {
          bottom: 62px;
        }
      }
    }
  }
}
</style>
