let page = document.getElementById('buttonDiv');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];


function saveColors(colors) {
	chrome.storage.sync.set({colors: colors}, function() {
				console.log('colors: ' + colors);
	})
}

function updateColor(colors, item, button, index) {
	var isAvalable = index === -1;
	if (isAvalable) {
		colors.push(item);
	} else {
		colors.splice(index, 1);
	}
	updateClasses(button, isAvalable);
}

function updateClasses(button, isAvalable) {
	button.classList.remove(isAvalable ? "notPresent" : "alreadyPresent");
	button.classList.add(isAvalable ? "alreadyPresent" : "notPresent");
}


function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
	// set current class based on the presence in the colors array
	chrome.storage.sync.get('colors', function(data) {
		var currentColors = data.colors;
		var currentIndex = currentColors.indexOf(item);
		updateClasses(button, currentIndex !== -1);
	});
	// add the event listener to handle the click on the button
	button.addEventListener('click', function() {
		  chrome.storage.sync.get('colors', function(data) {
			var colors = data.colors;
			var index = colors.indexOf(item);
			updateColor(colors, item, button, index);
			saveColors(colors);
		  })
	});
    page.appendChild(button);
  }
}


constructOptions(kButtonColors);