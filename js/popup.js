window.onload = function(){
    document.getElementById('folder').value = chrome.i18n.getMessage("new_folder");
    document.getElementById('submit').value = chrome.i18n.getMessage("add");

    document.getElementById('submit').addEventListener('click', function(){
        chrome.windows.getCurrent(function(win){
            chrome.tabs.getAllInWindow(win.id, function(tabs) {
                chrome.bookmarks.getTree(function(results){
                    chrome.bookmarks.create({'parentId': results[0].children[1].id,
                        'title': document.getElementById('folder').value},
                    function(folder) {
                        for(var i = 0; i < tabs.length; i++){
                            chrome.bookmarks.create({'parentId': folder.id,
                                'title': tabs[i].title,
                                'url': tabs[i].url});
                        }
                        window.close();
                    });
                });
            })
        });
    });   
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7218577-44']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();