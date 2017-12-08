/* ==========================================================
 * filter v20171208
 * ==========================================================
 * by Damer
 *
 * 过滤
 * ========================================================== */
const filters = {
    /**
     * 功能：为空时默认显示--
     * @param {String} value z值
     */
    noData(value) {
        if (!value && value !== 0) {
            return '--';
        } else {
            return value;
        }
    },
    dateTimeFormat(value) {
        let idx = value.indexOf(' ');
        let date = value.substring(0, idx);
        let time = value.substring(idx + 1);
        return date + '<br/>' + time;
    },
    noPic(value) {
        if (!value) {
            return '../AdminLTE/src/images/default_award.png';
        } else {
            return value;
        }
    }
}
export default (Vue) => {
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}