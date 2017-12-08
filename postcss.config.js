/* ==========================================================
 * postcss.common.js v20171208
 * ==========================================================
 * by Damer
 *
 * postcss 配置文件
 * 一些插件的引用
 * 如需使用更多的postcss插件，请参考 https://www.postcss.parts/
 * BEM/SUIT 规范请参考 http://www.w3cplus.com/PostCSS/using-postcss-with-bem-and-suit-methodologies.html
 * ========================================================== */
module.exports = {
    //插件顺序会影响结果
    plugins: [
        require('postcss-import'),
        require('saladcss-bem')({
            defaultNamespace: undefined, // default namespace to use, none by default
            style: 'suit', // suit or bem, suit by default,
            separators: {
                descendent: '__', // overwrite any default separator for chosen style
                modifier: '--'
            },
            shortcuts: {
                component: 'b',
                descendent: 'e',
                modifier: 'm',
            }
        }),
        require('precss'),
        require('postcss-nested'),
        require('postcss-cssnext'),
    ]
};