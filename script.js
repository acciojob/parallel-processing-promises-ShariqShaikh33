//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadimg(url){
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error! status: ${response.status}');
				}
				return response.blob();
			})
			.then(blob => {
				let img = new Image();
				img.src = URL.createObjectURL(blob);
				resolve(img);
			})
			.catch(e => {
				reject(new Error("Failed to load image's URL: ${url}"));
			});
	});
	
}

function loadimg(images){
	let imagePromise = images.map(image => {
		return downloadimg(image.url);
	});
	return imagePromise;
}

btn.addEventListener('click',function(){
	let imagepromises = loadimg(images);
	Promise.all(imagepromises)
	.then(url => {
		
		blob.forEach((url) => {
			let imageElement = document.createElement('img');
			imageElement.src = url;
			output.appendChild(imageElement);
		});
	}).catch(err => {
		console.error(err);
	});
});


