<template>
  <div>
    <hr/>
    <a class="button is-small" @click.stop.prevent="toggleRecording">
      <span class="icon is-small">
        <i class="fa fa-microphone-slash" v-show="isRecording"></i>
        <i class="fa fa-microphone" v-show="!isRecording"></i>
      </span>
    </a>
    <hr/>
    <div>
      <ul>
        <li v-for="(file , i) in files">
          <audio :id="'audio-'+i" :src="file.dataUrl" preload="auto"  v-model="file.dataUrl" controls v-show="false"></audio>
          <a :href="file.dataUrl" target="_blank">{{file.fileName}}</a>
          <a class="button is-small" v-if="file.dataUrl.length > 0" @click.stop.prevent="togglePlay(i)">
            <span class="icon is-small">
              <span v-show="!file.isPlaying"><i class="fa fa-play"></i></span>
              <span v-show="file.isPlaying"><i class="fa fa-pause"></i></span>
            </span>
          </a>
          <a class="button is-small" v-if="file.dataUrl.length > 0" @click.stop.prevent="removeRecording(i)">
            <span class="icon is-small">
              <span><i class="fa fa-trash"></i></span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'audio',
  data() {
    return {
      isRecording: false,
      audioRecorder: null,
      constraints: { audio: true },
      chunks: [],
      files: []
    }
  },
  methods: {
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
          const file = {
            fileName: prompt('Enter a name for your sound clip'),
            isPlaying: false,
            dataUrl: window.URL.createObjectURL(blob),
            duration: that.audioRecorder.duration
          }
          that.files.push(file)
        }
      }
    },
    togglePlay: function(i) {
      // this.files[i].isPlaying = !this.files[i].isPlaying
      var audioElement = document.getElementById('audio-' + i)
      audioElement.onended = () => {
        this.files[i].isPlaying = false
      }

      if (audioElement.readyState > 0) {
        var minutes = parseInt(audioElement.duration / 60, 10)
        var seconds = parseInt(audioElement.duration % 60)

        alert(minutes + ':' + seconds)
      }

      if (audioElement.paused === false) {
        audioElement.pause()
        this.files[i].isPlaying = false
      } else {
        audioElement.play()
        this.files[i].isPlaying = true
      }
    },
    removeRecording: function(i) {
      this.isRecording = false
      this.isPlaying = false
      this.chunks = []
      this.files.splice(i, 1)
    }
  }
}
</script>
  
  <style>
</style>
