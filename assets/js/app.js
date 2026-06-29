var TARGET_DANA = 30800000;
var dataContoh = [{nama: "Hamba Allah", tanggal: "29 Juni 2026", nominal: 100000}];
function formatRupiah(n) {return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", maximumFractionDigits: 0}).format(n);}
function updateProgress(t) {var p = document.getElementById("progressFill"); var tk = document.getElementById("terkumpul"); var s = document.getElementById("sisa"); if (!p || !tk || !s) return; var persen = Math.min((t / TARGET_DANA) * 100, 100); tk.innerHTML = formatRupiah(t); s.innerHTML = formatRupiah(TARGET_DANA - t); p.style.width = persen + "%"; p.innerHTML = persen.toFixed(1) + "%";}
function displayDonatur(d) {var dt = document.getElementById("donaturTable"); if (!dt) return; var html = ""; var total = 0; var jml = 0; for (var i = 0; i < d.length; i++) {var nom = parseInt(String(d[i].nominal).replace(/[^0-9]/g, "")) || 0; if (nom > 0) {total += nom; jml++; html += "<tr><td>" + d[i].nama + "</td><td>" + d[i].tanggal + "</td><td>" + formatRupiah(nom) + "</td></tr>";}} if (html === "") html = "<tr><td colspan='3'>Belum ada data</td></tr>"; dt.innerHTML = html; updateProgress(total);}
function init() {displayDonatur(dataContoh);}
if (document.readyState === "loading") {document.addEventListener("DOMContentLoaded", init);} else {init();}
