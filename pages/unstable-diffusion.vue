<template>
  <section>
    <p class="title is-size-3">
      {{ 'Unstable Diffusion' }}
    </p>
    <PromptBuilder
      v-model="prompt"
      :label="$t('unstableDiffusion.promptInput.label')"
      :placeholder="$t('unstableDiffusion.promptInput.placeholder')" />
    <b-button
      type="is-primary"
      icon-left="paper-plane"
      class="fill-button"
      outlined
      @click="diffuse">
      Diffuse
    </b-button>
    <LabeledText label="mint.nft.name.label" class="mb-2">
      {{ prompt }}
    </LabeledText>

    <LabeledText label="mint.nft.description.label">
      {{ 'TEST123' }}
    </LabeledText>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { createPrediction } from '@/utils/unstableDiffusion'

@Component({
  components: {
    PromptBuilder: () => import('@/components/shared/form/PromptBuilder.vue'),
    DisabledInput: () => import('@/components/shared/DisabledInput.vue'),
    LabeledText: () => import('@/components/shared/gallery/LabeledText.vue'),
  },
})
export default class UnstableDiffusion extends Vue {
  protected prompt = ''
  // const prediction = await createPrediction(prompt)
  protected async diffuse(prompt: string) {
    try {
      const response = await createPrediction(prompt)
      // this.isGptLoading = true
      // this.fileHash = await pinFileToIPFS(file, token)
      // this.$set(this.rmrkMint, 'name', title)
      // this.$set(this.rmrkMint, 'description', description)
      // this.isGptLoading = false
    } catch (e) {
      console.log(e)
      // this.$consola.error(e)
      // this.isGptLoading = false
      // this.$set(this.rmrkMint, 'name', 'Something went wrong.')
      // this.$set(
      //   this.rmrkMint,
      //   'description',
      //   this.$t('mint.nft.rmrkDescription')
    }
  }
  layout() {
    return 'centered-half-layout'
  }
}
</script>

<style scoped></style>
