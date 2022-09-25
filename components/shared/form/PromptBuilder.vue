<template>
  <b-input
    v-model="prompt"
    maxlength="200"
    type="textarea"
    :placeholder="placeholder">
  </b-input>
</template>

<script lang="ts">
import { Component, Prop, Ref, VModel, Vue } from 'nuxt-property-decorator'

@Component
export default class BasicInput extends Vue {
  @VModel({ type: String }) prompt!: string
  @Prop({ type: String, required: true }) placeholder!: string
  @Prop({ type: String }) message!: string
  @Prop({ type: String, required: false }) maxlength!: string
  @Prop({ type: String, required: false }) type!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Ref('input') readonly input
}
</script>
