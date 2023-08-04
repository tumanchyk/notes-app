const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${months[monthIndex]} ${day}, ${year}`;
}

 export const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
};