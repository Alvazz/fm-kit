<template>
  <div class="field">
    <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
    <div class="control">
      <b-field>
        <b-input
          :type="field.templateOptions.properties.title.type"
          v-model="nota.title"
          :placeholder="field.templateOptions.properties.title.placeholder">
        </b-input>
      </b-field>
      <b-field>
        <b-input
        :type="field.templateOptions.properties.body.type"
        v-model="nota.body"
        :maxlength="field.templateOptions.properties.body.maxlength"
        :placeholder="field.templateOptions.properties.body.placeholder">
        </b-input>
      </b-field>
      <a class="button" @click="add">Add</a>
      <hr/>
    </div>
    <div v-show="this.model[this.field.key].length > 0">
      <table class="table is-fullwidth" >
        <thead>
          <tr>
            <th><abbr title="Position">#</abbr></th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nota, i) in this.model[this.field.key]">
            <th>{{i+1}}</th>
            <td>
              {{nota.title}}
            </td>
            <td class="actions">
              <b-icon
              type="is-clickable"
              icon="edit"
              size="is-small"
              @click.native="remove(i)">
            </b-icon>

          </b-icon>
          <b-icon
          type="is-clickable"
          icon="trash"
          size="is-small"
          @click.native="remove(i)">
        </b-icon>
      </td>
    </tr>
    </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
//import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'
export default {
  name: 'vfbNote',
  mixins: [BaseFormlyFieldMixin],
  data() {
    return {
      nota: {
        title: '',
        body: ''
      }
    }
  },
  created() {
    const required = this.getField('required')
    if (required && this.properties) this.properties.required = true
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
