const xhr = new XMLHttpRequest();

xhr.addEventListener("loadend", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/");
xhr.send();