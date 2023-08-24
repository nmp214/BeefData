class Category {
    name;
    colorCode;
    colorRgb;

    constructor(name, colorCode, colorRgb) {
        this.name = name;
        this.colorCode = colorCode;
        this.colorRgb = colorRgb;
    }
}

const kosher = document.getElementById("kosher");
const chalak = document.getElementById("chalak");
const taref = document.getElementById("taref");
const end = document.getElementById("end");
const date = document.getElementById("date");
const numberOfCows = document.getElementById("numberOfCows");
const firstCowId = document.getElementById("firstCowId");
const table = document.getElementById("cowTable");
const warning = document.getElementById("warning");
let numbers = document.getElementsByTagName("td");
const categories = [new Category('chalak', '#FA2E2E', 'rgb(250, 46, 46)'), new Category('kosher', '#3282F6', 'rgb(50, 130, 246)'), new Category('taref', '#43A843', 'rgb(67, 168, 67)')];
const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
let selectedCategiry = null;
let chalakArray = [];
let kosherArray = [];
let tarefArray = [];
var koshers = [];
var chalaks = [];
var tarefs = [];

numberOfCows.value = 100;
firstCowId.value = 1;

if (date.value === '') {
    end.disabled = true;
    warning.innerHTML = 'לא עודכן תאריך';
}

var event = new Event('keyup');
numberOfCows.dispatchEvent(event);

date.addEventListener("change", function () {
    end.disabled = false;
    warning.innerHTML = '';
});

numberOfCows.addEventListener("keyup", function () {
    changeNumberOfCows();
    // let id = firstCowId.value;
    // console.log("numberOfCows: ", numberOfCows.value);
    // while (table.firstChild) {
    //     table.removeChild(table.firstChild);
    // }
    // for (let index = 0; index < Math.ceil(numberOfCows.value / 10); index++) {
    //     const tr = document.createElement("tr");
    //     table.appendChild(tr);
    //     for (let index2 = index * 10; index2 < index * 10 + 10; index2++) {
    //         if (index2 < numberOfCows.value) {
    //             const td = document.createElement("td");
    //             if (firstCowId) {
    //                 td.innerHTML = id;
    //                 id++;
    //             }
    //             else
    //                 td.innerHTML = index2 + 1;
    //             tr.appendChild(td);
    //         }
    //     }
    // }
    // numbers = document.getElementsByTagName("td");
    // numberClicks();
});

firstCowId.addEventListener("keyup", function () {
    console.log("numbers in firstId changes: ", numbers);
    console.log("firstCowId: " + firstCowId.value);
    let indexId = firstCowId.value;
    for (let index = 0; index < numbers.length; index++) {
        numbers[index].innerHTML = indexId;
        indexId++;
    }
    numbers = document.getElementsByTagName("td");
    numberClicks();
});

end.onclick = () => {
    for (let index = 0; index < numbers.length; index++) {
        if (numbers[index].style.backgroundColor === categories[0].colorRgb)
            chalakArray.push(numbers[index].innerHTML);
        if (numbers[index].style.backgroundColor === categories[1].colorRgb)
            kosherArray.push(numbers[index].innerHTML);
        if (numbers[index].style.backgroundColor === categories[2].colorRgb)
            tarefArray.push(numbers[index].innerHTML);
    }

    let array = [];
    let tempIndex = 0;

    for (let index = 0; index < Math.ceil(chalakArray.length / 10) + 1; index++) {
        tempIndex = index * 10;
        for (let index2 = index * 10; index2 < tempIndex + 10; index2++) {
            console.log("index2: " + index2);
            if (index2 >= chalakArray.length)
                break;
            else
                array.push(chalakArray[index2]);
        }
        chalaks.push(array);
        array = [];
    }
    if (chalaks.length < 2)
        chalaks.push([]);

    for (let index = 0; index < Math.ceil(kosherArray.length / 10) + 1; index++) {
        tempIndex = index * 10;
        for (let index2 = index * 10; index2 < tempIndex + 10; index2++) {
            console.log("index2: " + index2);
            if (index2 >= kosherArray.length)
                break;
            else
                array.push(kosherArray[index2]);
        }
        koshers.push(array);
        array = [];
    }
    if (koshers.length < 2)
        koshers.push([]);

    for (let index = 0; index < Math.ceil(tarefArray.length / 10) + 1; index++) {
        tempIndex = index * 10;
        for (let index2 = index * 10; index2 < tempIndex + 10; index2++) {
            console.log("index2: " + index2);
            if (index2 >= tarefArray.length)
                break;
            else
                array.push(tarefArray[index2]);
        }
        tarefs.push(array);
        array = [];
    }
    if (tarefs.length < 2)
        tarefs.push([]);
    console.log("before whiles");
    console.log(chalaks);
    while (chalaks[chalaks.length - 1].length < 10)
        chalaks[chalaks.length - 1].push('');
    while (chalaks[chalaks.length - 2].length < 10)
        chalaks[chalaks.length - 2].push('');
    while (koshers[koshers.length - 1].length < 10)
        koshers[koshers.length - 1].push('');
    while (koshers[koshers.length - 2].length < 10)
        koshers[koshers.length - 2].push('');
    while (tarefs[tarefs.length - 1].length < 10)
        tarefs[tarefs.length - 1].push('');
    while (tarefs[tarefs.length - 2].length < 10)
        tarefs[tarefs.length - 2].push('');

    console.log("after whiles");
    var dateObject = new Date(date.value);
    var dayIndex = dateObject.getDay();
    chalaks[0].push('');
    chalaks[0].push(date.value);
    chalaks[0].push("תאריך:");
    chalaks[1].push('');
    chalaks[1].push(daysOfWeek[dayIndex]);
    chalaks[1].push("יום:");
    koshers[0].push('');
    koshers[0].push(date.value);
    koshers[0].push("תאריך:");
    koshers[1].push('');
    koshers[1].push(daysOfWeek[dayIndex]);
    koshers[1].push("יום:");
    tarefs[0].push('');
    tarefs[0].push(date.value);
    tarefs[0].push("תאריך:");
    tarefs[1].push('');
    tarefs[1].push(daysOfWeek[dayIndex]);
    tarefs[1].push("יום:");

    console.log("after dates");
    var wb = XLSX.utils.book_new();
    var wsChalak = XLSX.utils.aoa_to_sheet(chalaks)
    var wsKosher = XLSX.utils.aoa_to_sheet(koshers);
    var wsTaref = XLSX.utils.aoa_to_sheet(tarefs);
    XLSX.utils.book_append_sheet(wb, wsChalak, "חלק");
    XLSX.utils.book_append_sheet(wb, wsKosher, "כשר");
    XLSX.utils.book_append_sheet(wb, wsTaref, "טרף");

    var blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    var downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'נתוני שחיטה.xlsx';
    downloadLink.click();
}

chalak.onclick = () => {
    console.log("numbers in chalakClick: ", numbers);
    selectedCategiry = categories[0].name;
    chalak.style.borderWidth = '5px';
    chalak.style.borderColor = '#E6A0B4';
    chalak.style.borderStyle = 'solid';
    chalak.style.borderRadius = '50%';

    kosher.style.borderWidth = '0px';
    taref.style.borderWidth = '0px';
}

kosher.onclick = () => {
    selectedCategiry = categories[1].name;
    kosher.style.borderWidth = '5px';
    kosher.style.borderColor = '#7DB2F6';
    kosher.style.borderStyle = 'solid';
    kosher.style.borderRadius = '50%';

    chalak.style.borderWidth = '0px';
    taref.style.borderWidth = '0px';
}

taref.onclick = () => {
    selectedCategiry = categories[2].name;
    taref.style.borderWidth = '5px';
    taref.style.borderColor = '#7FCF7D';
    taref.style.borderStyle = 'solid';
    taref.style.borderRadius = '50%';

    kosher.style.borderWidth = '0px';
    chalak.style.borderWidth = '0px';
}

const numberClicks = () => {
    for (let index = 0; index < numbers.length; index++) {
        console.log(index);
        numbers[index].onclick = () => {
            console.log(numbers[index]);
            numbers[index].style.borderRadius = '50%';
            if (selectedCategiry === categories[0].name)
                numbers[index].style.backgroundColor = categories[0].colorCode;
            if (selectedCategiry === categories[1].name)
                numbers[index].style.backgroundColor = categories[1].colorCode;
            if (selectedCategiry === categories[2].name)
                numbers[index].style.backgroundColor = categories[2].colorCode;
        }
    }
}

const changeNumberOfCows = () => {
    let id = firstCowId.value;
    console.log("numberOfCows: ", numberOfCows.value);
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let index = 0; index < Math.ceil(numberOfCows.value / 10); index++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (let index2 = index * 10; index2 < index * 10 + 10; index2++) {
            if (index2 < numberOfCows.value) {
                const td = document.createElement("td");
                if (firstCowId) {
                    td.innerHTML = id;
                    id++;
                }
                else
                    td.innerHTML = index2 + 1;
                tr.appendChild(td);
            }
        }
    }
    numbers = document.getElementsByTagName("td");
    numberClicks();
}

changeNumberOfCows();

// #43A843 ירוק
// #3282F6 כחול
// ##FA2E2E אדום
// #FA2E2E