var tickets = [
    {
        id: "standard-ticket",
        title: "Standard Tickets",
        name: "Standard",
        image: "images/ticket-blue.png",
        perks: [
            "Admission to the convention",
            "Saturday night music concert",
            "Con book",
            "Friday registration available for less time queuing",
            "Covid-19 ticket promise",
            "No booking fees",
            "Personalised badge",
        ],
        upgradable_perks: [
            "Badge and blue lanyard",
        ],
    },
    {
        id: "bronze-ticket",
        title: "Bronze Sponsor Ticket",
        name: "Bronze Sponsor",
        image: "images/ticket-bronze.png",
        perks: [
            "Vinyl sticker sheet",
            "Your name in the con book",
            "Early access to buy tickets to Afternoon Tea",
            "Early access to pre-order merchandise",
        ],
        upgradable_perks: [
            "Bronze sponsor badge and sponsor lanyard",
            "£5 donation to RDA",
            "Bronze sponsor Discord server role and channel",
        ],
    },
    {
        id: "silver-ticket",
        title: "Silver Sponsor Ticket",
        name: "Silver Sponsor",
        image: "images/ticket-silver.png",
        perks: [
            "Messenger bag",
            "Silver &amp; gold sponsor t-shirt",
            "Ceramic mug",
            "UK PonyCon 2025 button badges",
            "Enamel pin",
        ],
        upgradable_perks: [
            "Silver sponsor badge and sponsor lanyard",
            "Silver sponsor button badge",
            "£10 donation to RDA",
            "Silver sponsor Discord server role and channel",
            "Option to buy a sponsor hoodie",
            "Silver sponsor art print",
            "Priority entry",
            "Priority seating at Mane Stage",
            "2x autograph / photograph tokens",
            "Fast-track in autograph sessions",
        ],
    },
    {
        id: "gold-ticket",
        title: "Gold Sponsor Ticket",
        name: "Gold Sponsor",
        image: "images/ticket-gold.png",
        perks: [
            "Sponsor hoodie",
            "Top table seating at Afternoon Tea",
            "Thank you in the closing ceremony",
        ],
        upgradable_perks: [
            "Gold sponsor badge and sponsor lanyard",
            "£20 donation to RDA",
            "Gold sponsor Discord server role and channel",
            "Gold sponsor art print",
            "Priority entry",
            "Front-row seating at Mane Stage",
            "Gold sponsor autograph session",
            "4x autograph / photograph tokens",
            "Fast-track in autograph sessions",
            "Britannia plush by Sewpoke",
            "Afternoon Tea on Saturday afternoon",
        ],
    },
    {
        id: "ultra-gold-ticket",
        title: "Ultra-Gold Sponsor Ticket",
        name: "Ultra-Gold Sponsor",
        image: "images/ticket-ultra-gold.png",
        perks: [
        ],
        upgradable_perks: [
            "Ultra-Gold sponsor badge and sponsor lanyard made from real gold",
            "£500 donation to RDA",
            "Promotion to Moderator on the Discord server",
            "Ultra-Gold sponsor art print signed by whoever the current CEO of Hasbro is",
            "Ultra-Priority entry (you will be entered into the building via an aircraft catapult)",
            "Seat perched precariously on the front of the Mane Stage",
            "Ultra-Gold sponsor autograph session",
            "40x autograph / photograph tokens",
            "High-speed travelator lane in autograph sessions",
            "Animatronic Britannia plush with AI and customisable English local dialect",
            "10 consecutive Afternoon Teas on Saturday afternoon",
            'Maz has to say "Sponsored by [YOUR NAME]" after every sentence',
        ],
    },
    {
        id: "uranium-ticket",
        title: "Uranium Ticket",
        name: "Uranium",
        image: "images/ticket-uranium.png",
        perks: [
        ],
        upgradable_perks: [
            "Uranium badge and lanyard with color LED screen and sound system",
            "£100 billion donation to RDA",
            "You become the server owner for the UK PONYCONLINE Discord server",
            "IDW will produce a one-off comic about your OC, with art by Andy Price and Heather Breckel",
            "Paradox-Priority entry (a time machine will be used to enter you into the convention three days before it takes place)",
            "Seat directly on the Mane Stage",
            "The Special Guests will sign anything without reading it first",
            "8,000,000,000x autograph / photograph tokens",
            "You can halve the length of the autograph queue by snapping your fingers",
            "Experimental biotech will be used to create a living Britannia pony",
            "An Afternoon Tea will constantly follow you around the convention",
            "You can award or deduct points from Ember at will",
            "Maz will personally chauffeur you to every service station in Britain",
        ],
    },
];

function initialize()
{

    const ticketsDiv = document.querySelector("#tickets");
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];

        ticket.remaining = Math.pow(10, 5 - i);
        ticket.bought = 0;

        let perks = [];
        for (let j = 0; j <= i; j++) {
            perks = perks.concat(tickets[j].perks)
        }

        perks = perks.concat(ticket.upgradable_perks);

        const perksListItems = perks.map(perk => `<li>${perk}</li>`);
        const perksList = `<ul>${perksListItems.join("\n")}</ul>`;
        const ticketDiv = document.createElement("div");
        ticketDiv.className = "ticket";
        ticketDiv.innerHTML = `
<img src="${ticket.image}" alt="${ticket.title}" />
<div>
    <h2>${ticket.title}</h2>
    <p id="remaining-${ticket.id}" class="remaining">ONLY ${ticket.remaining} REMAINING</p>
    ${perksList}
    <button id="buy-${ticket.id}" data-ticket-idx="${i}">Buy now</button>
    <p id="bought-${ticket.id}" class="bought"></p>
</div>
`; 
        ticketsDiv.appendChild(ticketDiv);

        const buyButton = document.querySelector("#buy-" + ticket.id);
        buyButton.addEventListener("click", handleBuy);
    }
}

function handleBuy(evt)
{
    const ticketIdx = evt.target.dataset.ticketIdx;
    const ticket = tickets[ticketIdx];
    const remaining = document.querySelector(`#remaining-${ticket.id}`);
    const bought = document.querySelector(`#bought-${ticket.id}`);

    if (ticket.remaining > 1) {
        ticket.remaining -= 1;
        ticket.bought += 1;
        remaining.innerHTML = `ONLY ${ticket.remaining} REMAINING`;
    } else {
        ticket.remaining -= 1;
        ticket.bought += 1;
        remaining.innerHTML = "SOLD OUT";
        const buyButton = document.querySelector("#buy-" + ticket.id);
        buyButton.innerHTML = "SOLD OUT";
        buyButton.disabled = true;
    }

    let ticketNoun = "Ticket"
    if (ticket.bought !== 1) {
        ticketNoun += "s";
    }
    bought.innerHTML = `You've bought ${ticket.bought} ${ticket.name} ${ticketNoun}`;

}

window.onload = initialize;
