const getCorrectTime = (date: any) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesString} ${ampm}`;
}

const modifiedEventDate = (date: any) => {
    let updatedDate = new Date(date);
    let modifiedTrimFormate = updatedDate.toString().split(' ').slice(0, 5);
    let modifiedFormate = `${modifiedTrimFormate[0]}, ${modifiedTrimFormate[2]} ${modifiedTrimFormate[1]} ${modifiedTrimFormate[3]}, ${getCorrectTime(updatedDate)}`;
    return modifiedFormate;
}

export default modifiedEventDate;