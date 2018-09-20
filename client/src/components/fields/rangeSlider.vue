<template>
  <div class="field">
    <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
    <div class="control pad-tb">
      <vue-slider ref="slider" id="pretty-slider" v-bind="field.templateOptions.properties" v-model="model[field.key]"></vue-slider>
    </div>
  </div>

</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'
import vueSlider from 'vue-slider-component'

export default {
  name: 'vfbNote',
  components: {
    vueSlider
  },
  mixins: [BaseFormlyFieldMixin, RequiredFieldMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    add() {
      if (this.nota.title.length > 0 && this.nota.body.length > 0) {
        this.model[this.field.key].push(this.nota)
        this.nota = {
          title: '',
          body: ''
        }
      }
    },
    edit() {},
    remove(i) {
      this.model[this.field.key].splice(i, 1)
    }
  }
}
</script>
<style scoped>
.pad-tb {
  padding: 20px 0;
}
</style>
