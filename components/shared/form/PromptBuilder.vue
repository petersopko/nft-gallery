<template>
  <b-input
    v-model="vValue"
    maxlength="200"
    type="textarea"
    :placeholder="placeholder">
  </b-input>
</template>

<script lang="ts">
import { Component, Prop, Ref, VModel, Vue } from 'nuxt-property-decorator'

@Component
export default class BasicInput extends Vue {
  // Dev: make vValue required
  @VModel({ type: String }) vValue!: string
  @Prop({ type: String, required: true }) placeholder!: string
  @Prop({ type: Boolean, default: false }) expanded!: boolean
  @Prop({ type: String }) message!: string
  @Prop({ type: String, required: false }) maxlength!: string
  @Prop({ type: String, required: false }) type!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Ref('input') readonly input
  protected hasFocus = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
