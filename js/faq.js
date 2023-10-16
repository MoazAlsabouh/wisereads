const feqs = document.querySelectorAll(".feq");
feqs.forEach(feq => {
    feq.addEventListener("click", () => {
        feq.classList.toggle("active");
    })
})