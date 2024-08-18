
// === START ==================================== SLIDER
// [ === GET ELEMENTS === ]
const [...feed] = document.querySelectorAll("[data-feed=feed]");
const [...sliderNav] = document.querySelector(".sld-03-nav__c").children;

// ITEM DATA HOLDERS
const itemType = document.querySelector(".item-type");
const itemLineName = document.querySelector(".item-name");
const itemPrice = document.querySelector(".item-price");
const itemMotto = document.querySelector(".item-motto");
const itemInfo = document.querySelector(".item-info");
const itemVariant = document.querySelector(".item-type.variant-sub");
const itemColorSub = document.querySelector(".item-type.color-sub");
const colorsBtnsContainer = document.querySelector(".colors__w");
const productImgWrapper = document.querySelector(".product-img--main__w");
const decorImgWrapper = document.querySelector(".bg-img-decor__w");


// global variables to be populated on slide change
let colorAndUrlObj = {};
let colorUrlFirstRecord = null;
let firstColor = null;
let decorImg = null;
let cmsDataObj = {}

// get nav btns
const btnPrev = sliderNav[0];
const btnNext = sliderNav[1];

// general time delay (ms)
const td = 1000;

// add class `active` to first slide
feed[0].classList.add("active");

// [ === SLIDER === ]
function getNextPrev() {
  const activeSlide = document.querySelector(".active");

  let activeIndex = feed.indexOf(activeSlide);
  let prev, next;

  // NEXT
  if (activeIndex === feed.length - 1) {
    next = feed[0];
  } else {
    next = feed[activeIndex + 1];
  }

  // PREV
  if (activeIndex === 0) {
    prev = feed[feed.length - 1];
  } else {
    prev = feed[activeIndex - 1];
  }

  // Feed Data
  getData(activeSlide, next, prev);
  return [activeSlide, activeIndex, prev, next];
}

// without this fn it would not work (on first click)
function getCurrentSlide() {
  const [activeSlide, activeIndex, prev, next] = getNextPrev();
  if (activeSlide) {
    getData(activeSlide, next, prev);
  }
}

function getData(slide, next, prev) {
  // get variants for active slide
  let [...colors] = slide.querySelectorAll("[data-feed=colors]");
  let [...variantUrls] = slide.querySelectorAll("[data-url]");

	// get all elements with ID that starts with "cms-"
	let [...cmsData] = slide.querySelectorAll("[id^='cms-']")
	// envoke -fn- to feed object with data from current slide
	feedDataToObject(cmsDataObj, cmsData)
	
  // get name of first color on slide change
  firstColor = colors[0].children[0].innerText;

  // assign values to text fields
  itemType.innerText = cmsDataObj["type"];
  itemPrice.innerText = cmsDataObj["item-price"]
  itemMotto.innerText = cmsDataObj["motto"]
  itemInfo.innerText = cmsDataObj["info"]
  itemLineName.innerText = cmsDataObj["line"];
  itemVariant.innerText = cmsDataObj["variant"];

  //re-initiate first color
  itemColorSub.innerText = firstColor;

  // run function for current slide
  createColorBtns(colors);
  getColorBtns();
  populateRecordsToObject(colorAndUrlObj, variantUrls); // add key/value pairs to object

  // after object is populated with data get first key/value pair on slide change
  colorUrlFirstRecord = getObjectFirstValue(colorAndUrlObj);
  productImgWrapper.style.backgroundImage = `url(${colorUrlFirstRecord})`;

  // change decorative image on slide change
  decorImg = slide.querySelector(".cms-bg-img").src;
  decorImgWrapper.style.backgroundImage = `url(${decorImg})`;

	// cmsObjectTest
	console.log(cmsDataObj);
	
	
  setTimeout(function () {
    // was set for animation
  }, td);
}

// [ === NEXT PREV ACTION -fn- === ]

function getPrevSlide() {
  let [activeSlide, activeIndex, prev, next] = getNextPrev();
  activeSlide.classList.remove("active");
  prev.classList.add("active");
  getCurrentSlide();
}

function getNextSlide() {
  let [activeSlide, activeIndex, prev, next] = getNextPrev();
  activeSlide.classList.remove("active");
  next.classList.add("active");
  getCurrentSlide();
}

// [ === LISTENERS === ]
btnPrev.addEventListener("click", getPrevSlide, false);
btnNext.addEventListener("click", getNextSlide, false);
// === END ================================ SLIDER

// === START ================================ COLORS BUTTONS AND BG IMAGES

// [ === COLOR BUTTONS === ]

//  CREATE COLOR BUTTONS
function createColorBtns(items, urls) {
  colorsBtnsContainer.innerHTML = `
	  ${items
      .map((item, idx) => {
        let colorName = item.firstChild.innerText;
        let colorValue = item.lastChild.innerText;
        return `<div id="${idx}" class="btn-color" data-color="${colorName}">
	      <div class="btn-color--color" style="background-color:${colorValue}"></div>
	 
	      </div>`;
      })
      .join("")}`;
}

// GET COLOR BUTTONS
function getColorBtns() {
  let [...colorBtns] = colorsBtnsContainer.children;
  colorBtns.forEach((colorBtn) => {
    colorBtn.innerText.toLowerCase();
    colorBtn.addEventListener("click", changeImageUrl);

    colorBtn.addEventListener("mouseover", createTooltipElm);
    colorBtn.addEventListener("mouseout", removeTooltipElm);
    colorBtn.addEventListener("mousemove", followMouse, false);
  });
}
// CREATE TOOLTIP
function createTooltipElm(e) {
  let tooltipElm = document.createElement("div");
  let tooltipContent = e.target.parentElement.getAttribute("data-color");
  tooltipElm.classList.add("tooltip");
  tooltipElm.innerText = tooltipContent;
  e.target.appendChild(tooltipElm);
}

// REMOVE TOOLTIP
function removeTooltipElm(e) {
  document.querySelector(".tooltip").remove();
}

// TOOLTIP FOLLOW MOUSE
function followMouse(e) {
  let tt = document.querySelector(".tooltip");
  let x = e.clientX;
  let y = e.clientY;
  tt.style.top = `${y + 10}px`;
  tt.style.left = `${x + 10}px`;
}

// CHANGE BACKGROUND IMAGE
function changeImageUrl(e) {
  let colorId = e.target.parentElement.dataset.color;
  let selectedColorImgUrl = getImageUrl(colorAndUrlObj, colorId);
  productImgWrapper.style.backgroundImage = `url(${selectedColorImgUrl})`;
  // set color sub text on clickå
  itemColorSub.innerText = colorId;
}

//[ === HELPER -fn- === ]

function getObjectFirstValue(obj) {
  return obj[Object.keys(obj)[0]];
}

// get image url based on match of `colorID` and key of `imagesColorsUrls`
function getImageUrl(object, value) {
  let imgUrl = "";
  Object.keys(object).find((key) => {
    if (key == value) {
      imgUrl = object[key];
    } else {
      ("zonk");
    }
  });
  return imgUrl;
}

// feed data to object `colorAndUrlObj`
function populateRecordsToObject(object, items) {
  items.forEach((item) => {
    object[item.innerText] = item.href;
  });
}

// feed data to object `cmsDataObj`
function feedDataToObject(object, items) {
  items.forEach((item) => {
  	// to create object key slice first 4 characters (cms-) and rest will be key name (eg info, color-name, type etc.)
  	let cKey= item.id.slice(4)
  	// polulate object with key and value
    object[cKey] = item.innerText;
  });
}


getNextPrev();
// === END ================================ COLORS BUTTONS AND BG

