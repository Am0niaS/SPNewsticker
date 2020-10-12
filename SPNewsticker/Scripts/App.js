     'use strict';

var hostUrl = '';
var allNews;
var context = SP.ClientContext.get_current();

// Dieser Code wird ausgeführt, wenn das DOM bereit ist. Es wird ein Kontextobjekt erstellt, das zur Verwendung des SharePoint-Objektmodells erforderlich ist.
$(document).ready(function () {
    //Host Web Context erstellen
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var hostcontext = new SP.AppContextSite(context, hostweburl);
    var web = hostcontext.get_web();

    //laden der Listenelemente aus der Liste News des Host Webs
    var list = web.get_lists().getByTitle("News");
    var camlString =
        "<View><ViewFields>" +
        "<FieldRef Name='Title' />" +
        "<FieldRef Name='Nachricht' />" +
        "</ViewFields></View>";

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(camlString);
    allNews = list.getItems(camlQuery);

    context.load(allNews, "Include(Title, Nachricht)");
    context.executeQueryAsync(onQuerySucceeded, onQueryFailed);
});

function onQuerySucceeded() {
    var newsHTML = "";
    var enumerator = allNews.getEnumerator();

    //Aufbau des HTML-Codes mit li-Tags
    while (enumerator.moveNext()) {
        var announcement = enumerator.get_current();
        newsHTML = newsHTML +
            "<li><span>  +++  " + announcement.get_item("Title") + ": </span>" + announcement.get_item("Nachricht") + " </li>";
            }

    $("#ticker01")[0].innerHTML = newsHTML;

    //Initialisierung des ul-Tags mit dem liScroll - Befehl
    $("ul#ticker01").liScroll({ travelocity: "0.15" });
};

function onQueryFailed(sender, args) {
    alert('Fehler: ' + args.get_message() +
        '\n' + args.get_stackTrace());
};

function getQueryStringParameter(paramToRetrieve) {
    var params;
    var strParams;

    params = document.URL.split("?")[1].split("&");
    strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}

function onQueryFailed(sender, args) {
    alert('Fehler: ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function getQueryStringParameter(paramToRetrieve) {
    var params
    var strParams;

    params = document.URL.split("?")[1].split("&");
    strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}

        

