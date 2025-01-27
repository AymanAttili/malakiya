export const timeFormatter = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);  // Assume it's UTC time

    // Format to hh:mm AM/PM
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    let formattedTime = date.toLocaleTimeString('en-US', options);
    formattedTime = formattedTime.replace('AM', 'صباحًا').replace('PM', 'مساءً');

    return formattedTime
}