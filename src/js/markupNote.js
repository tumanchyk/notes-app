import { formatString } from "./formatString.js";
export default function createNote({
    name,
    creatingDate,
    category,
    content,
    dates, 
    id
}) {
  return `
        <li id=${id} class='flex flex-col'>
         <div class='flex items-baseline bg-[rgba(0,0,0,0.6)] p-5 text-white font-medium px-20 text-[20px] border-b-2 border-[rgba(255,255,255,0.5)]'>
          <h2 class='capitalize basis-1/4 truncate p-4 pl-[0px]'>${name}</h2>
          <p class="basis-1/4">${creatingDate}</p>
          <p class="basis-1/4">${formatString(category)}</p>
          <div class="basis-1/3 truncate p-4 pl-[0px]"><p class='w-[100%] truncate text-[18px]'>${content}</p></div>
          <p class="basis-1/4 truncate text-[18px] p-4 pl-[0px]">${[...new Set(dates)].map(date => date).join(', ')}</p>
            <div class="flex gap-5">
          <button data-edit class='text-white hover:text-[rgba(255,255,255,0.5)]'>
            <svg class="w-[28px] h-[28px] fill-current">
              <use href="../src/icons/sprite.svg#icon-edit"></use>
            </svg>
          </button>
          <button data-archive>
            <svg class="w-[25px] h-[25px] text-white fill-current">
              <use href="../src/icons/sprite.svg#icon-archive-add"></use>
            </svg>
          </button>
          <button data-delete>
            <svg class="w-[25px] h-[25px] text-white fill-current">
              <use href="../src/icons/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
         </div>
         <div data-edit-form=${id} style="display: none">
         <form id='edit-form' class="flex relative flex-col flex-wrap bg-[rgba(0,0,0,0.6)] w-[500px] py-[50px] px-[40px] mx-auto mt-[30px] mb-[40px] gap-[25px]">
         <button
            id="close-edit-form"
            class="absolute top-4 right-5 text-white hover:text-[rgba(255,255,255,0.5)]"
          >
            <svg class="w-[30px] h-[30px] fill-current">
              <use href="../src/icons/sprite.svg#icon-cross"></use>
            </svg>
          </button>
        <div>
           <h3 class="text-white mb-[10px] font-medium">Note name</h3>
           <input type='text' data-input-name=${id} value=${name} class='p-3 w-[100%] outline-0'/>
        </div>
        <div>
            <h3 class="text-white mb-[10px] font-medium">Choose category</h3>
            <select id="categoryInp" data-input-category=${id} class="w-[100%] p-3 outline-0" value={${category}}>
              <option value="Task">Task</option>
              <option value="Quote">Quote</option>
              <option value="Idea">Idea</option>
              <option value="Random thought">Random thought</option>
            </select>
          </div>
          <div>
           <h3 class="text-white mb-[10px] font-medium">Note content</h3>
           <textarea
            data-input-content=${id}
            placeholder="Enter content"
            class="resize-none text-black p-3 outline-0 w-[100%]"
          >${content}</textarea>
        </div>
        <button
            id="save-note"
            type='submit'
            data-save-note=${id}
            class="cursor-pointer text-white font-bold bg-[transparent] border-2 uppercase border-white [20px] py-[15px] mt-[20px] hover:bg-black hover:border-black"
          >
            Save note
          </button>
         </form></div>
      </li>`;
}
