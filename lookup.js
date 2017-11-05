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

        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td></td>");
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
        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var category = accountings[i].category;
            var item = accountings[i].item;
            var cost = accountings[i].cost;

            $("#accountingTable").append(
                "<tr><td>" + date +
                "</td><td>" + category +
                "</td><td>" + item +
                "</td><td>" + cost +
                "</td></td>");
        }
    }
}