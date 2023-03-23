export default defineEventHandler(async (event) => {
   
   const notes = await prisma.note.findMany()
   console.log("Notes Sent")
   return notes
})