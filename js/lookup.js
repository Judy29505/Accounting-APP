var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');

accountingCollection.load();

function Search() {
    $("#accountingTable").find("tr").remove();
    if ($('input:checked').val() == "curMonth") {
        var date = new Date
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var dateString = year + "-" + month + "-01";
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: dateString
                }
            }, {
                $orderBy: { "date": -1 },
                $limit: 10
            }

        );

       

        var fromTime = $("#fromTime").val();
        var toTime = $("#toTime").val();
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: fromTime,
                    $lte: toTime
                }
            }
        );

        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        var totalCost = 0;
        
        
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            var id = accountings[i]._id;

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td><td>" + "<button class=\"btn btn-danger little\" onclick=\"remove('" + id + "')\">刪除</button>" +
                "</td></tr>");

                if (category=="吃的"){
                    eatCost += cost /1;
                    console.log(eatCost);
                }else if(category =="玩的") {
                    playCost += cost /1;
                    console.log(playCost);
                }else if(category == "其他"){
                    otherCost += cost /1;
                    console.log(otherCost);
                }
                totalCost = eatCost + playCost + otherCost;
                
                $("#eatCost").text(eatCost);
                $("#eatPercent").text( Math.round((eatCost/totalCost)*100)+"%");

                $("#playCost").text(playCost);
                $("#playPercent").text( Math.round((playCost/totalCost)*100)+"%");

                $("#otherCost").text(otherCost);
                $("#otherPercent").text( Math.round((otherCost/totalCost)*100)+"%");

                $("#totalCost").text(totalCost);
                $("#totalPercent").text( Math.round((totalCost/totalCost)*100)+"%");

                }

    } else {

        var fromTime = $("#fromTime").val();
        var toTime = $("#toTime").val();
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: fromTime,
                    $lte: toTime
                }
            }
        );

        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        var totalCost = 0;
        
        
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;
            var id = accountings[i]._id;

            
            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td><td>" + "<button class=\"btn btn-danger little\" onclick=\"remove('" + id + "')\">刪除</button>" +
                "</td></tr>");

                if (category=="吃的"){
                    eatCost += cost /1;
                    console.log(eatCost);
                }else if(category =="玩的") {
                    playCost += cost /1;
                    console.log(playCost);
                }else if(category == "其他"){
                    otherCost += cost /1;
                    console.log(otherCost);
                }
                totalCost = eatCost + playCost + otherCost;
                
                $("#eatCost").text(eatCost);
                $("#eatPercent").text( Math.round((eatCost/totalCost)*100)+"%");

                $("#playCost").text(playCost);
                $("#playPercent").text( Math.round((playCost/totalCost)*100)+"%");

                $("#otherCost").text(otherCost);
                $("#otherPercent").text( Math.round((otherCost/totalCost)*100)+"%");

                $("#totalCost").text(totalCost);
                $("#totalPercent").text( Math.round((totalCost/totalCost)*100)+"%");

                }
        }
    }




    function remove(id) {
        accountingCollection.remove({
            _id: id
        });

        accountingCollection.save();

        Search();
    }