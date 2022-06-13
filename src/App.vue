<template>
  <div id="app">
    <div class="center-title">
      <router-link to="/" class="topleft menu"
        ><span>规划管理</span></router-link
      >
      <router-link to="/scatter3D" class="topleft menu"
        ><span>分类投放</span></router-link
      >
      <router-link to="/line3d" class="topleft menu"
        ><span>过程监管</span></router-link
      >
      <div class="topcenter">
        <img src="./assets/images/u338.svg" alt="" srcset="" />
        <!-- <span>嘉兴市生活垃圾分类信息化监管平台</span> -->
        <span>测试</span>
      </div>
      <router-link to="/chuzhi" class="topright menu"
        ><span>处置利用</span></router-link
      >
      <router-link to="/about" class="topright menu"
        ><span>辅助决策</span></router-link
      >
      <router-link to="/gonggong" class="topright menu"
        ><span>公共服务</span></router-link
      >
    </div>
    <router-view style="margin: 0 10px" />
  </div>
</template>

<style lang="scss" scopd>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
  background: url("./assets/images/u1.png");
}

.center-title {
  // display: flex;
  margin: 0 auto;
  // justify-content: space-around;
  width: 90%;
  height: 90px;
  font-weight: normal;
  overflow: hidden;
  position: relative;
  z-index: 2;
  .menu {
    display: inline-block;
    min-width: 100px;
  }
  .topleft {
    margin-left: 20px;
  }
  .topright {
    margin-right: 20px;
  }
}
.center-title > a {
  background: transparent;
  margin-top: 21px;
  border: solid 1px #0c66a5;
  color: #ffffff;
  font-weight: 800;
  line-height: 40px;
  height: 40px;
  min-width: 120px;
  text-align: center;
}
.center-title > .topleft {
  transform: skewX(35deg);
}
.center-title > .topleft > span {
  display: inline-block;
  transform: skewX(-35deg);
}
.center-title > .topcenter {
  background: linear-gradient(0deg, #bff5ff 0%, #00ece4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  font-size: xx-large;
  border: none;
  height: 81px;
  padding-top: 10px;
  margin-top: 10px;
  background-size: contain;
  display: inline-block;
  width: 50%;
  min-width: 500px;
}
.center-title > .topcenter > img {
  position: absolute;
  left: 0;
  top: -10px;
  height: 100%;
  width: 100%;
}
.center-title > .topright {
  transform: skewX(-35deg);
}
.center-title > .topright > span {
  display: inline-block;
  transform: skewX(35deg);
}
</style>
