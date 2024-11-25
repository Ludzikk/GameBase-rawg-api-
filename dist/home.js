const apiKey = "3cf9718a9cd54e70b5dd20d4ca11fda5";
let allGames = [];
let games = [];
const gamesPerPage = 16;
let currentPage = 1;
let isLoadingMoreGames = false;
let imageChangers = [];
let currentCreatedItem = 0;

const gamesList = document.querySelector("#gamesList");
const loadingScreen = document.querySelector("#loadingScreen");
const seeMoreGames = document.querySelector("#moreGames");

const getGamesData = () => {
	fetch(
		`https://api.rawg.io/api/games?&key=${apiKey}&page=${currentPage}&page_size=${gamesPerPage}`
	)
		.then((res) => res.json())
		.then((data) => {
			games = [];
			games.push(data.results);
			allGames.push(...data.results);
			createGamesBoxes();
			addMoreGames();
			isLoadingMoreGames = false;
		})
		.catch((error) => console.error("Error:", error));
};

const hideAllImagesOfGameItem = (imgBox) => {
	const imagesAmount = imgBox.children.length;

	for (let i = 0; i < imagesAmount; i++) {
		imgBox.children[i].classList.add("hidden");
	}
};

function changeImageOfItem() {
	const imgBox = this.parentElement.parentElement.lastElementChild;
	hideAllImagesOfGameItem(imgBox);
	imgBox.children[this.id].classList.remove("hidden");
}

function setBackImg() {
	const imgBox = this.parentElement.lastElementChild;
	hideAllImagesOfGameItem(imgBox);
	imgBox.children[0].classList.remove("hidden");
}

function toggleListOfGame() {
	this.lastElementChild.classList.toggle("hidden");
	this.classList.toggle("rounded-b-none");
	this.classList.toggle("z-20");
}

const createGamesBoxes = () => {
	const gamesLength = games[0].length;

	for (let i = 0; i < gamesLength; i++) {
		const gameBox = document.createElement("li");
		const gameImgBox = document.createElement("div");
		const gameImgBoxOther = document.createElement("div");
		const gameImgBoxInside = document.createElement("div");
		const gameInfoBox = document.createElement("div");
		const gameInfoBoxTop = document.createElement("div");
		const gameName = document.createElement("p");
		const gameMetacritics = document.createElement("p");
		const gameList = document.createElement("ul");
		const releaseDate = document.createElement("li");
		const genres = document.createElement("li");
		const pName = document.createElement("p");
		const genresBox = document.createElement("div");

		const genresAmount = games[0][i].genres.length;
		const gameNameData = games[0][i].name;
		const gameMetacriticsData = games[0][i].metacritic;
		const amountOfScreenshots = games[0][i].short_screenshots.length;

		let criticsColor = "";

		if (gameMetacriticsData >= 90) {
			criticsColor = "green";
		} else if (gameMetacriticsData >= 80) {
			criticsColor = "yellow";
		} else if (gameMetacriticsData >= 70) {
			criticsColor = "orange";
		} else {
			criticsColor = "red";
		}

		if (gameMetacriticsData === null) {
			criticsColor = "";
		}

		gameBox.id = currentCreatedItem;
		currentCreatedItem++;

		gameBox.classList.add(
			"sm:w-[calc(50%-16px)]",
			"lg:w-[calc(33%-16px)]",
			"2xl:w-[calc(25%-16px)]",
			"w-full",
			"rounded-2xl",
			"bg-zinc-800",
			"shadow-sm",
			"shadow-black",
			"hover:scale-[1.025]",
			"transition-all",
			"duration-300",
			"gameItem",
			"relative"
		);
		gameImgBox.classList.add(
			"w-full",
			"max-h-[165px]",
			"h-full",
			"relative",
			"group"
		);
		gameImgBoxOther.classList.add(
			"absolute",
			"w-full",
			"h-full",
			"flex",
			"justify-center",
			"opacity-0",
			"group-hover:opacity-100"
		);
		gameList.classList.add(
			"absolute",
			"z-50",
			"w-full",
			"bottom-[-81px]",
			"left-0",
			"rounded-b-2xl",
			"bg-zinc-800",
			"shadow-sm",
			"shadow-black",
			"hidden"
		);
		gameImgBoxInside.classList.add("h-full", "max-h-[165px]");
		gameInfoBoxTop.classList.add(
			"p-3",
			"flex",
			"justify-between",
			"items-center"
		);
		gameName.classList.add("font-bold", "text-xl", "py-4");
		gameMetacritics.classList.add(
			"border",
			"px-2",
			"rounded",
			"text-sm",
			"ml-4"
		);
		pName.classList.add(
			"flex",
			"justify-between",
			"items-center",
			"px-3",
			"py-2",
			"text-gray-400"
		);
		pName.textContent = "Genres:";
		releaseDate.innerHTML = `<p class="flex justify-between items-center px-3 py-2 text-gray-400 border-b border-gray-600/60">Release date:  <span class="text-white">${games[0][i].released}</span></p>`;
		// genresBox.classList.add("flex", "justify-end")

		gameName.textContent = gameNameData;
		gameMetacritics.textContent = gameMetacriticsData;

		switch (criticsColor) {
			case "green":
				gameMetacritics.classList.add("text-green-300", "border-green-300");
				break;
			case "yellow":
				gameMetacritics.classList.add("text-yellow-300", "border-yellow-300");
				break;
			case "orange":
				gameMetacritics.classList.add("text-orange-300", "border-orange-300");
				break;
			case "red":
				gameMetacritics.classList.add("text-red-300", "border-red-300");
				break;
			default:
				gameMetacritics.classList.remove("border");
				break;
		}

		for (let j = 0; j < amountOfScreenshots; j++) {
			const gameImageHover = document.createElement("div");
			const gameImageHoverElement = document.createElement("div");

			const imageLink = games[0][i].short_screenshots[j].image;
			const imageLinkSmaller =
				imageLink.slice(0, 28) + "crop/600/400/" + imageLink.slice(28);

			const gameImg = document.createElement("img");
			if (j !== 0) {
				gameImg.classList.add(
					"h-[165px]",
					"w-full",
					"object-cover",
					"rounded-t-2xl",
					"hidden"
				);
			} else {
				gameImg.classList.add(
					"h-[165px]",
					"w-full",
					"object-cover",
					"rounded-t-2xl"
				);
			}

			gameImg.setAttribute("alt", gameNameData);
			gameImg.setAttribute("src", imageLinkSmaller);

			gameImageHover.classList.add(
				"w-full",
				"h-full",
				"flex",
				"items-end",
				"group/item",
				"imgItemChanger"
			);
			gameImageHover.id = j;
			gameImageHoverElement.classList.add(
				"w-[100%]",
				"h-[8px]",
				"mb-2",
				"mx-1",
				"group-hover/item:bg-white/70",
				"bg-gray-500/70",
				"rounded-xl"
			);

			gameImageHover.append(gameImageHoverElement);
			gameImgBoxOther.append(gameImageHover);

			gameImgBoxInside.append(gameImg);
		}

		for (let k = 0; k < genresAmount; k++) {
			const genresText = document.createElement("span");
			genresText.classList.add("text-white");

			if (genresAmount > 1 && k + 1 - genresAmount !== 0) {
				genresText.textContent = games[0][i].genres[k].name + ", ";
			} else {
				genresText.textContent = games[0][i].genres[k].name;
			}

			genresBox.append(genresText);
		}

		pName.append(genresBox);
		genres.append(pName);
		gameList.append(releaseDate, genres);

		const newImageChangers =
			gameImgBoxOther.querySelectorAll(".imgItemChanger");
		newImageChangers.forEach((item) => {
			item.removeEventListener("mouseover", changeImageOfItem);
			item.addEventListener("mouseover", changeImageOfItem);
		});
		gameImgBoxOther.addEventListener("mouseout", setBackImg);
		gameBox.addEventListener("mouseover", toggleListOfGame);
		gameBox.addEventListener("mouseout", toggleListOfGame);

		gameImgBox.append(gameImgBoxOther, gameImgBoxInside);
		gameInfoBoxTop.append(gameName, gameMetacritics);
		gameInfoBox.append(gameInfoBoxTop);
		gameBox.append(gameImgBox, gameInfoBox, gameList);
		gamesList.appendChild(gameBox);
	}

	hideLoadingScreen();
};

const hideLoadingScreen = () => {
	loadingScreen.classList.add("hidden");
};

const addMoreGames = () => {
	if (
		seeMoreGames.getBoundingClientRect().bottom < screen.height &&
		isLoadingMoreGames === false
	) {
		isLoadingMoreGames = true;
		currentPage++;
		getGamesData();
	}
};

const addEventListeners = () => {
	window.addEventListener("scroll", addMoreGames);
	seeMoreGames.addEventListener("click", addMoreGames)
};

addEventListeners();
getGamesData();
