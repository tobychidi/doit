export default defineEventHandler(async (event) => {
   const note = await readBody(event)
   const newNote = await prisma.note.create({
      data: note
   })
   return {
      ...newNote
   }
})