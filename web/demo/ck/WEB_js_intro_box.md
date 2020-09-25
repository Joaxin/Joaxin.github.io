## 滚动条

> Scrollbar: 17px

```js
function getScrollBarWidth() {
    var $outer = $("<div>")
    .css({
        visibility: "hidden",
        width: 100,
        overflow: "scroll",
    })
    .appendTo("body"),
        widthWithScroll = $("<div>")
    .css({
        width: "100%",
    })
    .appendTo($outer)
    .outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}
```

- document.body.scrollLeft：滚动条距离左边的距离大小
- document.body.scrollTop：滚动条距离上边的距离大小

> chrome firefox

```html
document.body.scrollLeft: 0px
document.body.scrollTop: 0px
document.documentElement.scrollLeft: 27px
document.documentElement.scrollTop: 35px
window.pageXOffset: 27px
window.pageYOffset: 35px
ScrollBar: 17px
ScrollBar: 17px
```

## 窗口

- innerheight 返回窗口的文档显示区的高度。

- innerwidth 返回窗口的文档显示区的宽度。
- outerHeight 属性设置或返回一个窗口的外部高度，包括所有界面元素（如工具栏/滚动条）。
- outerWidth 属性设置或返回窗口的外部宽度，包括所有的界面元素（如工具栏/滚动）。

```js
//返回浏览器窗口相对于屏幕的X和Y坐标。
// window.screenY
window.screenTop: 0px
// window.screenX
window.screenLeft: 0px
// 浏览器高度，分辨率-任务栏高度/其他占用屏幕的窗口或者桌面的高度-浏览器上分工具栏/书签高度
window.innerWidth: 1600px
window.innerHeight: 767px
// 浏览器宽度，分辨率-其他占用屏幕的窗口或者桌面的宽度
// 浏览器高度，分辨率-任务栏高度/其他占用屏幕的窗口或者桌面的高度
window.outerWidth: 1600px
window.outerHeight: 870px
window.screen.availWidth: 1600px
window.screen.availHeight: 870px
// 固定值 屏幕分辨率
window.screen.width: 1600px
window.screen.height: 900px
```

## DocumentElement

网页可见区域宽： document.documentElement.clientWidth;
网页可见区域高： document.documentElement.clientHeight;  
网页正文全文宽： document.documentElement.scrollWidth;
网页正文全文高： document.documentElement.scrollHeight;

```css
html {
    width: 100%;
    height: 100%;
    border: 2px solid yellow;
    padding: 3px;
    margin: 2px;
}
<!-- 6+4=10 -->
```

```js
// html 高度和宽度 + 滚动条27px/35px
document.documentElement.scrollWidth: 1610px
document.documentElement.scrollHeight: 785px
// html/body 高度和宽度
document.documentElement.clientWidth: 1583px
document.documentElement.clientHeight: 750px
// html 高度和宽度 + padding + border
document.documentElement.offsetWidth: 1593px
document.documentElement.offsetHeight 760px
```

## Body

- body.clientHeight：body.padding+ body.height;

- body.scrollHeight：body.padding+ body.height
- body.offsetHeight：body.padding+ body.height+body.border;

```css
body {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    padding: 5px;
}
<!-- 8+16= 24-->
```

```js
//1583+padding	750+padding
document.body.scrollWidth: 1593px
document.body.scrollHeight: 760px
//1583+padding	750+padding
document.body.clientWidth: 1593px
document.body.clientHeight: 760px
//1583+padding+border	750+padding+border	
document.body.offsetWidth: 1595px
document.body.offsetHeight 762px
```

## Container

```css
#container {
    padding: 15px 10px;
    border-top: 1px solid #000;
    border-right: 2px solid #000;
    border-bottom: 3px solid #000;
    border-left: 4px solid #000;
    margin: 15px auto;
    position: relative;
    background-color: lightgrey;
}

#box {
    padding: 10px;
    border-top: 8px solid green;
    border-right: 6px solid green;
    border-bottom: 4px solid green;
    border-left: 2px solid green;
    margin: 5px 8px;
    position: absolute;
    background-color: azure;
}
```

```js
var container = document.getElementById("container");
container.style.width = 150 + "px";
container.style.height = 100 + "px";
var box = document.getElementById("box");
box.style.width = 100 + "px";
box.style.height = 50 + "px";
box.style.left = 20 + "px";
box.style.top = 25 + "px";
```

某个元素的上边界到html最顶部的距离：obj.offsetTop;（在元素的包含元素不含滚动条的情况下）
某个元素的左边界到html最左边的距离：obj.offsetLeft;（在元素的包含元素不含滚动条的情况下）
返回当前元素的上边界到它的包含元素的上边界border的偏移量：obj.offsetTop（在元素的包含元素含滚动条的情况下）
返回当前元素的左边界到它的包含元素的左边界border的偏移量：obj.offsetLeft（在元素的包含元素含滚动条的情况下） 

```js
container.style.width: 150px
container.style.height: 100px
// width + padding + border
// height + padding + border
// 150+20+6 100+30+4
container.offsetWidth: 176px
container.offsetHeight: 134px

// (body.width-176)/2(container.margin)+ (5 + 1 + 8)(body) + (3 + 2)(html.padding + html.border)
// 15(container.margin)+ (5 + 1 + 8)(body) + (3 + 2)(html.padding + html.border)
container.offsetLeft: 883px
container.offsetTop：34px
```



```js
// css
box.style.left: 20px
box.style.top: 25px

// 20 + 8(margin)
// 25 + 5(margin)
// OR
// 20(Left) + (8 + 2 + 10 + 100 +10 +6 +8)(box 144) + 6(offsetRight)=150+15(padding)*2
// 25(Top) + (5 + 8 + 10 + 50 +10 +4 +5)(box 92) + 3(offsetBottom)=100+10(padding)*2
box.offsetLeft: 28px
box.offsetTop: 30px
```







## REFERENCES

- https://www.w3schools.com/cssref/pr_class_display.asp
- https://www.runoob.com/jsref/obj-window.html