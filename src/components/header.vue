<template>
  <header class="main-header">
    <v-affix>
      <!-- Logo -->
      <a href="javascript:;" data-toggle="offcanvas" class="logo"><b>{{ name }}</b></a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
      </nav>
    </v-affix>
  </header>
</template>
<script>
  export default{
    components: { vAffix: Shield.vAffix },
    props: ['baseInfo'],
    computed: {
      name: function() {
        return this.baseInfo.name;
      }
    }
  };
</script>