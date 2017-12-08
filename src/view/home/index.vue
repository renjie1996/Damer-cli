<template>
  <article>
    <v-title-box :title="sPageTitle" :breadcrumb="breadcrumb"></v-title-box>
    <section class="v-content">
      hello word
    </section>
  </article>
</template>
<script>
  import './css/index.scss';
  export default{
     data () {
      return {
        date: '',
        sPageTitle: '我的活动22229992222122',
        breadcrumb: [
          { name: '首页', icon: 'dashboard', link: 'home' },
          { name: '我的活动', active: true }
        ]
      };
    },
  }
</script>