export default defineEventHandler(async (event) => {
   const note = await readBody(event);

   await prisma.note.delete({
      where: { id: note.id },
   });
   console.log("deleted", note);
   return {};
});
