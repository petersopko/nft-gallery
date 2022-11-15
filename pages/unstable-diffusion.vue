<template>
  <ReplicateModels />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ReplicateModels from '~/components/generative/ReplicateModels.vue'

@Component<UnstableDiffusion>({
  components: { ReplicateModels },
})
export default class UnstableDiffusion extends Vue {}
</script>

<style scoped></style>
