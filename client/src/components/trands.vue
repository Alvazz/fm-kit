<template lang="html">
  <div class="card">
    <div class="trands">
      <ul>
        <li>
          <span class="count">1</span> Test
        </li>
        <li>
          <span class="count">2</span> Test
        </li>
        <li>
          <span class="count">2</span> Test
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
  padding: 0
}
.trands ul li{
  min-height: 70px;
  border-bottom: 1px solid #c2c2c2;
  margin: 0 10px;
  display: flex;
  align-items: center;
}
.trands ul li .count{
  font-size: 1rem;
  font-weight: bold;
  padding-right: 10px;
}
</style>
