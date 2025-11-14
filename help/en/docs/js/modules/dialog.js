import A11yDialog from "a11y-dialog";

export const initDialog = (id, { onOpen } = {}) => {
  const dialog = new A11yDialog(document.getElementById(id));
  const body = document.querySelector("body");
  dialog.on("show", function () {
    body.setAttribute("data-dialog-open", "true");
    if (dialog.$el.querySelector("[data-default-dialog-focus]")) {
      setTimeout(() => {
        dialog.$el.querySelector("[data-default-dialog-focus]").focus();
      }, 0);
    }
  });

  dialog.on("hide", function () {
    body.removeAttribute("data-dialog-open");
  });

  document.querySelectorAll(`[data-dialog-open="${id}"]`).forEach((button) => {
    button.addEventListener("click", () => {
      dialog.show();
      onOpen?.(button, dialog);
    });
  });

  return dialog;
};
