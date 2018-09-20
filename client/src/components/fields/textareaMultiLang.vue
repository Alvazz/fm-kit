<template>
  <div class="field">
    <div class="header-label">
      <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
      <div class="slect-lang-box">
        <b-field>
          <b-select placeholder="Add Lang" size="is-small" v-model="addLang">
            <option value="it">Italiano</option>
            <option value="en">Inglese</option>
            <option value="es">Spagnolo</option>
            <option value="fr">Francese</option>
          </b-select>
        </b-field>
        <button class="button is-primary is-small" @click="addTab(addLang)">Add</button>
      </div>
    </div>
    <div class="control">
      <div class="block">
        <blockquote>
          <small><b>Lingua di default</b> [{{getDefaultLang.label | uppercase}}]</small>
          <p>
            <i v-html="getDefaultLang.text"></i>
          </p>
        </blockquote>
      </div>
      <b-tabs v-model="activeTab" type="is-boxed">
        <b-tab-item v-for="(tab, i) in model[field.key]">
          <template slot="header">
            <span>
              <span class="icon is-small" v-show="tab.default">
                <i class="fas fa-lock"></i>
              </span>
              {{tab.label | uppercase}}
              <span class="icon is-small is-right  is-clickable" @click.prevent="removeTab(i)" v-show="!model[field.key][i].default">
                <i class="fas fa-times-circle"></i>
              </span>
            </span>
          </template>
          <b-field>
            <ckeditor type="classic" v-model="model[field.key][i].text" :config="{language: tab.label}">Test</ckeditor>
          </b-field>
          <div class="field">
              <b-switch :value="model[field.key][i].default" size="is-small" @change.native="setDefault(i)" :disabled="model[field.key][i].default === true">
                  Default
              </b-switch>
          </div>
      </b-tab-item>
    </b-tabs>
  </div>
</div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'

export default {
  name: 'vfbTextareaMultiLang',
  mixins: [BaseFormlyFieldMixin, RequiredFieldMixin],
  data() {
    return {
      activeTab: 0,
      addLang: null
    }
  },
  created() {
    this.model[this.field.key] = []
    this.model[this.field.key].push({ label: 'it', text: '', default: true })
  },
  filters: {
    uppercase: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  },
  computed: {
    sortLang() {
      return this.model[this.field.key].sort(function(a, b) {
        return a.default - b.default
      })
    },
    getDefaultLang() {
      let defLang = this.model[this.field.key].find(lang => {
        return lang.default === true
      })

      if (defLang === undefined) {
        defLang = {}
      }

      return defLang
    }
  },
  methods: {
    setDefault(i) {
      for (var key in this.model[this.field.key]) {
        var lang = this.model[this.field.key][key]
        lang.default = false
      }

      this.model[this.field.key][i].default = true
    },
    addTab(input) {
      const lang = { label: input, text: '', default: false }
      this.model[this.field.key].push(lang)
    },
    removeTab(index) {
      console.log(this.activeTab)
      this.activeTab = 0
      if (this.model[this.field.key][index].default === true) {
        alert('Non puoi eliminare la lingua di default')
        return
      }

      if (this.model[this.field.key].length > 1) {
        this.model[this.field.key].splice(index, 1)
      } else {
        alert('I')
      }
    },
    add() {},
    edit() {},
    remove(i) {}
  }
}
</script>
<style scoped>
.ck.ck-editor__main {
  height: 200px !important;
}
.slect-lang-box {
  display: flex;
  justify-content: flex-end;
}
.header-label {
  display: flex;
  justify-content: space-between;
}
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
blockquote {
  background-color: #f5f5f5;
  border-left: 5px solid #dbdbdb;
  padding: 1.25em 1.5em;
}
</style>
