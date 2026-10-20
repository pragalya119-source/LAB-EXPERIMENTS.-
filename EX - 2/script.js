
const MAX_SEATS = 6;

const buses = {
  purple: {
    name: "Purple Line Express",
    number: "GB 2401",
    type: "AC Sleeper",
    departure: "21:30",
    arrival: "06:15",
    fare: 850,
    boarding: "Chennai Koyambedu",
    dropping: "Bengaluru Majestic"
  },
  southern: {
    name: "Southern Travels",
    number: "GB 2402",
    type: "Non-AC Sitting",
    departure: "21:00",
    arrival: "05:45",
    fare: 600,
    boarding: "Guindy",
    dropping: "Bengaluru Majestic"
  }
};

let currentBus = "purple";
let selectedSeats = [];
let confirmedBookings = [];
let bookedSeats = {
  purple: [3, 7, 12, 18, 24, 31, 36, 42, 48, 53],
  southern: [2, 8, 14, 19, 27, 33, 39, 45, 50]
};

const $ = (id) => document.getElementById(id);

function formatDate(dateString) {
  if (!dateString) return "Date not selected";

  const date = new Date(dateString + "T12:00:00");

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getBus() {
  return buses[currentBus];
}

function createSeat(number, deck) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "seat";
  button.textContent = number;
  button.setAttribute("aria-label", `Seat ${number}, ${deck} deck`);

  const isBooked = bookedSeats[currentBus].includes(number);

  if (isBooked) {
    button.classList.add("booked");
    button.disabled = true;
    button.title = "Already booked";
  } else {
    if (selectedSeats.includes(number)) {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }

    button.addEventListener("click", () => toggleSeat(number));
  }

  return button;
}

function renderDecks() {
  const lowerDeck = $("lowerDeck");
  const upperDeck = $("upperDeck");

  lowerDeck.replaceChildren();
  upperDeck.replaceChildren();

  // Lower deck: seats 1–28
  for (let number = 1; number <= 28; number++) {
    lowerDeck.appendChild(createSeat(number, "lower"));
  }

  // Upper deck: seats 29–55
  for (let number = 29; number <= 55; number++) {
    upperDeck.appendChild(createSeat(number, "upper"));
  }
}

function toggleSeat(number) {
  if (selectedSeats.includes(number)) {
    selectedSeats = selectedSeats.filter(seat => seat !== number);
  } else {
    if (selectedSeats.length >= MAX_SEATS) {
      alert("You can select a maximum of 6 seats.");
      return;
    }

    selectedSeats.push(number);
  }

  renderDecks();
  updateFare();
}

function updateFare() {
  const fare = getBus().fare;
  const total = selectedSeats.length * fare;

  $("selectedCount").textContent =
    `${selectedSeats.length} selected`;

  $("selectedSeatText").textContent = selectedSeats.length
    ? `Selected seats: ${selectedSeats.slice().sort((a, b) => a - b).join(", ")}`
    : "Select a seat to continue";

  $("totalFare").textContent = `₹${total.toLocaleString("en-IN")}`;
  $("continueButton").disabled = selectedSeats.length === 0;

  $("passengerSeatSummary").textContent =
    `Selected seats: ${selectedSeats.slice().sort((a, b) => a - b).join(", ") || "None"}`;

  $("passengerFareSummary").textContent =
    `Total fare: ₹${total.toLocaleString("en-IN")}`;
}

function updateBusDetails() {
  const bus = getBus();

  $("selectedBusType").textContent = bus.type;
  $("selectedBusName").textContent = bus.name;
  $("selectedBusNumber").textContent = bus.number;
  $("departureTime").textContent = bus.departure;
  $("arrivalTime").textContent = bus.arrival;

  $("departureCity").textContent = $("from").value || "Chennai";
  $("arrivalCity").textContent = $("to").value || "Bengaluru";

  const date = $("date").value;
  $("journeyDate").textContent = formatDate(date);
  $("busDate").textContent = formatDate(date);

  $("boardingPoint").value = bus.boarding;
  $("droppingPoint").value = bus.dropping;
}

function chooseBus(busKey) {
  currentBus = busKey;
  selectedSeats = [];

  updateBusDetails();
  renderDecks();
  updateFare();

  $("seatSection").scrollIntoView({ behavior: "smooth" });
}

function showStage(stageNumber) {
  $("seatStage").hidden = stageNumber !== 1;
  $("passengerStage").hidden = stageNumber !== 2;
  $("confirmationStage").hidden = stageNumber !== 3;

  for (let number = 1; number <= 3; number++) {
    const step = $(`step${number}`);
    step.classList.toggle("active", number === stageNumber);
    step.classList.toggle("completed", number < stageNumber);
  }

  $("seatSection").scrollIntoView({ behavior: "smooth" });
}

$("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if ($("from").value.trim().toLowerCase() ===
      $("to").value.trim().toLowerCase()) {
    alert("Please choose different departure and destination cities.");
    return;
  }

  updateBusDetails();
  $("buses").scrollIntoView({ behavior: "smooth" });
});

$("chooseBus").addEventListener("click", () => chooseBus("purple"));
$("chooseBus2").addEventListener("click", () => chooseBus("southern"));

$("continueButton").addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  updateFare();
  showStage(2);
});

$("backToSeats").addEventListener("click", () => showStage(1));

$("passengerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const bus = getBus();
  const seats = [...selectedSeats].sort((a, b) => a - b);

  // Recheck availability before confirming the booking.
  if (seats.some(seat => bookedSeats[currentBus].includes(seat))) {
    alert("One of your selected seats is no longer available. Please select again.");
    selectedSeats = [];
    renderDecks();
    updateFare();
    showStage(1);
    return;
  }

  const booking = {
    id: "GB" + Date.now().toString().slice(-8),
    passenger: $("passengerName").value.trim(),
    phone: $("phone").value.trim(),
    email: $("email").value.trim(),
    bus: bus.name,
    busNumber: bus.number,
    date: $("date").value,
    from: $("from").value.trim(),
    to: $("to").value.trim(),
    seats,
    boarding: $("boardingPoint").value,
    dropping: $("droppingPoint").value,
    fare: seats.length * bus.fare
  };

  bookedSeats[currentBus].push(...seats);
  confirmedBookings.push(booking);

  $("bookingResult").replaceChildren();

  const details = [
    ["Booking ID", booking.id],
    ["Passenger", booking.passenger],
    ["Bus", booking.bus],
    ["Bus number", booking.busNumber],
    ["Journey", `${booking.from} → ${booking.to}`],
    ["Travel date", formatDate(booking.date)],
    ["Seats", seats.join(", ")],
    ["Boarding", booking.boarding],
    ["Dropping", booking.dropping],
    ["Total fare", `₹${booking.fare.toLocaleString("en-IN")}`]
  ];

  details.forEach(([label, value]) => {
    const row = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;
    row.append(strong, document.createTextNode(value));
    $("bookingResult").appendChild(row);
  });

  updateMyBookings();
  showStage(3);
});

function updateMyBookings() {
  const container = $("myBookings");
  container.replaceChildren();

  if (confirmedBookings.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No bookings yet. Complete a booking to see it here.";
    container.appendChild(message);
    return;
  }

  confirmedBookings.slice().reverse().forEach(booking => {
    const card = document.createElement("article");
    card.className = "booking-entry";

    const heading = document.createElement("h3");
    heading.textContent = booking.bus;

    const details = document.createElement("p");
    details.textContent =
      `${booking.from} → ${booking.to} | ${formatDate(booking.date)} | Seats: ${booking.seats.join(", ")} | ₹${booking.fare}`;

    const id = document.createElement("p");
    id.textContent = `Booking ID: ${booking.id}`;

    card.append(heading, details, id);
    container.appendChild(card);
  });
}

$("newBooking").addEventListener("click", () => {
  selectedSeats = [];
  $("passengerForm").reset();

  updateBusDetails();
  renderDecks();
  updateFare();
  showStage(1);

  $("home").scrollIntoView({ behavior: "smooth" });
});

$("date").addEventListener("change", updateBusDetails);
$("from").addEventListener("change", updateBusDetails);
$("to").addEventListener("change", updateBusDetails);

updateBusDetails();
renderDecks();
updateFare();
updateMyBookings();
showStage(1);
