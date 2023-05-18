export default defineEventHandler(async (event) => {
   const note_id = parseInt(event.context.params?.note_id ?? "");

   const updatedNote: Note = await readBody(event);

   if (note_id) {
      await prisma.$transaction(async (tx) => {
         const currentNote = await tx.note.findUnique({
            where: {
               id: note_id,
            },
         });

         const updatedOrder = updatedNote.order ?? 0;
         const currentOrder = currentNote?.order ?? 0;
         if (currentOrder !== updatedOrder) {
            if (updatedOrder > currentOrder) {
               await tx.note.updateMany({
                  where: {
                     order: { lte: updatedOrder, gt: currentOrder },
                  },
                  data: {
                     order: { decrement: 1 },
                  },
               });
            } else {
               await tx.note.updateMany({
                  where: {
                     order: { gte: updatedOrder, lt: currentOrder },
                  },
                  data: {
                     order: { increment: 1 },
                  },
               });
            }
         }
         await tx.note.update({
            where: { id: note_id },
            data: { ...updatedNote },
         });
      });
   }

   return {};
});
