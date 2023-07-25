export default function createNote({
    name,
    creatingDate,
    category,
    content,
    dates, 
    id
}) {
  return `
        <li id={${id}} class='flex bg-black text-white'>
          <h2>${name}</h2>
          <p>${creatingDate}</p>
          <p>${category}</p>
          <p>${content}</p>
          <p>${dates}</p>
      </li> `;
}
