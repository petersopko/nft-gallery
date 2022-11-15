<template>
  <ReplicateModels />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ReplicateModels from '~/components/generative/ReplicateModels.vue'

@Component<GenerateArt>({
  components: { ReplicateModels },
})
export default class GenerateArt extends Vue {}
</script>

<style scoped></style>
