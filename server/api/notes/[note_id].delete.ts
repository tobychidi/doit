export default defineEventHandler(async (event) => {
   const note_id = parseInt(event.context.params?.note_id ?? "");

   if (note_id) {
      const note = await prisma.note.delete({
         where: { id: note_id },
      });
      console.log("deleted", note);
   }
   return {};
});
