<template>
  <div class="wrapper">
    <head-nav :base-info="baseInfo"></head-nav>
    <sidebar :base-info="baseInfo"></sidebar>
    <div class="content-wrapper">
      <transition name="transition-slide-fade">
        <router-view></router-view>
      </transition>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import sidebar from 'components/navigation.vue';
  import headNav from 'components/header.vue';
  import footerNav from 'components/footer.vue';
  import { mapActions, mapMutations } from 'vuex';
  import * as Util from "utils";
  import * as Api from 'api/index.js'
  export default {
    components: { headNav, sidebar, footerNav },
    data: function() {
      return{
        showLoading: true,
        baseInfo: {},
        notify: {}
      }
    },
    methods: {
      ...mapActions("modules", [
        "getBaseinfo"
      ]),
      ...mapMutations("modules", [
        "INIT_BASEINFO"
      ]),
      loadData: function() {
        var self = this;
        // this.getBaseInfo()  //在vuex中处理请求
        Api.getBaseInfo().then((data)=>{
          self.INIT_BASEINFO(data.list);
          setTimeout(()=>{
            self.baseInfo = data;
            self.showLoading = false;
          }, 0);
        }, error=>{
          self.showLoading = false;
        })
      }
    },
    created () {
      this.loadData();
    },
    mounted () {
      Util.init();
    }
  }
</script>
