eventSubject = document.getElementById('event-subject');
eventDateTimeRange = document.getElementById('event-date-time-range');
eventDesc = document.getElementById('event-desc');
eventCountdown = document.getElementById('event-countdown');
previousEventWinnersHeader = document.getElementById('previous-event-winners-header');


async function getLastFinishedEvent() {
    try {
        const response = await fetch('http://localhost:8080/event/last-finished');
        if (!response.ok) {
            throw new Error('HTTP Error: ${response.status}');
        }
        const recentEvent = await response.json();

        return recentEvent;
    } catch (error) {
        console.error('Could not load the recently finished event:', error);
    }
}

async function getUpcomingEvent() {
    try {
        const response = await fetch('http://localhost:8080/event/upcoming');
        if (!response.ok) {
            throw new Error('HTTP Error: ${response.status}');
        }
        const upcomingEvent = await response.json();

        return upcomingEvent;
    } catch (error) {
        console.error('Could not load the upcoming event:', error);
    }
}

function updateEventCountdown() {
    const now = new Date();

    const comingDate = getUpcomingEvent().subject;
    console.log(comingDate);
   
    const difference = comingDate - now;

    if (difference <= 0) {
        eventCountdown.innerHTML = eventSubject + " has begun!";
        clearInterval(timer);
        return;
    }

    const secondsToComingDate = Math.floor(difference / 1000);

    const hoursOnCountdown = Math.floor(secondsToComingDate / 3600);
    const minutesOnCountdown = Math.floor((secondsToComingDate % 3600) / 60);
    const secondsOnCountdown = secondsToComingDate % 60;

    eventCountdown.innerHTML = `${String(hoursOnCountdown).padStart(2, '0')}:` + 
        `${String(minutesOnCountdown).padStart(2, '0')}:` + 
        `${String(secondsOnCountdown).padStart(2, '0')}`;
}

updateEventCountdown();
const timer = setInterval(updateEventCountdown, 1000);