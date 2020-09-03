const getActivityBtn = document.querySelector('.get-activity');
const activityDisplay = document.querySelector('.random-activity');
let typeValue;
let participantsValue;
let priceValue;

function getRandomActivity() {
  getFilters();
  let path = generatePath();

  fetch(`${path}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.activity !== undefined) {
        updateDOM(data.activity);
      } else {
        updateDOM(
          'Sorry, that combination of filters does not produce any results'
        );
      }
      console.log(data);
    });
}
function generatePath() {
  let path = 'http://www.boredapi.com/api/activity/';
  let filters = [];
  if (typeValue !== 'type=all') filters.push(typeValue);
  if (participantsValue !== 'participants=all') filters.push(participantsValue);
  if (priceValue !== 'all') filters.push(priceValue);

  if (filters.length == 0) {
    return path;
  } else if (filters.length == 1) {
    return path + `?${filters[0]}`;
  } else if (filters.length == 2) {
    return path + `?${filters[0]}&${filters[1]}`;
  } else {
    return path + `?${filters[0]}&${filters[1]}&${filters[2]}`;
  }
}

function getFilters() {
  //get values of filters
  let type = document.getElementById('type');
  typeValue = `type=${type.options[type.selectedIndex].value}`;
  let participants = document.getElementById('participants');
  participantsValue = `participants=${
    participants.options[participants.selectedIndex].value
  }`;
  let price = document.getElementById('price');

  // different options for price (using price and price range)
  if (price.options[price.selectedIndex].value == 0) {
    priceValue = 'price=0.0';
  } else if (price.options[price.selectedIndex].value == 1) {
    priceValue = 'minprice=0.01&maxprice=1';
  } else {
    priceValue = 'all';
  }
}
function updateDOM(activity) {
  activityDisplay.innerHTML = activity;
}

//event listeners
getActivityBtn.addEventListener('click', getRandomActivity);
