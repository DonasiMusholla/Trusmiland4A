const TARGET_DANA = 30800000;

const csvUrl =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSTo4aYtAi1-rc_qgQP9ahWk7GTU_HSnspxXTx70fm8LH2BYPFe-s7mz5eda2saUbjb7lEQQ3X_hsfl/pub?output=csv";

function formatRupiah(angka) {
return new Intl.NumberFormat("id-ID", {
style: "currency",
currency: "IDR",
maximumFractionDigits: 0
}).format(angka);
}

function updateProgress(total) {

```
const persen = Math.min(
    (total / TARGET_DANA) * 100,
    100
);

document.getElementById("terkumpul").innerHTML =
    formatRupiah(total);

document.getElementById("sisa").innerHTML =
    formatRupiah(TARGET_DANA - total);

const progressBar =
    document.getElementById("progressFill");

progressBar.style.width = persen + "%";
progressBar.innerHTML =
    persen.toFixed(1) + "%";
```

}

fetch(csvUrl)
.then(response => response.text())
.then(data => {

```
const rows = data.trim().split("\n");

let html = "";
let totalDonasi = 0;
let jumlahDonatur = 0;

rows.slice(1).forEach(row => {

    const cols = row.split(",");

    if (cols.length >= 3) {

        const nama =
            cols[0].replace(/"/g, "");

        const tanggal =
            cols[1].replace(/"/g, "");

        const nominal =
            parseInt(cols[2].replace(/[^0-9]/g, "")) || 0;

        totalDonasi += nominal;
        jumlahDonatur++;

        html += `
        <tr>
            <td>${nama}</td>
            <td>${tanggal}</td>
            <td>${formatRupiah(nominal)}</td>
        </tr>`;
    }
});

if (html === "") {
    html = `
    <tr>
        <td colspan="3">
            Belum ada data donatur
        </td>
    </tr>`;
}

document.getElementById("donaturTable").innerHTML =
    html;

if(document.getElementById("jumlahDonatur")){
    document.getElementById("jumlahDonatur").innerHTML =
        jumlahDonatur;
}

updateProgress(totalDonasi);
```

})
.catch(error => {

```
console.error(error);

document.getElementById("donaturTable").innerHTML =
`
<tr>
    <td colspan="3">
        Gagal memuat data donatur
    </td>
</tr>
`;
```

});
