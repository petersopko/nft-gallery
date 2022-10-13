<template>
  <section>
    <div class="column is-8 is-offset-2">
      <h1 class="title is-2 has-text-centered">
        {{ 'Unstable Diffusion' }}
      </h1>
    </div>
    <UnstableLayout />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UnstableLayout from '~/components/shared/aiArt/UnstableLayout.vue'

const components = {
  UnstableLayout,
}

@Component<UnstableDiffusion>({
  components,
})
export default class UnstableDiffusion extends Vue {}
</script>

<style scoped></style>
