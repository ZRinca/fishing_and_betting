let table = document.getElementById("tableFishItem");

fishData.forEach((el)=>{
    const row = document.createElement('tr');

    const td_fish = document.createElement('td');
    const img = document.createElement('img');
    img.src = el.img;
    td_fish.appendChild(img);
    row.appendChild(td_fish);

    const name_fish = document.createElement('td');
    name_fish.textContent = el.img.replace("assets/img/fish/", "").replace(".png", "");
    row.appendChild(name_fish);

    const lvl_fish = document.createElement('td');
    lvl_fish.textContent = el.level;
    row.appendChild(lvl_fish);

    table.appendChild(row);

});

function clousedWindow() {
    document.querySelector('.table-back').style.display = 'none';
}