<template>
  <section>
    <p class="title is-size-3">
      {{ 'Unstable Diffusion' }}
    </p>
    <PromptBuilder
      :label="$t('unstableDiffusion.promptInput.label')"
      :placeholder="$t('unstableDiffusion.promptInput.placeholder')" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { exist } from '@/components/search/exist'

@Component({
  components: {
    PromptBuilder: () => import('@/components/shared/form/PromptBuilder.vue'),
    DisabledInput: () => import('@/components/shared/DisabledInput.vue'),
  },
})
export default class Transform extends Vue {
  protected url = ''
  public mounted(): void {
    exist(this.$route.query.url, (value) => (this.url = value))
  }

  layout() {
    return 'centered-half-layout'
  }
}
</script>

<style scoped></style>
