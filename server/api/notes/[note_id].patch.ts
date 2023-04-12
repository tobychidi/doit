export default defineEventHandler(async (event) => {
   console.log("hit")
   const note_id = parseInt(event.context.params?.note_id ?? "");
   console.log(note_id);

   const updatedNote = await readBody(event);

   console.log(updatedNote);

   if (note_id) {
      await prisma.note.update({
         where: { id: note_id },
         data: {
            note: updatedNote.note,
         },
      });
   }

   return {};
});
