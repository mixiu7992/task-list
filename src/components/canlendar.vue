<template>
  <div class="flex box box-tb box-align-center">
    <div class="calendar pink-color box box-tb">
      <div class="top-handle fs28 box box-lr box-align-center box-pack-center">
        <div class="prev box box-rl" @click="clickBackward">
          <div class="prev-handle box box-lr box-align-center box-pack-center">《</div>
        </div>
        <div class="date-area box box-lr box-align-center box-pack-center"> {{ curYear || "--" }}年 {{ curMonth || "--" }}月</div>
        <div class="next box box-lr" @click="clickForward">
          <div class="next-handle box box-lr box-align-center box-pack-center">》</div>
        </div>
      </div>
      <div class="weeks box box-lr box-pack-center box-align-center">
        <div class="flex week fs28" v-for="(item, i) in weeksCh" v-bind:key="i">{{ item }}</div>
      </div>
      <div class="days box box-lr box-wrap">
        <div v-if="hasEmptyGrid" class="grid white-color box box-align-center box-pack-center" v-for="grid in emptyDayGrids">
        </div>
        <div class="grid white-color box box-align-center box-pack-center" v-for="grid in dayGrids" @click="tapDayGrid(index)">
          <div class="day box box-align-center box-pack-center" v-bind:class="{ 'border-radius pink-bg': grid.selected }">
            {{ grid.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        curYear: 1970,
        curMonth: 1,
        weeksCh: [ '日', '一', '二', '三', '四', '五', '六' ],
        hasEmptyGrid: false,
        emptyDayGrids: [],
        dayGrids: []
      }
    },
    created () {
      console.log('create calendar')
      let date = new Date()
      let curYear = date.getFullYear()
      let curMonth = date.getMonth() + 1
      this.curYear = curYear
      this.curMonth = curMonth
      this.calculateEmptyGrids(curYear, curMonth)
      this.calculateDays(curYear, curMonth)
    },

    methods: {
      getThisMonthDays (year, month) {
        return new Date(year, month, 0).getDate()
      },
      getFirstDayOfWeek (year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay()
      },
      calculateEmptyGrids (year, month) {
        let firstDayOfWeek = this.getFirstDayOfWeek(year, month)
        let emptyGrids = []
        if (firstDayOfWeek > 0) {
          for (let i = 0; i < firstDayOfWeek; i++) {
            emptyGrids.push(i)
          }
          this.hasEmptyGrid = true
          this.emptyDayGrids = emptyGrids
        } else {
          this.hasEmptyGrid = false
          this.emptyDayGrids = emptyGrids
        }
      },
      calculateDays (year, month) {
        let days = []
        let thisMonthDays = this.getThisMonthDays(year, month)
        for (let i = 1; i<= thisMonthDays; i++) {
          days.push({
            day: i,
            selected: false
          })
        }
        this.dayGrids = days
      },
      tapDayGrid (index) {
        let day = this.dayGrids[index]
        day.selected = !day.selected
        console.log('click date', this.curYear, this.curMonth, index + 1)
      },
      clickBackward () {
        let curYear = this.curYear
        let curMonth = this.curMonth - 1
        if (curMonth < 1) {
          curYear -= 1
          curMonth = 12
        }
        this.updateCalendarGrid(curYear, curMonth)
      },
      clickForward () {
        let curYear = this.curYear
        let curMonth = this.curMonth + 1
        if (curMonth > 12) {
          curYear += 1
          curMonth = 1
        }
        this.updateCalendarGrid(curYear, curMonth)
      },
      updateCalendarGrid (year, month) {
        this.curYear = year
        this.curMonth = month
        this.calculateEmptyGrids(year, month)
        this.calculateDays(year, month)
      }
    }
  }
</script>

<style scoped>
  /* pages/calendar/calendar.wxss */
  .box {
    display: flex;
  }

  .box-lr {
    flex-direction: row;
  }

  .box-rl {
    flex-direction: row-reverse;
  }

  .box-tb {
    flex-direction: column;
  }

  .box-pack-center {
    justify-content: center;
  }

  .box-align-center {
    align-items: center;
  }

  .box-wrap {
    flex-wrap: wrap;
  }

  .flex {
    flex-grow: 1;
  }

  .bg {
    background-image: linear-gradient(to bottom, #faefe7, #ffcbd7);
    overflow: hidden;
  }

  .pink-color {
    color: #ff629a;
  }

  .white-color {
    color: #fff;
  }

  .fs24 {
    font-size: 24rpx;
  }

  .fs28 {
    font-size: 28rpx;
  }

  .fs32 {
    font-size: 32rpx;
  }

  .fs36 {
    font-size: 36rpx;
  }

  .top-handle {
    height: 80rpx;
  }

  .prev {
    text-align: right;
    height: 80rpx;
  }

  .next {
    height: 80rpx;
  }

  .prev-handle {
    width: 80rpx;
    height: 100%;
  }

  .next-handle {
    width: 80rpx;
    height: 100%;
  }

  .date-area {
    width: 50%;
    height: 80rpx;
    text-align: center;
  }

  .weeks {
    height: 50rpx;
    line-height: 50rpx;
    opacity: 0.5;
  }

  .week {
    text-align: center;
  }

  .days {
    height: 500rpx;
  }

  .grid {
    width: 107.1428571429rpx;
  }

  .day {
    width: 60rpx;
    height: 60rpx;
    color: #88d2ac;
    font-size: 26rpx;
    font-weight: 200;
  }

  .border-radius {
    border-radius: 50%;
    position: relative;
    left: 0;
    top: 0;
    color: #fff;
  }

  .pink-bg {
    background-color: #ff629a;
  }

  .purple-bg {
    background-color: #b8b8f1;
  }

  .right-triangle::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 15rpx solid transparent;
    border-left-color: #ff629a;
    position: absolute;
    right: -22rpx;
    top: 18rpx;
  }

  .left-triangle::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 15rpx solid transparent;
    border-right-color: #ff629a;
    position: absolute;
    left: -22rpx;
    top: 18rpx;
  }

  .tips {
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .types {
    background-color: #ffedf4;
    height: 50rpx;
  }

  .types-desc {
    padding: 0 20rpx;
  }

  .type-name {
    margin-top: 50rpx;
    margin-bottom: 30rpx;
  }

  .type-desc {
    padding: 0 35rpx;
    line-height: 38rpx;
  }

  .explain {
    border-top: 1px solid #eee;
    width: 90%;
    margin: 20rpx 5% 20rpx 5%;
    padding: 20rpx 0;
  }

  .explain-title {
    font-weight: bold;
    margin-bottom: 15rpx;
  }

  .explain-item {
    padding: 8rpx 20rpx;
    color: #fff;
  }

  .left-border-radius {
    border-top-left-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
  }

  .right-border-radius {
    border-top-right-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
  }
</style>
