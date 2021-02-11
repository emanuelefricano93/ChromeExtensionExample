let page = document.getElementById('buttonDiv');

chrome.storage.sync.get('colors', function(data) {
	var colors = data.colors;
  //foreach color in the array add it to the page 
  data.colors.forEach(color => {
	var buttonColor = document.createElement("button");
	buttonColor.style.backgroundColor = color;
	buttonColor.setAttribute('value', color);
	//add a callback for onclick
	buttonColor.onclick = function (element) {
		//let color = element.target.value;
/* 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				tabs[0].id,
				{code: 'document.body.style.backgroundColor = "' + color + '";'});
		}); */
		chrome.storage.sync.set({'lastSelectedColor': color}, function(data) {
			chrome.tabs.executeScript({
				file: "content-script.js"
			});
		});

	};
	page.appendChild(buttonColor);
  });
  
});

