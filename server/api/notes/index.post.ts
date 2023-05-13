export default defineEventHandler(async (event) => {
   const note = await readBody(event);
   const newNote = await prisma.$transaction(async (tx) => {
      await tx.note.updateMany({
         where: {
            order: {
               gte: note.order ?? 0,
            },
         },
         data: {
            order: { increment: 1 },
         },
      });

      return await tx.note.create({
         data: note,
      });
   });
   return {
      ...newNote,
   };
});
