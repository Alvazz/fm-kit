<template lang="html">
  <div class="card">
    <div class="trands">
      <ul>
        <li v-for="i in 5">
          <span class="count">{{i}}</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.trands {
  min-height: 455px;
  font-size: 1rem;
}
.trands ul {
  list-style: none;
  padding: 0;
  font-size: .9rem;
}
.trands ul li{
  min-height: 70px;
  border-bottom: 1px solid #c2c2c2;
  margin: 0 10px;
  padding: 14px 0;
  display: flex;
  align-items: center;
}
.trands ul li:last-child{
  border-bottom: 0px solid #c2c2c2;
  padding-bottom: 0;
}
.trands ul li .count{
  color: #c2c2c2;
  font-size: 1rem;
  font-weight: bold;
  padding-right: 10px;
}
</style>
