export default function createNote({
    name,
    creatingDate,
    category,
    content,
    dates, 
    id
}) {
  return `
        <li id={${id}} class='flex flex-col'>
         <div class='flex bg-[rgba(0,0,0,0.6)] p-5 text-white font-medium  px-20 text-[20px] border-b-2 border-[rgba(255,255,255,0.5)]'>
          <h2 class='capitalize basis-1/4 truncate'>${name}</h2>
          <p class="basis-1/4">${creatingDate}</p>
          <p class="basis-1/4">${category}</p>
          <p class="basis-1/3 truncate">${content}</p>
          <p class="basis-1/4">${dates}</p>
            <div class="flex gap-5">
          <button data-edit={${id}} class='text-white hover:text-[rgba(255,255,255,0.5)]'>
            <svg class="w-[28px] h-[28px] fill-current">
              <use href="../src/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>
          <button data-archive={${id}}>
            <svg class="w-[25px] h-[25px] text-white fill-current">
              <use href="../src/icons/sprite.svg#icon-archive-add"></use>
            </svg>
          </button>
          <button data-delete={${id}}>
            <svg class="w-[25px] h-[25px] text-white fill-current">
              <use href="../src/icons/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
         </div>
         <div data-edit-form={${id}} style="display: none">djkjkjfkjdkjk</div>
      </li>`;
}
