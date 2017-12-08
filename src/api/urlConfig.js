// ajax配置url
(function() {
    var BASE_URL = window.oPageConfig.oData.BASE_URL;

    function URLConfig(which, data) {
        var url;
        switch (which) {
            /*********************基础信息*********************/
            case 'baseInfo':
                return BASE_URL + 'info'; // 菜单列表
        }
    }
    window.URLConfig = URLConfig;
})();