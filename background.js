chrome.runtime.onInstalled.addListener(function() {
  
  // in the beginning we add this color to the array
  chrome.storage.sync.set({colors: ['#3aa757']}, function() {
    console.log("The first color set from background is green.");
  });
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});