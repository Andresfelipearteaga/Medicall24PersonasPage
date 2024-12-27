 // Obtener referencias a los elementos
 const openDialogBtn = document.getElementById("open-dialog-btn");
 const dialog = document.getElementById("my_modal_3");

 const disableScroll = () => {
    document.body.classList.add("overflow-hidden");
  };

  const enableScroll = () => {
    document.body.classList.remove("overflow-hidden");
  };

 // Abrir el diálogo al hacer clic en el botón
 openDialogBtn.addEventListener("click", () => {
   if (!dialog.open) {
     dialog.showModal(); // Mostrar el diálogo
     disableScroll();

   }
 });

 // Cerrar el diálogo cuando se hace clic fuera del contenido
 dialog.addEventListener("click", (event) => {
   const rect = dialog.querySelector(".modal-box").getBoundingClientRect();
   if (
     event.clientX < rect.left ||
     event.clientX > rect.right ||
     event.clientY < rect.top ||
     event.clientY > rect.bottom
   ) {
     dialog.close();
     enableScroll();
   }
 });