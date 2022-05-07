<!--  -->
<template>
  <div class="numberRoller">
    <div v-for="(c, i) in showVal" class="rolleItem" :key="'rollerItem' + i">
      <template v-if="c != ','">
        <div class="cell1"></div>
        <!-- <div class="cell1"></div> -->
        <div class="number">{{ c }}</div>
      </template>
      <template v-else-if="isSeparatorWithBg">
        <div class="cell1"></div>
        <!-- <div class="cell1"></div> -->
        <div class="number">{{ c }}</div>
      </template>
      <template v-else>
        <div class="cell2"></div>
        <div class="number">{{ c }}</div>
      </template>
    </div>
    <div class="unit"><span>{{unit}}</span></div>
  </div>
</template>

<script>

export default {
  props: {
    numVal:{
      type:Number,
      default:0
    },
    duration:{
     type:Number,
     default:3000,
    },
    numLength:{
      type:Number,
      default:9
    },
    unit:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      startVal: 0,
      interval: 100,
      showVal: '0',
      showValList: [],
      player: null,
      currNumlength:0,
      isSeparatorWithBg: false
    }
  },
  watch: {
    numVal() {
      this.init()
      this.play()
    }
  },

  mounted() {
    this.init()
    this.play()
  },

  methods: {
    init: function() {
      var rangeLength = Math.ceil(this.duration / this.interval)
      this.currNumlength = (this.numVal + '').length > this.numLength ? (this.numVal + '').length : this.numLength
      if (this.startVal <= this.numVal) {
        this.showValList.push(this.startVal)
        this.showValList.push(this.numVal)
        for (var i = 0; i < rangeLength - 2; i++) {
          var randomNumber = this.randomNum(this.startVal, this.numVal)
          this.showValList.push(randomNumber)
        }
        this.showValList.sort(function sequence(a, b) {
          if (a > b) {
            return 1
          } else if (a < b) {
            return -1
          } else {
            return 0
          }
        })
      }
    },
    play: function() {
      var self = this
      if (self.player) {
        self.player ? (self.player = null) : clearInterval(self.player)
      } else {
        self.player = setInterval(function() {
          if (self.showValList && self.showValList.length > 0) {
            self.startVal = self.showValList[0]
            self.showVal = self.fromateNum(
              self.showValList[0],
              self.currNumlength
            )
            self.showValList.splice(0, 1)
          }
        }, self.interval)
      }
    },
    // 生成从minNum到maxNum的随机数
    randomNum: function(minNum, maxNum) {
      var val = 0
      switch (arguments.length) {
        case 1:
          val = parseInt(Math.random() * minNum + 1, 10)
          break
        case 2:
          val = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
          break
        default:
          val = 0
          break
      }
      return val
    },
    fromateNum: function(num, length) {
      return (Array(length).join('0') + num)
        .slice(-length) // 左补零
        .split('')
        .reverse()
        .reduce((prev, next, index) => {
          // 千分位
          return (index % 3 ? next : next + ',') + prev
        })
    }
  }
}
</script>
<style lang="less">
@wWidth: 1920;
@wHeight: 1080;

.px2vw(@name, @px) {
  @{name}: @px / @wWidth * 100vw;
}
.px2vh(@name, @px) {
  @{name}: @px / @wHeight * 100vh;
}

.pos_absolute() {
  position: absolute;
}

.numberRoller {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  .rolleItem {
    position: relative;
    .px2vw(margin-right, 4);
    .px2vw(margin-left, 4);
    .cell1 {
      .px2vw(width, 50);
      .px2vh(margin-bottom, 4);
      .px2vh(height, 90);
    }
    .number {
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .px2vh(font-size, 52);
      font-weight: bold;
    }
    .cell2 {
      .px2vw(width, 50);
      .px2vh(margin-bottom, 4);
      .px2vh(height, 90);
    }

    // .bg1 {
    //   background: -webkit-linear-gradient(
    //     #0119a7,
    //     #0096ff
    //   ); /* Safari 5.1 - 6.0 */
    //   background: -o-linear-gradient(#0119a7, #0096ff); /* Opera 11.1 - 12.0 */
    //   background: -moz-linear-gradient(#0119a7, #0096ff); /* Firefox 3.6 - 15 */
    //   background: linear-gradient(#0119a7, #0096ff); /* 标准的语法 */
    // }
    // .bg2 {
    //   background: -webkit-linear-gradient(
    //     #0096ff,
    //     #0119a7
    //   ); /* Safari 5.1 - 6.0 */
    //   background: -o-linear-gradient(#0096ff, #0119a7); /* Opera 11.1 - 12.0 */
    //   background: -moz-linear-gradient(#0096ff, #0119a7); /* Firefox 3.6 - 15 */
    //   background: linear-gradient(#0096ff, #0119a7); /* 标准的语法 */
    // }
  }
  .unit {
    .px2vw(width, 20);
    .px2vh(margin-bottom, 4);
    .px2vw(margin-left, 10);
    .px2vh(height, 90);
    span {
      .px2vh(margin-top, 50);
      display: inline-block;
    }
  }
}
</style>
