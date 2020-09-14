## Positioning and Layout

https://www.w3schools.com/cssref/pr_class_display.asp

由于前端经常会遇到计算位置的问题，那么搞懂clientWidth,offsetWidth,scrollHeight等等这些就变得尤为重要。放上经典图，一张图让你搞懂clientWidth,offsetWidth,scrollHeight~~~

![一张图搞懂clientWidth,offsetWidth,scrollHeight](https://image-static.segmentfault.com/375/301/3753019063-5c0652fcdb9ca_articlex)

除了这些还有clientX,pageX,screenX等等，再来看下下面的图

![clipboard.png](https://image-static.segmentfault.com/149/728/1497287605-5c06556991ad2_articlex)

下面介绍一下每个字段的含义

- clientLeft,clientTop
  表示内容区域的左上角相对于整个元素左上角的位置（包括边框）。(取决于边框的像数值？)
- clientWidth,clientHeight
  内容区域的宽高，不包括边框宽度值。
- clientX、clientY
  点击位置距离当前body可视区域的x，y坐标
- offsetLeft,offsetTop
  相对于最近的祖先定位元素。
- offsetParent
  某元素的父元素 例如：this.offsetParent.tagName.toLowerCase() 得到body...
- offsetWidth,offsetHeight
  整个元素的尺寸(不包括因为滚动条变宽的宽度，包括滚动条的宽度和高度)
- offsetX, offsetY
  相对于带有定位的父盒子的x，y坐标
- scrollLeft,scrollTop
  元素滚动的距离大小
- scrollWidth,scrollHeight
  整个内容区域的宽度(包括需拉动滚动条隐藏起来的那些部分) scrollWidth = scrollTop+clientWidth
- pageX、pageY
  对于整个页面来说，包括了被卷去的body部分的长度
- screenX、screenY
  点击位置距离当前电脑屏幕的x，y坐标
- x、y
  和screenX、screenY一样

### Width & Height

**body**:

clientHeight：body.padding+ body.height;

offsetHeight：body.padding+ body.height+body.border;

scrollHeight：body.padding+ body.height

**documentElement**:

clientHeight= body.height

offsetHeight= body.padding+ body.height+body.border

scrollHeight=body.height+scrollbar.height

**Example:**

> supossing that 
>
> html:1829px*991px padding:3px border:2px margin:2px
>
> body:1829px*991px padding:4px border:1px margin:8px(default)
>
> scrollbar.width: 25px  scrollbar.height: 33px
>
> Scrollbar: 17px

```javascript
// toolbars i.e. bookmarks added --> height change
// Test on Chrome/Yandex/Firefox(Windows)
document.body.scrollLeft:0
document.body.scrollTop: 33
// 1829+17 991+17
window.innerWidth: 1846
window.innerHeight: 1008
//1829 + 17 + Browser.toolbar.width 991 + 17 + Browser.toolbar.height
window.outerWidth: 1846
window.outerrHeight: 1080
//1829+4*2	991+4*2
document.body.scrollWidth:1837
document.body.scrollHeight: 999
//1829+4*2	991+4*2
document.body.clientWidth:1837
document.body.clientHeight: 999
//1829+4*2+2	991+4*2+2
document.body.offsetWidth:1839
document.body.offsetHeight: 1001
//1829+25	991+33
document.documentElement.scrollWidth:1854
document.documentElement.scrollHeight: 1024
//1829 991
document.documentElement.clientWidth:1829
document.documentElement.clientHeight: 991
//1829+4*2+2	991+4*2+2
document.documentElement.offsetWidth:1839
document.documentElement.offsetHeight: 1001

//broswer position
window.screenTop: 0
window.screenLeft: 0
// resolution - Windows.toolbar.width
// resolution - Windows.toolbar.height
window.screen.availWidth: 1846
window.screen.availHeight: 1080
// resolution fixed
window.screen.width: 1920
window.screen.height: 1080
// content
container.style.width: 300px
container.style.height:200px
//300+80+2+4 200+100+4
container.offsetWidth: 386
container.offsetHeight:304
// (1829-380-2-4)/2 + 4 + 1	15+ 4 + 1 (body border!!!)
container.offsetLeft: 727
container.offsetTop:20
// css
box.style.left: 40px
box.style.top:50px
// 40 + 8 + 2 + 30 + 200 +30 +6 +8 + 56(offsetRight)=300+40(padding)*2
// 50 + 5 + 8 + 30 + 100 +30 +4 +5 + 68(offsetBottom)=200+50(padding)*2
//40 + 8(margin) 50+5
box.offsetLeft: 48
box.offsetTop:55
```

[Check this for test](demo/js_scale.html)