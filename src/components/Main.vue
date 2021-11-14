<template>
  <div id="containerMain">
    <div id="leftBox">
      <h1>ICN</h1>
      <h2>Your Ice Cream Navigator</h2>
    </div>
    <div id="rightBox">
      <div id="circle">
        <img id ="logo" alt="logo" src="@/assets/logo.png">
      </div>
    </div>
    <div id="footer">Robert Klinger i Krzysztof Picur © 2021 prawa zastrzeżone</div>
    </div>
</template>

<script>
export default{
  name: 'Main'
}
</script>

<style lang="scss">
@import './MainP.scss';

@media (orientation: landscape) {
  #containerMain {
    margin-left: 15.6%;
    width: 84.4%;

    background-color: pink;

    display: flex;
    flex-direction: row;
    #leftBox {
      margin-top: auto;
      margin-bottom: auto;
      width: 50.25%;

      padding-left: 3.25vw;
      h1 {
        font-size: 12vw;
        margin-top: 0px;
        margin-bottom: 20px;
      }
      h2 {
        font-size: 5.21vw;
        margin-top: 20px;
      }
    }
    #rightBox {
      width: 49.75%;

      display: flex;
      justify-content: center;
      align-items: center;
      #circle {
        width: 36.4vw;
        height: 36.4vw;
        border-radius: 50%;
        background-color: white;

        display: flex;
        justify-content: center;
        align-items: center;
        #logo {
          width: 30vw;
        }
      }
    }
    #footer {
      display: none;
    }
  }
}
</style>