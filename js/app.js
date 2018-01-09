$.ajax({
  url: 'https://randomuser.me/api/1.1/?nat=us&results=12&inc=picture,name,email,location,dob,phone',
  dataType: 'json',
  success: function(data) {
    /////////////////////////////////
    // Map data to be used ///////
    //person =  The current item of the array
    //indexItem =  The current index of the current item
    //results =  The entire array
    let allNames = data.results.map((person, indexItem, results) => {
      return appendPanelContent(person, indexItem);
    });
  }
});

//Select class panel Node
const allPanel = document.querySelectorAll('.panel');
// Get first and last names and add them to "full-name" id
// Appends all info form the data array to panels

function appendPanelContent(data, index) {
  const fullName = document.querySelectorAll('#full-name')[index];
  fullName.textContent =
    firstLetterCaps(data.name.first) +
    ' ' +
    firstLetterCaps(data.name.last);

  const img = document.querySelectorAll('.avitar--thumbnail')[index];
  img.setAttribute('src', data.picture.large);

  const email = document.querySelectorAll('.email')[index];
  email.textContent = data.email;

  const cityName = document.querySelectorAll('.city--name')[index];
  cityName.textContent = firstLetterCaps(data.location.city);

  /////////////////////////////////////////////////////////////////
  // Get the rest of the data used in the bottom of overlay section
  const phone = data.phone;
  const address = data.location.street + ', ' + data.location.state + ' ' + data.location.postcode;
  const birthday = data.dob;
  // found on line: 118
  getBottomData(phone, address, birthday);
}

// Make first letter in name uppercase
function firstLetterCaps(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// ADD LIGHTBOX/OVERLAY on clcik
// if panel is clicked deploy light box on clicked panel
const panel = document.querySelector('.panel__grid');
const panelOverlay = document.querySelector('.panel__main');


////////////////////////////////////////////
// Event listeners for panel overlay  /////
//////////////////////////////////////////
panelOverlay.addEventListener('click', closeBtn => {
  if (closeBtn.target.className === 'close--overlay' || closeBtn.target.className === 'panel__overlay') {
    const panelOverlay = document.querySelector('.panel__overlay');
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
    panelOverlay.style.display = 'none';
  }
});

panel.addEventListener('click', btn => {
  const panelTarget = btn.target;
  /////////////////
  // Find ithe following nodes img, name, city, email &&
  // append it to overlay on click
  const panelList = btn.currentTarget.children;
  ////////////////////////////////////////////////////////
  // find out where user clicked and append correct content
  for (var i = 0; i < panelList.length; i++) {
    if (btn.target.parentNode.parentNode === btn.currentTarget.children[i]) {
      console.log(phoneArr[i]);
      console.log(addArr[i]);
      console.log(dobArr[i]);
      const phoneNode = phoneArr[i]; // Phone Nuber
      const addNode = addArr[i]; // Address
      const dobNode = dobArr[i]; // Date Of Birth
      const imgNode = panelTarget.parentNode.children[0]; //avitar
      const nameNode = panelTarget.parentNode.children[1].children[0]; //Name of person
      const emailNode = panelTarget.parentNode.children[1].children[1]; //Email address
      const cityNode = panelTarget.parentNode.children[1].children[2]; //location City
      // add the following to overlay panel
      addPanelContent(imgNode, nameNode, emailNode, cityNode, phoneNode, addNode, dobNode);

    }
    if (btn.target.parentNode.parentNode.parentNode === btn.currentTarget.children[i]) {
      //////////////////////////
      // Same as line: 75 /////
      const phoneNode = phoneArr[i];
      const addNode = addArr[i];
      const dobNode = dobArr[i];
      const imgNode = panelTarget.parentNode.parentNode.children[0];
      const nameNode = panelTarget.parentNode.children[0];
      const emailNode = panelTarget.parentNode.children[1];
      const cityNode = panelTarget.parentNode.children[0];
      // add the following to overlay panel
      addPanelContent(imgNode, nameNode, emailNode, cityNode, phoneNode, addNode, dobNode);
    }
  }

});
////////////////////////////////////////////////
// Calculate bottom content then display it ////
function addPanelContentBttm(arrPhone, arrAdd, arrDob) {
  const phone = document.querySelector('.phone--number--selected');
  const address = document.querySelector('.address--selected');
  const birthday = document.querySelector('.birthday--selected');
  phone.textContent = arrPhone;
  address.textContent = arrAdd;
  birthday.textContent = 'Birthday' + ': ' + arrDob;
}
// Calculate content then display it //////
function addPanelContent(panelImg, panelName, panelEmail, panelCity, panelPhone, panelAdd, panelBday) {
  const img = document.querySelector('.avitar--thumbnail--selected');
  const name = document.querySelector('.full--name--selected');
  const email = document.querySelector('.email--selected');
  const city = document.querySelector('.city--name--selected');
  const phone = document.querySelector('.phone--number--selected');
  const address = document.querySelector('.address--selected');
  const birthday = document.querySelector('.birthday--selected');
  ////////////
  //hide or show overlay
  const panelOverlay = document.querySelector('.panel__overlay');
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'grid';
  panelOverlay.style.display = 'grid';

  ////////////
  //append content
  img.setAttribute('src', panelImg.src);

  name.textContent = panelName.textContent;

  email.textContent = panelEmail.textContent;

  city.textContent = panelCity.textContent;

  //Get bottom content
  addPanelContentBttm(panelPhone, panelAdd, panelBday);

}

/////////////////////////
//Store Bottom Overlay Data
let phoneArr = [];
let addArr = [];
let dobArr = [];

function getBottomData(phoneNum, add, dob, callback) {
  phoneArr.push(phoneNum);
  addArr.push(add);
  dobArr.push(dob);
}

///////////////////////////////////
// Hide overylay panel on load ////
function overlayPanelHideOnLoad() {
  const panelOverlay = document.querySelector('.panel__overlay');
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'none';
  panelOverlay.style.display = 'none';
}
//hide overlay on load
overlayPanelHideOnLoad();

///////////////////////////
// Search directory
function searchEmpDir() {
  let input, filter, ul, li, a, i;
  input = document.getElementById('searchDir');
  filter = input.value.toUpperCase();
  main = document.querySelector('.panel__grid');
  divPanels = main.querySelectorAll('.panel');
  for (i = 0; i < divPanels.length; i++) {
    h3 = divPanels[i].getElementsByTagName('H3')[0];
    if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
      divPanels[i].style.display = '';
    } else {
      divPanels[i].style.display = 'none';

    }
  }
}