<template>
  <div class="flex box box-tb box-align-center">
    <div class="calendar pink-color box box-tb">
      <div class="top-handle fs28 box box-lr box-align-center box-pack-center">
        <div class="prev box box-rl" @click="clickBackward">
          <div class="prev-handle box box-lr box-align-center box-pack-center">《</div>
        </div>
        <picker class="date-area box box-lr box-align-center box-pack-center" mode="date" fields="month" :value="currentDate" @change="didPickerData"> {{ curYear || "--" }}年 {{ curMonth || "--" }}月</picker>
        <div class="next box box-lr" @click="clickForward">
          <div class="next-handle box box-lr box-align-center box-pack-center">》</div>
        </div>
      </div>
      <div class="weeks box box-lr box-pack-center box-align-center">
        <div class="flex week fs28" v-for="item in weeksCh" v-bind:key="item">{{ item }}</div>
      </div>
      <div class="days box box-lr box-wrap">
        <div v-if="hasEmptyGrid" class="grid white-color box box-align-center box-pack-center" v-for="grid in emptyDayGrids" v-bind:key="grid.key">
        </div>
        <div class="grid white-color box box-align-center box-pack-center" v-for="grid in dayGrids" v-bind:key="grid.data.key" @click="tapDayGrid(index)">
          <div class="day box box-align-center box-pack-center" v-bind:class="{ 'border-radius pink-bg': grid.selected }">
            {{ grid.data.day }}
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
        curDate: '',
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
            let day = { idx: i,
                        key: year.toString() + month.toString() + i.toString() }
            emptyGrids.push(day)
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
            data: { day: i, key: year.toString() + month.toString() + i.toString() },
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
      },
      didPickerData (e) {
        let arr = e.mp.detail.value.split('-')
        this.updateCalendarGrid(arr[0], arr[1])
      }
    },
    computed: {
      currentDate () {
        return this.curYear.toString() + '-' + this.curMonth.toString()
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../style/calendar.less";
</style>
