<template>
  <div class="field">
    <label class="label">{{field.templateOptions.wrapper.properties.label}}</label>
    <div class="control">
      <a class="button is-small" @click.stop.prevent="toggleRecording">
        <span class="icon is-small">
          <i class="fa fa-microphone-slash" v-show="isRecording"></i>
          <i class="fa fa-microphone" v-show="!isRecording"></i>
        </span>
      </a>
      <span v-show="isRecording">{{field.templateOptions.properties.action}}</span>
      <span v-show="!isRecording">Inizia Registrazione</span>
      <hr/>
      <div>
        <ul>
          <li v-for="(file , i) in model[this.field.key]">
            <small class="audio-title">
              {{file.fileName}}
            </small>
              <audio :id="'audio-'+i" :src="file.dataUrl" preload="auto"  v-model="file.dataUrl" controls v-show="false"></audio>
              <div class="card audio-player">
                <a class="button is-small" v-if="file.dataUrl.length > 0" @click.stop.prevent="togglePlay(i)">
                  <span class="icon is-small">
                    <span v-show="!file.isPlaying"><i class="fa fa-play"></i></span>
                    <span v-show="file.isPlaying"><i class="fa fa-pause"></i></span>
                  </span>
                </a>
                <div>
                  <div class="audio-player__controller">
                    <input class="slider is-fullwidth is-small is-circle" step="1" min="0" :max="100" :value="file.progress" type="range" disabled="disabled">
                    <div class="audio-player__controller__duration is-pulled-right">{{file.duration}}</div>
                  </div>
                </div>
                <a class="button is-small is-danger" v-if="file.dataUrl.length > 0" @click.stop.prevent="removeRecording(i)">
                  <span class="icon is-small">
                    <span><i class="fa fa-trash"></i></span>
                  </span>
                </a>
              </div>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFormlyFieldMixin from 'vue-formly-buefy/src/mixins/base-formly-field'
import RequiredFieldMixin from 'vue-formly-buefy/src/mixins/fields/required'

export default {
  name: 'vfbAudio',
  mixins: [BaseFormlyFieldMixin],
  created() {
    const required = this.getField('required')
    if (required && this.properties) this.properties.required = true
  },
  data() {
    return {
      isRecording: false,
      audioRecorder: null,
      constraints: { audio: true },
      chunks: [],
      files: []
    }
  },
  created() {
    let self = this
    onkeyup = function(e) {
      if (e.ctrlKey && e.which == 82) {
        self.toggleRecording()
      }
    }
  },
  computed: {},
  methods: {
    roundTime(num) {
      return Math.round(num * 100) / 100
    },
    getBlobDuration(blob) {
      let tempVideoEl = null
      tempVideoEl = document.createElement('video')
      const durationP = new Promise(resolve =>
        tempVideoEl.addEventListener('loadedmetadata', () => {
          if (tempVideoEl.duration === Infinity) {
            tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER
            tempVideoEl.ontimeupdate = () => {
              tempVideoEl.ontimeupdate = null
              resolve(tempVideoEl.duration)
              tempVideoEl.currentTime = 0
            }
          } else {
            resolve(tempVideoEl.duration)
          }
        })
      )

      tempVideoEl.src = window.URL.createObjectURL(blob)

      return durationP
    },
    toggleRecording() {
      const that = this
      this.isRecording = !this.isRecording
      if (this.isRecording) {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia
        navigator.getUserMedia(
          { audio: true },
          stream => {
            that.stream = stream
            that.audioRecorder = new MediaRecorder(stream, {
              mimeType: 'audio/webm',
              audioBitsPerSecond: 96000
            })
            that.audioRecorder.start()
            console.log('Media recorder started')
          },
          err => {
            console.log('The following error occurred: ' + err)
          }
        )
      } else {
        this.audioRecorder.stop()
        this.audioRecorder.ondataavailable = function(event) {
          that.chunks.push(event.data)
        }
        this.audioRecorder.onstop = function(event) {
          console.log('Media recorder stopped')
          const blob = new Blob(that.chunks, { type: 'audio/webm' })
          that.getBlobDuration(blob).then(duration => {
            console.log(duration)
            const file = {
              fileName: prompt(that.field.templateOptions.properties.confirm),
              isPlaying: false,
              dataUrl: window.URL.createObjectURL(blob),
              duration: that.roundTime(duration),
              progress: 0
            }
            that.model[that.field.key].push(file)
          })
        }
      }
    },
    togglePlay: function(i) {
      var audioElement = document.getElementById('audio-' + i)
      console.log(audioElement.buffered.length)
      audioElement.onended = () => {
        this.model[this.field.key][i].isPlaying = false
        this.model[this.field.key][i].progress = 0
      }

      if (audioElement.paused === false) {
        audioElement.pause()
        this.model[this.field.key][i].isPlaying = false
        this.model[this.field.key][i].progress = 0
      } else {
        audioElement.play()
        this.model[this.field.key][i].isPlaying = true
        var width = this.roundTime(0)

        var self = this
        var id = setInterval(() => {
          if (
            (Math.round(width) / self.model[self.field.key][i].duration) *
              100 >=
            100
          ) {
            clearInterval(id)
          } else {
            width += 1 / 10
            console.log(
              this.roundTime(width),
              self.model[self.field.key][i].duration
            )
            self.model[self.field.key][i].progress =
              (this.roundTime(width) / self.model[self.field.key][i].duration) *
              100
          }
        }, 1)
      }
    },
    removeRecording: function(i) {
      console.log(this.chunks)
      this.isRecording = false
      this.isPlaying = false
      this.model[this.field.key][i].progress = 0
      this.chunks.splice(i, 1)
      this.model[this.field.key].splice(i, 1)
    }
  }
}
</script>
<style scoped>
.audio-title {
  text-transform: capitalize;
}
.audio-player {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  width: 300px;
  margin: 10px 0;
}
.audio-player__controller {
  width: 200px;
}

.audio-player__controller input.slider {
  width: 100%;
}
.audio-player__controller__duration {
  font-size: 10px;
}
</style>
