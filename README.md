# jxfzoomy
基于jquery的商城放大镜插件.
* 您可以分别加载低分辨率和高分辨率的图像
* 支持 IE8+, Chrome, FireFox, Opera, Safari, Android, iOS, IE7勉强也可以使用,IE6未测试

# Quick Start

### Step 1:
1. Copy `jxfzoomy.js` file into your javascript folder.
2. Copy `jxfzoomy.css` file into your css folder, or copy the content of the `jxfzoomy.css` file into your site style sheet.


### Step 2:
This goes into your site's Header Section:
```javascript
<!-- get jQuery from the google apis or use your own -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="js/jxfzoomy.js"></script>
<link rel="stylesheet" href="css/jxfzoomy.css">
```

### Step 3:
Add jxfzoomy markup into your HTML:
```javascript
<!-- 基本格式 -->
    <div id="container" class='jxfzoomy-container'>
        <div class="jxfzoomy-thumb-box">
            <div class="jxfzoomy-thumb-ct">
                <ul class='jxfzoomy-list-img jxfzoomy-clearfix'>
                    <!-- 有jxfzoomy-active为当前选中的图片 data-smallImg属性为小图路径 
                    data-bigImg属性为大图路径 <li>标签内部的img为缩略图 -->
                    <li class='jxfzoomy-active' data-smallImg="images/0_min.jpg" data-bigImg="images/0_big.jpg">
                        <div>
                            <img src="images/0_thumb.jpg" alt="">
                        </div>
                    </li>
                    <li data-smallImg="images/1_min.jpg" data-bigImg="images/1_big.jpg">
                        <div>
                            <img src="images/1_thumb.jpg" alt="">
                        </div>
                    </li>
                    <li data-smallImg="images/2_min.jpg" data-bigImg="images/2_big.jpg">
                        <div>
                            <img src="images/2_thumb.jpg" alt="">
                        </div>
                    </li>
                    <li data-smallImg="images/3_min.jpg" data-bigImg="images/3_big.jpg">
                        <div>
                            <img src="images/3_thumb.jpg" alt="">
                        </div>
                    </li>
                    <li data-smallImg="images/4_min.jpg" data-bigImg="images/4_big.jpg">
                        <div>
                            <img src="images/4_thumb.jpg" alt="">
                        </div>
                    </li>
                    <li data-smallImg="images/5_min.jpg" data-bigImg="images/5_big.jpg">
                        <div>
                            <img src="images/5_thumb.jpg" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
```

### Step 4:
Initialize the plugin in "document ready" section of your javascript or at the end before `</body>`:
```javascript
/* calling script */
$('#container').jxfZoomy();
```


# License
