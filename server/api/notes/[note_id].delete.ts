export default defineEventHandler(async (event) => {
   const note_id = parseInt(event.context.params?.note_id ?? "");

   if (note_id) {
      await prisma.$transaction(async (tx) => {
         const note = await tx.note.delete({
            where: { id: note_id },
         });

         console.log("deleted", note);
         await tx.note.updateMany({
            where: {
               order: {
                  gte: note.order ?? 0,
               },
            },
            data: {
               order: { decrement: 1 },
            },
         });
      });
   }
   return {};
});
