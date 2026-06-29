const TARGET_DANA = 30800000;

// Data contoh langsung di code (jangan fetch Google Sheets dulu)
const dataContoh = [
    { nama: "Hamba Allah", tanggal: "29 Juni 2026", nominal: 100000 }
];

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

function updateProgress(total) {
    const progressBar = document.getElementById("progressFill");
    const terkumpul = document.getElementById("terkumpul");
    const sisa = document.getElementById("sisa");
    
    if (!progressBar || !terkumpul || !sisa) {
        console.error("❌ Element tidak ditemukan!");
        return;
    }
    
    const persen = Math.min((total / TARGET_DANA) * 100, 100);
    terkumpul.innerHTML = formatRupiah(total);
    sisa.innerHTML = formatRupiah(TARGET_DANA - total);
    progressBar.style.width = persen + "%";
    progressBar.innerHTML = persen.toFixed(1) + "%";
    
    console.log("✅ Progress updated: " + persen.toFixed(1) + "%");
}

function displayDonatur(donaturList) {
    const donaturTable = document.getElementById("donaturTable");
    
    if (!donaturTable) {
        console.error("❌ Element #donaturTable tidak ditemukan!");
        return;
    }
    
    let html = "";
    let totalDonasi = 0;
    let jumlahDonatur = 0;

    donaturList.forEach(function(donatur) {
        const nominal = parseInt(String(donatur.nominal).replace(/[^0-9]/g, "")) || 0;
        
        if (nominal > 0) {
            totalDonasi += nominal;
            jumlahDonatur++;
            html += "<tr><td>" + donatur.nama + "</td><td>" + donatur.tanggal + "</td><td>" + formatRupiah(nominal) + "</td></tr>";
        }
    });

    if (html === "") {
        html = "<tr><td colspan='3'>Belum ada data donatur</td></tr>";
    }

    donaturTable.innerHTML = html;
    console.log("✅ Donatur ditampilkan: " + jumlahDonatur + " donatur");
    
    updateProgress(totalDonasi);
}

function initApp() {
    console.log("🔄 Aplikasi dimulai...");
    
    // Tampilkan data contoh langsung
    displayDonatur(dataContoh);
    
    console.log("✅ Selesai!");
}

// Tunggu DOM ready
if (document.readyState === 'loading') {
    console.log("⏳ Menunggu DOM...");
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    console.log("✅ DOM siap");
    initApp();
}
