// // /////////////////////////////////////// change background/////////////////////////
function changeBackground(imagePath) {
  var backgroundImage = document.getElementById("backgroundImage");
  backgroundImage.src = imagePath;
}

let currentIndex = 0;
const totalItems = document.querySelectorAll(".carousel-item").length; // عدد العناصر في الكارسول

// دالة لتحريك الكارسول إلى اليمين
function nextSlide() {
  const carouselInner = document.querySelector(".carousel-inner");
  if (currentIndex < totalItems - 4) {
    // تأكد من عدم تجاوز الحدود
    currentIndex++;
    carouselInner.style.transform = `translateX(-${currentIndex * 25}%)`; // 25% لأننا نعرض 4 عناصر في كل مرة
  }
}

// دالة لتحريك الكارسول إلى اليسار
function prevSlide() {
  const carouselInner = document.querySelector(".carousel-inner");
  if (currentIndex > 0) {
    currentIndex--;
    carouselInner.style.transform = `translateX(-${currentIndex * 25}%)`; // 25% لأننا نعرض 4 عناصر في كل مرة
  }
}

// /////////////////////////////////////////-----------Check date------------/////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("search-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // منع إرسال النموذج بشكل افتراضي

    //  الحصول على القيم المدخلة
    const checkInDate = document.getElementById("pickup-date").value;
    const checkOutDate = document.getElementById("dropoff-date").value;
    const roomAndAdults = document.getElementById("rooms-adults").value;

    //  التحقق من القيم المدخلة
    if (!checkInDate || !checkOutDate) {
      displayMessage("Please enter your arrival and departure dates.", "error");
      form.reset();
      return;
    }

    // التحقق من تواريخ الوصول والمغادرة
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      displayMessage("Departure date must be after arrival date.", "error");
      form.reset();
      return;
    }

    // const message = ` Search results`;
    // displayMessage(message, "success");

    // إعادة تعيين النموذج
    form.reset();
    displayMessage.reset();
  });
});

function displayMessage(message, type) {
  const responseDiv = document.getElementById("response-message");
  responseDiv.innerHTML = message; // تحديث محتوى الرسالة
  responseDiv.style.color = type === "error" ? "red" : "green"; // تغيير لون النص حسب نوع الرسالة
}

// ////////////////////////////////////////////////////////////////////
const hotels = [
  {
    name: "Hilton Hotel",
    img: "images2/photo2.jpg",
    description:
      "Perfect for a relaxing stay. Enjoy beautiful city views and luxury amenities.",
    stars: 4,
    rooms: "1 room, 2 adults",
    checkIn: "2023-10-01",
    checkOut: "2023-10-05",
  },
  {
    name: "Mövenpick Hotel",
    img: "images2/photo_22.jpg",
    description:
      "Perfect for a relaxing stay. Enjoy beautiful city views and luxury amenities.",
    stars: 4,
    rooms: "1 room, 1 adult",
    checkIn: "2023-10-02",
    checkOut: "2023-10-06",
  },
];

// Function to search for a matching hotel
function searchHotel() {
  const pickupDate = document.getElementById("pickup-date").value;
  const dropoffDate = document.getElementById("dropoff-date").value;
  const roomsAdults = document.getElementById("rooms-adults").value;

  const matchedHotel = hotels.find((hotel) => hotel.rooms === roomsAdults);

  if (matchedHotel) {
    displaySelectedHotel(matchedHotel);
  } else {
    document.getElementById("response-message").textContent =
      "No matching hotels found.";
  }
}

// Function to display the selected hotel
function displaySelectedHotel(hotel) {
  const hotelInfo = `
        <img src="${hotel.img}" alt="${hotel.name}" />
        <h3>${hotel.name}</h3>
        <p>${hotel.description}</p>
        <div class="stars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(hotel.stars)}
        </div>
        <a href="hotel2.html">  <button class="card-btn-hotel">More Details</button></a>
      `;

  document.getElementById("hotel-info").innerHTML = hotelInfo;
  document.getElementById("selected-hotel").style.display = "block";
}

// Event listener for the search form
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchHotel();
  });
