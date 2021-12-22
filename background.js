chrome.runtime.onInstalled.addListener(() => {

});

chrome.action.onClicked.addListener(tab => {
    var newURL = "https://www.karafun.fr/karaoke/#favorites";
    chrome.tabs.create({ url: newURL });
});