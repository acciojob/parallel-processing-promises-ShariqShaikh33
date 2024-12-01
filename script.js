//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url){
	return new Promise((resolve,reject)=> {
		let urlsave=url;
		fetch(url)
			.then(response=>{
				if(!response.ok){
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				return url;
			})
			.then(blob=>{
				resolve(blob);
			})
			.catch(e=>{
				reject(new Error(`Image not loaded properly! ${url}`))
			})
	})
}

function loadimage(images){
	let imagePromise = images.map(image=>{
		return downloadImage(image.url);
	});
	return imagePromise;
}

btn.addEventListener('click', function(){
	let imagePromise = loadimage(images);
	console.log(imagePromise);
	Promise.all(imagePromise)
		.then(res => {
			res.forEach(url1=>{
				let imageElement = document.createElement('img');
                imageElement.src = url1;
                output.appendChild(imageElement);
			});
			
		});
});

