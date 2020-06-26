
var expcat = new XMLHttpRequest();
var expcaturl = "http://192.168.100.166:8080/MoneyManage/api/category/expence"
expcat.open("GET", expcaturl);
expcat.send();

var curmon = CurrentMonth()
var curyr = CurrentYear()
var ExpMon = new XMLHttpRequest();
var expmonurl = 'http://192.168.100.166:8080/MoneyManage/api/expence/' + (curmon+1) + '/' + curyr
ExpMon.open("GET", expmonurl)
ExpMon.send();

var LastExpMon = new XMLHttpRequest();
var Lastexpmonurl = 'http://192.168.100.166:8080/MoneyManage/api/expence/' + curmon + '/' + curyr
LastExpMon.open("GET", Lastexpmonurl)
LastExpMon.send();


var Lastyear = new XMLHttpRequest();
var Lastyearurl = 'http://192.168.100.166:8080/MoneyManage/api/balance/lastyear'
Lastyear.open("GET", Lastyearurl)
Lastyear.send();

var monthlyBalancesheet = new XMLHttpRequest();
var Balancesheeturl = 'http://192.168.100.166:8080/MoneyManage/api/balance/' + (curmon+1) + '/' + curyr
monthlyBalancesheet.open("GET", Balancesheeturl)
monthlyBalancesheet.send();

var Inccat = new XMLHttpRequest();
var Inccaturl = "http://192.168.100.166:8080/MoneyManage/api/category/income"
Inccat.open("GET", Inccaturl);
Inccat.send();

var AccountList = new XMLHttpRequest();
var AccountListurl = "http://192.168.100.166:8080/MoneyManage/api/accounts"
AccountList.open("GET", AccountListurl);
AccountList.send();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function CurrentMonth() {
    var d = new Date();
    var n = d.getMonth();
    return n;
}
function CurrentYear() {
    var d = new Date();
    var n = d.getFullYear();
    return n;
}

function monthfromdate(date){

    var d = new Date(date);
    var n = d.getMonth();
    var yr = d.getFullYear();
    return monthNames[n]+"  "+yr

}
function incomereports(){
    document.getElementById("Dashboard").style.display = "none";
    document.getElementById("IncomeEntry").style.display = "none";
    document.getElementById("expenceEntry").style.display = "none";
    document.getElementById("Reportstable").style.display = "block";

 var incometableelement = ""
     fetch('http://192.168.100.166:8080/MoneyManage/api/income')
  .then(response => response.json())
  .then(data => 
    {
        data.forEach(income =>{
            if((income.income_Catogory).startsWith("From") ||(income.income_Catogory).startsWith("Initial") ){

            }else{

            incometableelement+= '<tr><td>'+income.date+'</td><td>'+income.account+'</td><td>'+income.income_Catogory+'</td><td>'+monthfromdate(income.date)+'</td><td>'+income.income_Description+'</td><td>'+income.income_Amount+'</td></tr>' 
            }
        })

        document.getElementById("tabledata").innerHTML = incometableelement
        $('#ReportTable').DataTable();
    });
  
}

function expencereports(){
    document.getElementById("Dashboard").style.display = "none";
    document.getElementById("IncomeEntry").style.display = "none";
    document.getElementById("expenceEntry").style.display = "none";
    document.getElementById("Reportstable").style.display = "block";
 var expencetableelement = ""
     fetch('http://192.168.100.166:8080/MoneyManage/api/expence')
  .then(response => response.json())
  .then(data => 
    {
        data.forEach(expence =>{
            if((expence.expence_Catogory).startsWith("To ") ||(expence.expence_Catogory).startsWith("Initial") ){

            }else{
            expencetableelement+= '<tr><td>'+expence.date+'</td><td>'+expence.account+'</td><td>'+expence.expence_Catogory+'</td><td>'+monthfromdate(expence.date)+'</td><td>'+expence.expence_Description+'</td><td>'+expence.expence_Amount+'</td></tr>' 
            }
        })

        document.getElementById("tabledata").innerHTML = expencetableelement
        $('#ReportTable').DataTable();
    });
  
}


document.onload = dashboard()

function income(){
   document.getElementById("Dashboard").style.display = "none";
    document.getElementById("IncomeEntry").style.display = "block";
    document.getElementById("expenceEntry").style.display = "none";
    document.getElementById("Reportstable").style.display = "none";
    


    Incomeform.onsubmit = element =>{

        element.preventDefault();
        var data = {}
        var incomedata = new FormData(Incomeform)

        incomedata.forEach((value, key) =>{

            data[key] = value;
        }

        )
        fetch('http://192.168.100.166:8080/MoneyManage/api/income',{

            method : 'post',
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })


}
}


function expence(){
    document.getElementById("Dashboard").style.display = "none";
    document.getElementById("IncomeEntry").style.display = "none";
    document.getElementById("expenceEntry").style.display = "block";
    document.getElementById("Reportstable").style.display = "none";
   
    expenceform.onsubmit = element =>{

        element.preventDefault();
        var data = {}
        var incomedata = new FormData(expenceform)

        incomedata.forEach((value, key) =>{

            data[key] = value;
        }

        )
        fetch('http://192.168.100.166:8080/MoneyManage/api/expence',{

            method : 'post',
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(responseText)(console.log(responseText))
            
       
    }

 }

function dashboard(){

    document.getElementById("Dashboard").style.display = "block"; 
document.getElementById("IncomeEntry").style.display = "none";
document.getElementById("expenceEntry").style.display = "none";
document.getElementById("Reportstable").style.display = "none";

var ctx = document.getElementById('myChart').getContext('2d');
var piectx = document.getElementById('mypieChart').getContext('2d');
var lastmonthctx = document.getElementById('lastmonthctx').getContext('2d');
var lsLinectx = document.getElementById('lyChart').getContext('2d');










//pull the data for las one year on monthly basis



Inccat.onreadystatechange = function(){

if((Inccat.readyState == 4) && (Inccat.status ==200)){

   var incomecatogeryhtml = ""
  var incomecategoryJSON = JSON.parse(Inccat.responseText)

   incomecategoryJSON.forEach(incomecategory => {

    incomecatogeryhtml+= "<option>"+incomecategory.catogeryName+"</option>"
   })

   document.getElementById("inputIncCategory").innerHTML = incomecatogeryhtml
}

}




AccountList.onreadystatechange = function(){

if((AccountList.readyState == 4) && (AccountList.status ==200)){
    var navbardropdownelement = ""
   var accountlistshtml = ""
  var AccountListJSON = JSON.parse(AccountList.responseText)

   AccountListJSON.forEach(Accounts => {

    accountlistshtml+= "<option>"+Accounts.accountName+"</option>"
    navbardropdownelement+=  '<a class="dropdown-item" href="#">'+Accounts.accountName+'</a>'
   })

   document.getElementById("inputAccount").innerHTML = accountlistshtml
   document.getElementById("inputAccountexp").innerHTML = accountlistshtml
   document.getElementById("dropdownAccounts").innerHTML = navbardropdownelement
}



}

Lastyear.onreadystatechange = function () {

    if ((Lastyear.readyState == 4) && (Lastyear.status == 200)) {

        var lyresponse = JSON.parse(Lastyear.responseText)
        var MonExpences = [];
        var MonIncome = [];
        var Monbalances = [];
        var monthorder = [];
        var moncount = 0;
        var month = CurrentMonth()-1
        var year = CurrentYear()
        lyresponse.forEach(balancesheet => {
             
            
            MonExpences[moncount] = balancesheet.total_expence
            MonIncome[moncount] = balancesheet.total_income
            Monbalances[moncount] = balancesheet.balance
            monthorder[moncount] = monthNames[month]+" "+year
            if (month == 0){
                month = 12
                year= year-1
            }
            moncount++
            month--
        })

    }

    lastyearchart(MonExpences, MonIncome, Monbalances,monthorder)
}

ExpMon.onreadystatechange = function () {

    if ((ExpMon.readyState == 4) && (ExpMon.status == 200) && (expcat.status == 200)) {
        var catResponse = JSON.parse(expcat.responseText);
        var exResponse = JSON.parse(ExpMon.responseText);
        var balanceDisplay = [];

        var thmondata = dataProcess(catResponse, exResponse)
        monthlyBalancesheet.onreadystatechange = function(){

            if((monthlyBalancesheet.readyState == 4) && (monthlyBalancesheet.status == 200)){
        
                var balancesheet = JSON.parse(monthlyBalancesheet.responseText);
                
                balanceDisplay[0] = "Income : "+balancesheet.total_income
                balanceDisplay[1] = "Balance : "+balancesheet.balance
                balanceDisplay[2] = "Expence : "+balancesheet.total_expence
        
                thisMonthChart(thmondata[1], thmondata[0],balanceDisplay)
                        
            }
        }
 
        
    }


}
LastExpMon.onreadystatechange = function () {

    if ((LastExpMon.readyState == 4) && (LastExpMon.status == 200) && (expcat.status == 200) && (expcat.readyState == 4)) {

        var catResponse = JSON.parse(expcat.responseText);
        var lsexResponse = JSON.parse(LastExpMon.responseText);


        var lsmondata = dataProcess(catResponse, lsexResponse)

        Lastmonth(lsmondata[1], lsmondata[0])

    }


}

function dataProcess(catResponse, exResponse) {

    var Label = [];
    var Data = [];
    var catlabel = [];

    var expencecategoryhtml = ""

    catResponse.forEach(element => {

        if (element.catType == "Normal") {
            //   console.log((element.catogeryName)+ "test")

            Label.push((element.catogeryName))

            expencecategoryhtml+='<option>'+element.catogeryName+'</option>'  
        }


    })

    // console.log(Label)
    var count = 0;
  

    Label.forEach(function (item, index) {
        var sum = 0;
        exResponse.forEach(exelement => {

            

            if (exelement.expence_Catogory == item) {
                sum += exelement.expence_Amount
            }
        })

        document.getElementById("inputExpCategory").innerHTML = expencecategoryhtml
        if (sum != 0) {
            catlabel.push(item)
            Data.push(sum)
            
        }

    })

    return [Data, catlabel];
}

function Lastmonth(excatlabel, expData) {

    var lastmonthchart = new Chart(lastmonthctx, {
        type: 'bar',
        data: {
            labels: excatlabel,
            datasets: [{
                label: monthNames[CurrentMonth()-1]+" "+CurrentYear(),
                data: expData,
                barThickness: 'flex',
                backgroundColor: ['rgba(80, 200, 120)',
                    'rgba(252, 161, 3)',
                    'rgba(3, 152, 252)',
                    'rgba(252, 3, 198, 0.6)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 179, 0)',
                    'rgb(3, 252, 240)',
                    'rgb(3, 227, 252)',
                    'rgb(3, 252, 181)',
                    'rgb(144, 252, 3)',
                    'rgb(190, 252, 3)',
                    'rgb(252, 128, 3)'],

                borderColor: 'rgba(	0, 255, 0)',

                borderWidth: 1
            }]
        },

    });
}

function thisMonthChart(catlabel, Data, balanceDisplay) {

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: catlabel,
            datasets: [{
                label: monthNames[CurrentMonth()]+" "+CurrentYear(),
                data: Data,
                barThickness: 'flex',
                backgroundColor: ['rgba(80, 200, 120)',
                    'rgba(252, 161, 3)',
                    'rgba(3, 152, 252)',
                    'rgba(252, 3, 198, 0.6)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 179, 0)',
                    'rgb(3, 252, 240)',
                    'rgb(3, 227, 252)',
                    'rgb(3, 252, 181)',
                    'rgb(144, 252, 3)',
                    'rgb(190, 252, 3)',
                    'rgb(252, 128, 3)'],

                borderColor: 'rgba(	0, 255, 0)',

                borderWidth: 1
            }]
        },

    });

    var mypieChart = new Chart(piectx, {
        type: 'doughnut',
        data: {
            labels: catlabel,
            datasets: [{

                backgroundColor: ['rgba(80, 200, 120)',
                    'rgba(252, 161, 3)',
                    'rgba(3, 152, 252)',
                    'rgba(252, 3, 198, 0.6)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 179, 0)',
                    'rgb(3, 252, 240)',
                    'rgb(3, 227, 252)',
                    'rgb(3, 252, 181)',
                    'rgb(144, 252, 3)',
                    'rgb(190, 252, 3)',
                    'rgb(252, 128, 3)'

                ],
                data: Data,

            }]
        },
        options: {

            cutoutPercentage: 60,

            animation: {
                animateScale: true
            },
            legend: {
                labels: {

                    fontSize: 10,

                },
                position: 'left',

            },



            title: {
                display: true,
                text: monthNames[CurrentMonth()]+" "+CurrentYear(),

                fontSize: 15,
                fontColor: "#000000"
                
            },
            elements: { 
                center: {
                  text: balanceDisplay,
                  color: ['#000000','#cc1634','#16cc29'], // Default is #000000
                  fontStyle: 'Calibri', // Default is Arial
                  sidePadding: 20, // Default is 20 (as a percentage)
                  minFontSize: [10,15,10], // Default is 20 (in px), set to false and text will not wrap.
                  lineHeight: 10 // Default is 25 (in px), used for when text wraps
                }
              },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                }
            },

            tooltips: {
                callbacks: {


                },

                titleAlign: 'left'
            }


        },
        legend: {

            display: true
        }
    });

}

function lastyearchart(MonExpences, MonIncome, Monbalances,monthorder) {

    var LsYear = new Chart(lsLinectx, {
        type: 'line',

        // The data for our dataset
        data: {
            labels: monthorder,
            datasets: [{
                label: 'Expence',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: MonExpences
            },{
                label: 'Income',
                backgroundColor: 'rgb(197, 237, 205)',
                borderColor: 'rgb(0, 255, 0)',
                data: MonIncome
            }]
        },

      // Configuration options go here
        options: {

           
        }
    });
}
//get current month


Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;
        var txt=[];
        var minFontSize = [];

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;
for (var n =0; n<minFontSize.length;n++){


        if (minFontSize[n] === undefined) {
          minFontSize[n] = 20;
        }
    }
    
   if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
       ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

        if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt;
        var line = '';
        var lines = words;
/*
       // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
*/
        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;
/*
        for (var n = 0; n < lines.length; n++) {
         ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }*/
        centerY -= (lines.length / 2) * lineHeight;
        centerY+=4
        for (var n = 0; n < words.length; n++) {
            ctx.fillText(words[n], centerX, centerY);
            centerY += lineHeight;
            ctx.fillStyle = color[n];
            ctx.font = minFontSize[n] + "px " + fontStyle;
           
          }
        //Draw text in center
       // ctx.fillText(line, centerX, centerY);
      }
    }
  });
}