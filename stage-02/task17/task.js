/**
 * Created by Sina_lifeng on 2016/3/22.
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

// 渲染图表
function renderChart() {
    var charWrap = document.getElementById('aqi-chart-wrap');
    var nowCity = pageState.nowSelectCity;
    var _html = '<h2>' + nowCity + '空气质量监测数据</h2>';
    charWrap.className = pageState.nowGraTime;
    for (var dat in aqiSourceData[nowCity]) {
        var quality = aqiSourceData[nowCity][dat];
        if (quality >= 400) {
            _html += '<div class="column"><div class="colSender" title="' + dat + ':' + quality;
            _html += '" style="height:' + quality + 'px;background: #000;"></div></div>';
        } else if (quality >= 300) {
            _html += '<div class="column"><div class="colSender" title="' + dat + ':' + quality;
            _html += '" style="height:' + quality + 'px;background: purple;"></div></div>';
        } else if (quality >= 200) {
            _html += '<div class="column"><div class="colSender" title="' + dat + ':' + quality;
            _html += '" style="height:' + quality + 'px;background: red"></div></div>';
        } else if (quality >= 100) {
            _html += '<div class="column"><div class="colSender" title="' + dat + ':' + quality;
            _html += '" style="height:' + quality + 'px;background: blue;"></div></div>';
        } else {
            _html += '<div class="column"><div class="colSender" title="' + dat + ':' + quality;
            _html += '" style="height:' + quality + 'px;background: green;"></div></div>';
        }
    }
    charWrap.innerHTML = _html;
}

// 日、周、月的radio事件点击时的处理函数
function graTimeChange() {
    // 确定是否选项发生了变化
    var timeList = document.getElementById('form-gra-time').getElementsByTagName('input');
    for (var i = 0; i < timeList.length; i++) {
        if (timeList[i].checked) {
            var timeValue = timeList[i].value;
        }
    }
    // 设置对应数据
    pageState.nowGraTime = timeValue;

    // 调用图表渲染函数
    renderChart();
}

// select发生变化时的处理函数
function citySelectChange() {
    // 确定是否选项发生了变化
    var cityList = document.getElementById('city-select');
    var index = cityList.selectedIndex;
    var cityValue = cityList.options[index].text;

    // 设置对应数据
    pageState.nowSelectCity = cityValue;

    // 调用图表渲染函数
    renderChart()
}

// 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
function initGraTimeForm() {
    graTimeChange();
    var radioBtn = document.getElementById('form-gra-time');
    radioBtn.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == "input") {
            graTimeChange();
        }
    }
}

// 初始化城市Select下拉选择框中的选项
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityList = document.getElementById('city-select');
    var cityListHtml = '';
    for (var opt in aqiSourceData) {
        cityListHtml += '<option>' + opt + '</option>';
    }
    cityList.innerHTML = cityListHtml;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var optionBtn = document.getElementById('city-select');
    optionBtn.onclick = function () {
        citySelectChange();
    }
}

// 初始化图表需要的数据格式
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
}

// 初始化
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();