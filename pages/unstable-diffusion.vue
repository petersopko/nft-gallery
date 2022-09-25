<template>
  <section>
    <Loader :value="isReplicateLoading" />
    <div class="column is-8 is-offset-2">
      <h1 class="title is-2 has-text-centered">
        {{ 'Unstable Diffusion' }}
      </h1>
      <SelectModelDropdown />
      <PromptBuilder
        v-model="prompt"
        :placeholder="$t('unstableDiffusion.promptInput.placeholder')" />
      <b-button
        type="is-primary"
        icon-left="paper-plane"
        class="fill-button"
        expanded
        outlined
        @click="diffuse(prompt)">
        Diffuse
      </b-button>
      <!--      <p class="subtitle is-size-6">-->
      <!--        <slot v-if="!isReplicateLoading"></slot>-->
      <!--        <b-skeleton :active="isReplicateLoading"></b-skeleton>-->
      <!--      </p>-->
    </div>
    <div class="columns is-multiline">
      <img
        v-for="image in result"
        :key="image"
        :src="image"
        :alt="prompt"
        :class="`column is-3 column-padding`" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ReplicateResponse, promptReplicate } from '@/utils/unstableDiffusion'
import SelectModelDropdown from '~/components/generative/SelectModelDropdown.vue'

@Component({
  components: {
    SelectModelDropdown: () =>
      import('~/components/generative/SelectModelDropdown.vue'),
    PromptBuilder: () => import('~/components/generative/PromptBuilder.vue'),
    DisabledInput: () => import('@/components/shared/DisabledInput.vue'),
    LabeledText: () => import('@/components/shared/gallery/LabeledText.vue'),
    Loader: () => import('@/components/shared/Loader.vue'),
  },
})
export default class UnstableDiffusion extends Vue {
  private isReplicateLoading = false
  protected result: ReplicateResponse | null = null
  protected prompt = ''

  // const prediction = await createPrediction(prompt)
  protected async diffuse(prompt: string) {
    try {
      this.isReplicateLoading = true
      const response = await promptReplicate(prompt)
      console.log(response)
      this.result = response
      // this.fileHash = await pinFileToIPFS(file, token)
      // this.$set(this.rmrkMint, 'name', title)
      // this.$set(this.rmrkMint, 'description', description)
      this.isReplicateLoading = false
    } catch (e) {
      console.log(e)
      this.$consola.error(e)
      this.isReplicateLoading = false
      // this.$set(this.rmrkMint, 'name', 'Something went wrong.')
      // this.$set(
      //   this.rmrkMint,
      //   'description',
      //   this.$t('mint.nft.rmrkDescription')
    }
  }

  // layout() {
  //   return 'centered-half-layout'
  // }
}
</script>

<style scoped></style>
