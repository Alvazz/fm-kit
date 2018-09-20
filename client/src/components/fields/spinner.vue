<template>
    <div class="field">
      <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
      <div class="control">
        <div class="spinner-box">
          <a class="button is-rounded is-small spinner-minus" :disabled="model[this.field.key] === 1">
            <span class="icon is-small" @click="remove()">
              <i class="fa fa-minus"></i>
            </span>
          </a>
          <input class="input" v-model="model[this.field.key]" disabled></span>
          <a class="button is-rounded is-small spinner-plus" :disabled="model[this.field.key] >= 8">
            <span class="icon is-small" @click="add()">
              <i class="fa fa-plus"></i>
            </span>
          </a>
        </div>
    </div>
  </div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
//import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'
export default {
  name: 'vfbSpinner',
  mixins: [BaseFormlyFieldMixin],
  created() {
    const required = this.getField('required')
    if (required && this.properties) this.properties.required = true
  },
  computed: {},
  methods: {
    add() {
      if (this.model[this.field.key] < 8) {
        this.model[this.field.key] = this.model[this.field.key] + 1
      }
    },
    remove() {
      if (this.model[this.field.key] > 1) {
        this.model[this.field.key] = this.model[this.field.key] - 1
      }
    }
  }
}
</script>
<style scoped>
.spinner-box {
  margin: 5px 0;
}
.spinner-plus,
.spinner-minus {
  margin: 5px 0;
}
input {
  max-width: 40px;
  text-align: center;
  font-weight: bold;
}
</style>
