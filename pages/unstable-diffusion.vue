<template>
  <LexicaGallery />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LexicaGallery from '~/components/generative/ReplicateModels.vue'

@Component<UnstableDiffusion>({
  components: { LexicaGallery },
})
export default class UnstableDiffusion extends Vue {}
</script>

<style scoped></style>
