<template>
  <div class="">
    <div class="form-group">
      <label for="">{{field.templateOptions.label}}</label>
      <input type="file" name="file">
    </div>
    <div class="row mb-5">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="btn-generic">
          <div class="btn btn-full pt-2 pb-2 pr-3 pl-3" @click="doSomething">Upload</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import baseField from 'vue-formly-bootstrap/src/fields/baseField';
export default {
  mixins: [baseField]
}
</script>

<style lang="css">
</style>
