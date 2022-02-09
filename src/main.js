const language = (json) => {
    fetch(json).then(function (response) {
        return response.json();
    }).then (function (data) {
        textUpload(data);
    }).catch(function (error) {
        console.warn(error);
    })
}
// function that switches JSON files

fetch('./src/english.json')
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        imageUpload(data);
        textUpload(data);
    })
    .catch(function (err) {
        console.warn(err);
    });

// Loading page function

let imageUpload = (data) => {
    let hero = document.getElementById("hero");
    let img = document.createElement("img");
    img.src = data.hero_1_image;
    hero.appendChild(img);
}

let textUpload = (data) => {
    let heroTitles = document.getElementById("heroTitles");
    heroTitles.innerHTML = data.hero_1_title;

    let author = document.getElementById("author");
    author.innerHTML = data["article-info_1_byline"];

    let category = document.getElementById("category");
    category.innerHTML = data["article-info_1_category"];
    category.href = data["article-info_1_category_url"];

    let date = document.getElementById("date");
    date.innerHTML = data["article-info_1_date"];

    let compareTitle = document.getElementById("compareTitle");
    compareTitle.innerHTML = data["compare-tabs_1_title"];

    getParagraphs(data); 
    buttons(data);

    
}

// getParagraphs into separate object

const getParagraphs = (data) => {
    let x, 
    obj = {}, 
    count = 1;

    for (x in data) {
        const string = `p_`;
        const condition = x.toLowerCase().includes(string.toLowerCase());
        if (condition) {
            obj = { ...obj, [`p${count}`]: data[`${string}${count}_value`]};
            count++;
        }
    } 
    const a = document.getElementById("information");
    if (a.innerHTML.indexOf(`<li>`) != -1) {
        a.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            a.innerHTML += `<li>` + obj[`p${i}`] + `</li>`;
        }
    } else {
    for (let i = 1; i <= 5; i++) {
        a.innerHTML += `<li>` + obj[`p${i}`] + `</li>`;
    }
}
    // Parts 6 to 10 equation
    const b = document.getElementById("secondaryInformation");
    if (b.innerHTML.indexOf(`<li>`) != -1) {
        b.innerHTML = "";
        for (let i = 6; i <= 10; i++) {
            b.innerHTML += `<li>` + obj[`p${i}`] + `</li>`;
        }
    } else {
    for (let i = 6; i <= 10; i++) {
        b.innerHTML += `<li>` + obj[`p${i}`] + `</li>`;
                                  }
            }
}

const buttons = (data) => {
    let c, 
    count = 1;

    for (c in data) {
        const string = `compare-tabs_1_city_` + `${count}`,
        name = `_name`,
        cigg = `_cigg`,
        aqi = `_aqi`,

        condition = c.toLowerCase().includes(string.toLowerCase()),

        x = document.getElementById("compareButtons"),
        y = document.getElementById("compareResults");

        if (condition) {
            x.innerHTML += `<button class="city" onclick="result(` + `${count}` + `)">` + 
            data[`${string}`+`${name}`] + `</button>`;
            y.innerHTML += `<p id= result` + `${count}` + ` style="display: none">` + 
            data[`${string}`+`${cigg}`] + " cigarette(s) (" + data[`${string}`+`${aqi}`] + `)</p>`;
            count++;
        }
    }
}

const result = (id) => {
   let z = document.getElementById(`result${id}`);
   console.log(z.style.display);
    
    if (z.style.display === "none") {
        z.style.display = "block";
    } else {
        z.style.display = "none";
    }

}