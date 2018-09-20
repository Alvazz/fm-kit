<template>
  <div class="field">
    <label class="label">Date Range</label>
    <p class="control">
      <datepicker v-model="model[field.key]" :placeholder="field.templateOptions.properties.placeholder" :inputClass="{ test: true }"  :config="{  wrap: true, mode: 'range', disable: field.templateOptions.properties.disable, defaultDate: field.templateOptions.properties.defaultDate}" readonly>
        <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
        <a class="button" data-clear  @click="clearModel"><i class="fa fa-times"></i></a>
      </datepicker>
    </p>
  </div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
//import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'
import Datepicker from 'vue-bulma-datepicker'
export default {
  components: {
    Datepicker
  },
  name: 'vfbRangePicker',
  mixins: [BaseFormlyFieldMixin],
  data() {
    return {}
  },
  mounted() {},
  created() {
    const required = this.getField('required')
    if (required && this.properties) this.properties.required = true
  },
  methods: {
    onChange() {
      alert('change')
    },
    clearModel() {
      this.model[this.field.key] = ''
    }
  },
  computed: {
    today() {
      return new Date()
    },
    maxDate() {
      let d = new Date()
      d.setDate(32)
      return d
    },
    placeholder() {
      return `minDate: today, maxDate: ${this.maxDate.getFullYear()}-${this.maxDate.getMonth() +
        1}-${this.maxDate.getDate()}`
    }
  },
  watch: {
    value(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.control.has-addons {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.tile.is-parent {
  min-width: 50%;
}
</style>
