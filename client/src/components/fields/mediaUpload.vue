<template>
  <div class="field">
    <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
    <hr/>
    <div class="control">
      <div class="example-full">
        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
          <h3>Drop files to upload</h3>
        </div>
        <div class="upload">
          <div class="table-responsive">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Thumb</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Speed</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="!model[field.key].length">
                <tr>
                  <td colspan="8">
                    <div class="upload upload-draggable is-primary has-text-centered">
                      <h4>Drop files anywhere to upload</h4>
                      <div>or</div>
                      <label :for="name" class="btn btn-lg btn-primary">Select Files</label>
                    </div>
                  </td>
                </tr>
              </tbody>
              <draggable class="table is-fullwidth" :options="{handle:'.handle'}" v-model="model[field.key]" element="tbody">
                <tr v-for="(file, index) in model[field.key]" :key="file.id">
                  <td class="handle"><i class="fa fa-bars"></i></td>
                  <td>{{index+1}}</td>
                  <td class="has-text-centered">
                    <img v-if="file.thumb" :src="file.thumb" width="40" height="auto" />
                    <span v-else>
                      <i class="fa fa-file-image fa-3x"></i>
                    </span>
                  </td>
                  <td>
                    <div class="filename">
                      <a v-if="file.blob" :href="file.blob" target="_blank">{{file.name}}</a>
                      <span v-else>{{file.name}}</span>
                    </div>
                    <progress class="progress is-success is-small" v-if="file.active || file.progress !== '0.00'" :value="file.progress" max="100">{{file.progress}}%</progress>
                  </td>
                  <td>{{file.size}}</td>
                  <td>{{file.speed}}</td>

                  <td v-if="file.error">{{file.error}}</td>
                  <td v-else-if="file.success">success</td>
                  <td v-else-if="file.active">active</td>
                  <td v-else></td>
                  <td>
                    <div class="dropdown is-hoverable">
                      <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                          <span>Actions</span>
                          <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                      </div>
                      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div class="dropdown-content">
                          <a v-show="false" :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing'}" href="#" @click.prevent="file.active || file.success || file.error === 'compressing' ? false :  onEditFileShow(file)">Edit</a>
                          <a :class="{'dropdown-item': true, disabled: !file.active}" href="#" @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false">Cancel</a>
                          <a class="dropdown-item" href="#" v-if="file.active" @click.prevent="$refs.upload.update(file, {active: false})">Abort</a>
                          <a class="dropdown-item" href="#" v-else-if="file.error && file.error !== 'compressing' && $refs.upload.features.html5" @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})">Retry upload</a>
                          <a :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing'}" href="#" v-else @click.prevent="file.success || file.error === 'compressing' ? false : $refs.upload.update(file, {active: true})">Upload</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">Remove</a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </draggable>

            </table>
          </div>
          <div class="example-foorer has-text-right">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <file-upload
                  class="btn btn-primary dropdown-toggle"
                  :post-action="postAction"
                  :put-action="putAction"
                  :extensions="extensions"
                  :accept="accept"
                  :multiple="multiple"
                  :directory="directory"
                  :size="size || 0"
                  :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                  :headers="headers"
                  :data="data"
                  :drop="drop"
                  :drop-directory="dropDirectory"
                  :add-index="addIndex"
                  v-model="model[field.key]"
                  @input-filter="inputFilter"
                  @input-file="inputFile"
                  ref="upload">
                  <i class="fa fa-plus"></i>
                  Select
                </file-upload>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu has-text-left" id="dropdown-menu4" role="menu">
              <div class="dropdown-content">
                <label class="dropdown-item" :for="name">Add files</label>
                <a class="dropdown-item" href="#" @click="onAddFolader">Add folder</a>
              </div>
            </div>
          </div>
          <button type="button" class="button is-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            <span class="icon is-small"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
            <span>Start Upload</span>
          </button>
          <button type="button" class="button is-danger"  v-else @click.prevent="$refs.upload.active = false">
            <span  class="icon is-small"><i class="fa fa-stop" aria-hidden="true"></i></span>
            <span>Stop Upload</span>
          </button>
        </div>
      </div>
      <div :class="{'modal-backdrop': true, 'fade': true, show: addData.show}"></div>
      <div :class="{modal: true, fade: true, show: addData.show}" id="modal-add-data" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add data</h5>
              <button type="button" class="close"  @click.prevent="addData.show = false">
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="onAddData">
              <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" required id="name"  placeholder="Please enter a file name" v-model="addData.name">
                  <small class="form-text text-muted">Such as <code>filename.txt</code></small>
                </div>
                <div class="form-group">
                  <label for="type">Type:</label>
                  <input type="text" class="form-control" required id="type"  placeholder="Please enter the MIME type" v-model="addData.type">
                  <small class="form-text text-muted">Such as <code>text/plain</code></small>
                </div>
                <div class="form-group">
                  <label for="content">Content:</label>
                  <textarea class="form-control" required id="content" rows="3" placeholder="Please enter the file contents" v-model="addData.content"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click.prevent="addData.show = false">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div :class="{'modal-backdrop': true, 'fade': true, show: editFile.show}"></div>
      <div :class="{modal: true, fade: true, show: editFile.show}" id="modal-edit-file" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit file</h5>
              <button type="button" class="close"  @click.prevent="editFile.show = false">
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="onEditorFile">
              <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" required id="name"  placeholder="Please enter a file name" v-model="editFile.name">
                </div>
                <div class="form-group" v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'">
                  <label>Image: </label>
                  <div class="edit-image">
                    <img :src="editFile.blob" ref="editImage" />
                  </div>

                  <div class="edit-image-tool">
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary" @click="editFile.cropper.rotate(-90)" title="cropper.rotate(-90)"><i class="fa fa-undo" aria-hidden="true"></i></button>
                      <button type="button" class="btn btn-primary" @click="editFile.cropper.rotate(90)"  title="cropper.rotate(90)"><i class="fa fa-repeat" aria-hidden="true"></i></button>
                    </div>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary" @click="editFile.cropper.crop()" title="cropper.crop()"><i class="fa fa-check" aria-hidden="true"></i></button>
                      <button type="button" class="btn btn-primary" @click="editFile.cropper.clear()" title="cropper.clear()"><i class="fa fa-remove" aria-hidden="true"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click.prevent="editFile.show = false">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
//import Cropper from 'cropperjs'
//import ImageCompressor from '@xkeshi/image-compressor'
import FileUpload from 'vue-upload-component'
import Draggable from 'vuedraggable'

export default {
  name: 'vfbMediaUpload',
  components: {
    FileUpload,
    Draggable
  },
  mixins: [BaseFormlyFieldMixin],
  data() {
    return {
      files: [],
      accept: 'image/png,image/gif,image/jpeg,image/webp, video/mp4',
      extensions: 'gif,jpg,jpeg,png,webp, mp4',
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      addIndex: false,
      thread: 3,
      name: 'file',
      postAction: '/upload/post',
      putAction: '/upload/put',
      headers: {
        'X-Csrf-Token': 'xxxx'
      },
      data: {
        _csrf_token: 'xxxxxx'
      },
      autoCompress: 1024 * 1024,
      uploadAuto: false,
      isOption: false,
      addData: {
        show: false,
        name: '',
        type: '',
        content: ''
      },
      editFile: {
        show: false,
        name: ''
      }
    }
  },
  watch: {
    'editFile.show'(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.$refs.upload.update(this.editFile.id, {
          error: this.editFile.error || ''
        })
      }
      if (newValue) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            autoCrop: false
          })
          this.editFile = {
            ...this.editFile,
            cropper
          }
        })
      }
    },
    'addData.show'(show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    }
  },
  created() {
    const required = this.getField('required')
    if (required && this.properties) this.properties.required = true
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

        if (
          newFile.file &&
          newFile.type.substr(0, 6) === 'image/' &&
          this.autoCompress > 0 &&
          this.autoCompress < newFile.size
        ) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512
          })
          imageCompressor
            .compress(newFile.file)
            .then(file => {
              this.$refs.upload.update(newFile, {
                error: '',
                file,
                size: file.size,
                type: file.type
              })
            })
            .catch(err => {
              this.$refs.upload.update(newFile, {
                error: err.message || 'compress'
              })
            })
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize
          ) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    },
    alert(message) {
      alert(message)
    },
    onEditFileShow(file) {
      this.editFile = { ...file, show: true }
      this.$refs.upload.update(file, { error: 'edit' })
    },
    onEditorFile() {
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        this.editFile.show = false
        return
      }
      let data = {
        name: this.editFile.name
      }
      if (this.editFile.cropper) {
        let binStr = atob(
          this.editFile.cropper
            .getCroppedCanvas()
            .toDataURL(this.editFile.type)
            .split(',')[1]
        )
        let arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        data.file = new File([arr], data.name, { type: this.editFile.type })
        data.size = data.file.size
      }
      this.$refs.upload.update(this.editFile.id, data)
      this.editFile.error = ''
      this.editFile.show = false
    },
    // add folader
    onAddFolader() {
      if (!this.$refs.upload.features.directory) {
        this.alert('Your browser does not support')
        return
      }
      let input = this.$refs.upload.$el.querySelector('input')
      input.directory = true
      input.webkitdirectory = true
      this.directory = true
      input.onclick = null
      input.click()
      input.onclick = e => {
        this.directory = false
        input.directory = false
        input.webkitdirectory = false
      }
    },
    onAddData() {
      this.addData.show = false
      if (!this.$refs.upload.features.html5) {
        this.alert('Your browser does not support')
        return
      }
      let file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type
      })
      this.$refs.upload.add(file)
    }
  }
}
</script>

<style>
.upload {
  width: 100%;
}

.example-full .btn-group .dropdown-toggle {
  margin-right: 0.6rem;
}
.example-full .filename {
  margin-bottom: 0.3rem;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.example-full .example-foorer {
  padding: 0.5rem 0;
}
.example-full .edit-image img {
  max-width: 100%;
}
.example-full .edit-image-tool {
  margin-top: 0.6rem;
}
.example-full .edit-image-tool .btn-group {
  margin-right: 0.6rem;
}
.example-full .footer-status {
  padding-top: 0.4rem;
}
.example-full .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.example-full .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
