import { count } from "./countArchiveNotes.js"

export const createArchiveNote = (item) => {
    const allArch = count(item.category)
    return`<li class="flex gap-5 bg-[rgba(0,0,0,0.6)] p-5 text-white font-medium px-20 text-[20px] border-b-2 border-[rgba(255,255,255,0.5)]">
        <h3 class="basis-1/2">${item.category}</h3>
        <p class="basis-1/3">${item.notes.length}</p>
        <p class="basis-1/3">${allArch}</p>
    </li>` }