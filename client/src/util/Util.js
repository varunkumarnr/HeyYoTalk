export const closeModal = id => {
  document.querySelector(`#style-${id}`).classList.replace("active", "closed");

  setTimeout(() => {
    document.querySelector(`#${id}`).classList.remove("active");
  }, 105);
};
export const openModal = id => {
  const element = document.querySelector(`#${id}`);
  console.log(element);
  element.classList.add("active");
  // element.setAttribute("data-payload", JSON.stringify(payload));
  document.querySelector(`#style-${id}`).classList.remove("closed");
  document.querySelector(`#style-${id}`).classList.add("active");
};
