//fungsi untuk membuka navigasi hamburger
function toggleMenu(){
    const menu = document.querySelector(".menu-link");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

}

//fungsi untuk button back to top
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

//memanggil data untuk course data analytics dari database
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://be-balikpapan-15-production.up.railway.app/materi/category/1')
    .then(response => response.json())
    .then(data => {
      const videoList = document.getElementById('video-list');
      data.forEach(materi => {
        const listItem = document.createElement('li');
        let link = materi.link
        link = link.replace('https://youtu.be/','https://www.youtube.com/embed/')
         listItem.innerHTML = `
           <h1>${materi.judul}</h1>
           <iframe width="560" height="400" src="${link}" frameborder="0" allowfullscreen></iframe>
           <p>${materi.deskripsi}</p>
         `;
         videoList.appendChild(listItem);
      });
    });
});

//memanggil data untuk course frondend dari database
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://be-balikpapan-15-production.up.railway.app/materi/category/2')
    .then(response => response.json())
    .then(data => {
      const videoList = document.getElementById('video-list-frondend');
      data.forEach(materi => {
        const listItem = document.createElement('li');
        let link = materi.link
        link = link.replace('https://youtu.be/','https://www.youtube.com/embed/')
         listItem.innerHTML = `
           <h1>${materi.judul}</h1>
           <iframe width="560" height="400" src="${link}" frameborder="0" allowfullscreen></iframe>
           <p>${materi.deskripsi}</p>
         `;
         videoList.appendChild(listItem);
      });
    });
});

//memanggil data untuk course backend dari database
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://be-balikpapan-15-production.up.railway.app/materi/category/3')
    .then(response => response.json())
    .then(data => {
      const videoList = document.getElementById('video-list-backend');
      data.forEach(materi => {
        const listItem = document.createElement('li');
        let link = materi.link
        link = link.replace('https://youtu.be/','https://www.youtube.com/embed/')
         listItem.innerHTML = `
           <h1>${materi.judul}</h1>
           <iframe width="560" height="400" src="${link}" frameborder="0" allowfullscreen></iframe>
           <p>${materi.deskripsi}</p>
         `;
         videoList.appendChild(listItem);
      });
    });
});