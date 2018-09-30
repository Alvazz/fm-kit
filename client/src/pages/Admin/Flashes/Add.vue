<template lang="html">
  <div class="row mt-5 mb-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h1 class="title">Add Flash</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptatum fugiat, quae, blanditiis optio odit nihil harum natus placeat voluptate ad consequatur enim accusantium nam temporibus illum. Nam, quo obcaecati.</p>
      <form>
        <formly-form :form="form" :model="model" :fields="fields" ref="addHotelForm"></formly-form>
      </form>
      <div class="row mb-5">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="btn-generic">
            <div class="btn btn-full pt-2 pb-2 pr-3 pl-3" @click="doSomething">Submit</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'
console.log()
export default {
  data() {
    return {
      form: {},
      model: {
        mediaUpload: [],
        geo: {
          formatted_address: ''
        },
        card: {
          policies: {
            readable: {
              interval: {
                duration: 1,
                iso: new Date().toISOString(),
                start: {
                  iso: new Date().toISOString(),
                  utcTS: '6',
                  ts: '0'
                },
                end: {
                  iso: new Date().toISOString(),
                  utcTS: '6',
                  ts: '0'
                }
              },
              location: {
                geometries: [],
                type: 'GeometryCollection'
              }
            },
            writable: {
              interval: {
                duration: 1,
                iso: new Date().toISOString(),
                start: {
                  iso: new Date().toISOString(),
                  utcTS: '6',
                  ts: '0'
                },
                end: {
                  iso: new Date().toISOString(),
                  utcTS: '6',
                  ts: '0'
                }
              },
              location: {
                geometries: [],
                type: 'GeometryCollection'
              }
            }
          },
          description: '',
          language: '',
          title: '',
          uri: '',
          status: {}
        }
      },
      fields: [
        {
          key: 'title',
          type: 'input',
          templateOptions: {
            label: 'Title'
          }
        },
        {
          key: 'subtitle',
          type: 'input',
          templateOptions: {
            label: 'Subtitle'
          }
        },
        {
          key: 'language',
          type: 'select',
          options: ['Italian'],
          templateOptions: {
            label: 'Language'
          }

        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: 'Description'
          }
        },
        {
          key: 'geo',
          type: 'google-autocomplete-with-field',
          templateOptions: {
            properties: {
              placeholder: this.$t('form.location.placeholder')
            },
            wrapper: {
              properties: {
                label: this.$t('form.location.label'),
                addons: false
              }
            }
          },
          validators: {
            length: {
              expression: 'model[field.key].length > 1',
              message: this.$t('form.error.toShort')
            }
          }
        },
        {
          key: 'status',
          type: 'select',
          options: ['Online', 'Offline'],
          templateOptions: {
            label: 'Status'
          }

        }
      ]
    }
  },
  created(){
    for(var key in this.fields){
      var field = this.fields[key]
      //if (field.key === 'destinations') field.options = this.getDestinations()
    }
  },
  computed:{
  },
  methods: {
    stringToSlug (str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to   = "aaaaaeeeeiiiioooouuuunc------";

      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

      return str;
    },
    doSomething(){
      const flashCreateCardBody = {
        "owner": {
          "social": {},
          "name": "",
          "id": "",
          "token": ""
        },
        "appId": "",
        "card": {
          "policies": {
            "readable": {
              "interval": {
                "duration": 1,
                "iso": "iso",
                "start": {
                  "iso": "iso",
                  "utcTS": 6,
                  "ts": 0
                },
                "end": {
                  "iso": "iso",
                  "utcTS": 6,
                  "ts": 0
                }
              },
              "location": {
                "geometries": [
                  "{}",
                  "{}"
                ],
                "type": "GeometryCollection"
              }
            },
            "writable": {
              "interval": {
                "duration": 1,
                "iso": "iso",
                "start": {
                  "iso": "iso",
                  "utcTS": 6,
                  "ts": 0
                },
                "end": {
                  "iso": "iso",
                  "utcTS": 6,
                  "ts": 0
                }
              },
              "location": {
                "geometries": [
                  "{}",
                  "{}"
                ],
                "type": "GeometryCollection"
              }
            }
          },
          "description": this.model.description,
          "language": this.model.language,
          "title": this.model.title,
          "uri": "uri",
          "status": {}
        }
      }

      this.$refs.addHotelForm
      .validate()
      .then(() => {
        console.log(this.form.$valid)

        this.loading = true

        console.log(flashCreateCardBody)

      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="css">
</style>
