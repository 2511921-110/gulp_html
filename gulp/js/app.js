import Vue from 'vue'
import axios from 'axios'
import Slick from 'vue-slick'
import myModal from './myModal'

if (document.getElementById('MyModal')) myModal

/*******************
  Fixed header
*******************/
if(document.querySelector('.header')){

  window.onscroll = () => {
    const el = document.querySelector('.header')
    const readyClass = 'header__state_ready'
    const fixedClass = 'header__state_fixed'

    if(document.documentElement.scrollTop > 299 || document.body.scrollTop > 299){
      el.classList.add(readyClass)
    }else{
      el.classList.remove(readyClass)
    }
    
    if(document.documentElement.scrollTop > 300 || document.body.scrollTop > 300){
      el.classList.add(fixedClass)
    }else{
      el.classList.remove(fixedClass)
    }

    if(document.getElementById('Contact') && document.getElementById('Contact').getBoundingClientRect().top - 500 <= 0){
      el.classList.remove(fixedClass)
    }

  }

}

/*******************
  sp-table
*******************/

// window.onload = () =>{
//   let h = document.querySelector('.exsample-sp__baseimage').clientHeight
//   document.querySelector('.exsample-sp__wrap_last').style.height = h+'px'
  
//   for(let x of document.getElementsByClassName('exsample-sp__image')){
//     x.style.height = h+'px'
//   }

//   let w = document.getElementsByClassName('exsample-sp__image')
//   let width = 0
//   for(let x of w){
//     width = width + x.clientWidth + 2
//   }
//   document.querySelector('.exsample-sp__tableinner').style.width = width + 'px'
// }




/*******************
  slider
*******************/

if (document.getElementById('Slider')) {
  var sliderInstance = new Vue({
    el: '#Slider',
    data() {
      return {
        slickOptions: {
          slidesToShow  : 1,
          centerMode    : true,
          centerPadding : '0px',
          autoplay      : true,
          fade          : true,
          infinite      : false,
          dots          : true,
        },
      }
    },
    components:{
      Slick
    },
    mounted(){
    },
    methods: {
      next() {
        this.$refs.slick.next()
      },
      prev() {
        this.$refs.slick.prev()
      },
      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.slick.reSlick()
        })
      },
    },
  })
}


/*******************
  jirei
*******************/

if (document.getElementById('jirei')) {
  var jireiInstance = new Vue({
    el: '#jirei',
    data() {
      return {
        slickOptions: {
          slidesToShow  : 1,
          centerMode    : true,
          centerPadding : '0px',
          autoplay      : true,
          fade          : true,
          infinite      : false,
          dots          : true,
        },
      }
    },
    components:{
      Slick
    },
    mounted(){
    },
    methods: {
      next() {
        this.$refs.slick.next()
      },
      prev() {
        this.$refs.slick.prev()
      },
      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.slick.reSlick()
        })
      },
    },
  })
}



/*******************
  carousel
*******************/

if (document.getElementById('Usage')) {
  var UsageInstance = new Vue({
    el: '#Usage',
    data() {
      return {
        tab: "tel",
        slickOptions: {
          slidesToShow  : 2,
          centerMode    : true,
          centerPadding : '0px',
          autoplay      : true,
          // fade          : true,
          infinite      : false,
          dots          : true,
          responsive: [
            {
              breakpoint: 680,
              settings: {
                // arrows: false,
                slidesToShow: 1
              }
            },
          ]
        },
      }
    },
    components:{
      Slick
    },
    mounted(){
    },
    methods: {
      next() {
        this.$refs.slick.next()
      },
      prev() {
        this.$refs.slick.prev()
      },
      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.slick.reSlick()
        })
      },
    },
  })
}





if (document.getElementsByClassName('form')) {
  var form = new Vue({
    el: '.form',
    data() {
      return {
        kakunin1: "",
        kakunin2: "",
      }
    },
    mounted(){
    },
  })
}


if (document.getElementsByClassName('company')) {
  var company = new Vue({
    el: '.company',
    data() {
      return {
        data: [],
      }
    },
    mounted(){
      axios.get('https://s-one.co.jp/index.php/wp-json/wp/v2/pages?slug=about')
      .then( (res) => this.data = res.data[0].acf.info )
    },
  })
}



if (document.getElementById('Agree')) {
  var agree = new Vue({
    el: '#Agree',
    data() {
      return {
        // tab: 'kiyaku',
        tab: 'kiyaku',
        agree: false,
        zip: "",
        address: {
          address:"",
          city:"",
          fullAddress:"",
          pref:"",
          town:""
        },
        tantou: false,
      }
    },
    methods:{
      next(label){
        this.tab = label
        this.agree = false
      },
      prev(label){
        this.tab = label
        this.agree = true
      },
      getZip(){
        axios.get("https://api.zipaddress.net/?zipcode="+this.zip)
        .then((res) => this.address = res.data.data)
      }
    },
    mounted(){
    },
    watch:{
      zip(){
        this.getZip()
      },
      tantou(){
        if(this.tantou == true ){
          let val1 = document.getElementsByClassName("input_daihyou")[0].value
          let val2 = document.getElementsByClassName("input_daihyou_kana")[0].value
          document.getElementsByClassName("input_tantou")[0].value = val1
          document.getElementsByClassName("input_tantou_kana")[0].value = val2
        }else{
          document.getElementsByClassName("input_tantou")[0].value = ""
          document.getElementsByClassName("input_tantou_kana")[0].value = ""
        }
      }
    }
  })
}


