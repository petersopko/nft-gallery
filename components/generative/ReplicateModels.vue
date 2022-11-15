<template>
  <div class="gallery container">
    <div class="column is-8 is-offset-2">
      <h1 class="title is-2 has-text-centered">
        {{ 'Unstable Diffusion' }}
      </h1>
    </div>
    <Loader :value="isReplicateLoading" />
    <section>
      <SelectModelDropdown :value="selectedModel" />
      <PromptBuilder
        v-model="prompt"
        :placeholder="$t('unstableDiffusion.promptInput.placeholder')" />
      <b-button
        type="is-primary"
        icon-left="paper-plane"
        class="fill-button"
        :disabled="selectedModel === '' || prompt === ''"
        expanded
        outlined
        @click="diffuse(prompt)">
        Diffuse
      </b-button>
      <!--show images coming from the model-->
      <div class="columns is-multiline">
        <div
          v-for="(generatedImage, index) in replicateResponse"
          :key="`prompt${index}`"
          class="column is-4 column-padding">
          <a :href="generatedImage" target="_blank" class="nft-card__skeleton">
            <div class="card-image">
              <BasicImage
                v-show="generatedImage"
                :src="generatedImage"
                :alt="prompt"
                custom-class="gallery__image-wrapper" />
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'

import AuthMixin from '~/utils/mixins/authMixin'
import PrefixMixin from '~/utils/mixins/prefixMixin'
import { ReplicateResponse, promptReplicate } from '~/utils/unstableDiffusion'

const components = {
  Loader: () => import('~/components/shared/Loader.vue'),
  BasicImage: () => import('~/components/shared/view/BasicImage.vue'),
  InfiniteLoading: () => import('vue-infinite-loading'),
  ScrollTopButton: () => import('~/components/shared/ScrollTopButton.vue'),
  SelectModelDropdown: () =>
    import('~/components/generative/SelectModelDropdown.vue'),
  PromptBuilder: () => import('~/components/generative/PromptBuilder.vue'),
  LabeledText: () => import('~/components/shared/gallery/LabeledText.vue'),
}

@Component<ReplicateModels>({
  components,
})
export default class ReplicateModels extends mixins(PrefixMixin, AuthMixin) {
  protected isLoading = false
  @Prop({ type: String }) public selectedModel!: string
  private isReplicateLoading = false
  public replicateResponse: ReplicateResponse | null = null
  protected prompt = ''

  protected async diffuse(prompt: string) {
    try {
      this.isReplicateLoading = true
      const response = await promptReplicate(prompt)
      console.log(response)
      this.replicateResponse = response
      this.isReplicateLoading = false
    } catch (e) {
      console.log(e)
      this.$consola.error(e)
      this.isReplicateLoading = false
    }
  }
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
