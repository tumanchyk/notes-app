import { count } from "./countArchiveNotes.js"
import { formatString } from "./formatString.js";

export const createArchiveNote = (item) => {
    const allArch = count(item.category)
    return`<li id=${item.category}>
        <div class="flex items-center gap-5 bg-[rgba(0,0,0,0.6)] p-5 text-white font-medium px-20 text-[20px] border-b-2 border-[rgba(255,255,255,0.5)]">
        <h3 class="basis-1/2">${formatString(item.category)}</h3>
        <p class="basis-1/3">${item.notes.length}</p>
        <p class="basis-1/3">${allArch}</p>
        <button id='open-category' data-wrap-notes>
            <svg data-toggle-icon=${item.category} class="w-[25px] h-[25px] fill-current pr-[3px]">
                <use href="../src/icons/sprite.svg#icon-arrow-down"></use>
             </svg>    
        </button>
        </div>
        <ul data-archive-note-list=${item.category} style="display: none">
        ${item.notes.map((it) =>{
            return `<li id=${it.id} class='flex flex-col'>
         <div class='flex items-baseline bg-[rgba(0,0,0,0.6)] p-5 text-white font-medium px-20 text-[20px] border-b-2 border-[rgba(255,255,255,0.5)]'>
          <h2 class='capitalize basis-1/4 truncate p-4 pl-[0px]'>${it.name}</h2>
          <p class="basis-1/4">${it.creatingDate}</p>
          <p class="basis-1/4">${formatString(item.category)}</p>
          <div class="basis-1/3 truncate p-4 pl-[0px]"><p class='w-[100%] truncate text-[18px]'>${it.content}</p></div>
          <p class="basis-1/4 truncate text-[18px] p-4 pl-[0px]">${it.dates}</p>
          <button data-archive-remove=${item.category}>
            <svg class="w-[25px] h-[25px] text-white fill-current">
              <use href="../src/icons/sprite.svg#icon-archive-remove"></use>
            </svg>
          </button>
        </li>`
        }).join('')}
        </ul>
    </li>` }