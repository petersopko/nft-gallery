<template>
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
    <b-button
      type="is-primary"
      icon-left="paper-plane"
      class="fill-button"
      :disabled="selectedModel === '' || prompt === ''"
      expanded
      outlined
      @click="fetchLexica(prompt)">
      Lexica Art
    </b-button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ReplicateResponse, promptReplicate } from '@/utils/unstableDiffusion'
import { LexicaResponse, getLexicaArt } from '@/utils/lexica'

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
export default class PromptControls extends Vue {
  @Prop({ type: String }) public selectedModel!: string
  private isReplicateLoading = false
  public replicateResponse: ReplicateResponse | null = null
  public lexicaResult: LexicaResponse | null = null
  protected prompt = ''

  // const prediction = await createPrediction(prompt)
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

  protected async fetchLexica(prompt: string) {
    try {
      this.isReplicateLoading = true
      const response = await getLexicaArt(prompt)
      console.log(response)
      this.lexicaResult = response
      this.isReplicateLoading = false
    } catch (e) {
      console.log(e)
      this.$consola.error(e)
      this.isReplicateLoading = false
    }
  }
}
</script>

<style scoped></style>
