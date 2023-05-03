export default defineEventHandler(async (event) => {
   
   const notes = await prisma.note.findMany({
      orderBy: {
         id: "desc"
      }
   })
   console.log("notes sent")
   return {
      notes,
      timestamp: new Date(),
   };
})