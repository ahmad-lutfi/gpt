import React, { useState } from "react";

// Undangan-Perkahwinan-Web.jsx
// Single-file React component (default export).
// Tailwind CSS assumed available in the project.
// Uses simple client-side RSVP (stores to localStorage) and mailto fallback.
// Customize: GANTI nilai dalam `meta` untuk nama, tarikh, lokasi, gambar, dsb.

const meta = {
  namaPengantinA: "Aisyah",
  namaPengantinB: "Hafiz",
  tarikh: "Sabtu, 18 Oktober 2025",
  masa: "10:00 pagi",
  lokasiNama: "Dewan Seri Indah",
  lokasiAlamat: "Jalan Bunga Raya 12, Kuala Lumpur",
  coverImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=60",
  gallery: [
    "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=60"
  ],
  mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.123456789012!2d101.6869!3d3.1390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
};

export default function UndanganPerkahwinan() {
  const [rsvp, setRsvp] = useState({ nama: "", hadir: "Ya", orang: 1, ucapan: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setRsvp((s) => ({ ...s, [name]: value }));
  }

  function submitRSVP(e) {
    e.preventDefault();
    // Simpan ke localStorage untuk demo; dalam produksi sambungkan ke API / Google Sheet.
    const daftar = JSON.parse(localStorage.getItem("rsvpList")) || [];
    daftar.push({ ...rsvp, waktu: new Date().toISOString() });
    localStorage.setItem("rsvpList", JSON.stringify(daftar));
    setSent(true);

    // fallback: buka mailto untuk penghantaran ke email tuan rumah
    const subject = encodeURIComponent(`RSVP: ${rsvp.nama || "Tetamu"} untuk ${meta.namaPengantinA} & ${meta.namaPengantinB}`);
    const body = encodeURIComponent(
      `Nama: ${rsvp.nama}\nHadir: ${rsvp.hadir}\nBilangan: ${rsvp.orang}\nUcapan: ${rsvp.ucapan}`
    );
    const mailto = `mailto:example@domain.com?subject=${subject}&body=${body}`;
    // buka mailto selepas 700ms supaya pengguna nampak mesej 'Terima kasih'
    setTimeout(() => window.location.href = mailto, 700);
  }

  function downloadInvite() {
    // Buat halaman yang boleh cetak — buka tetingkap baru dan print
    const html = `
      <html><head><title>Undangan - ${meta.namaPengantinA} & ${meta.namaPengantinB}</title>
      <style>body{font-family:sans-serif;padding:20px} h1{font-size:28px} .muted{color:#666}</style></head>
      <body>
        <h1>Undangan Perkahwinan</h1>
        <p><strong>${meta.namaPengantinA}</strong> & <strong>${meta.namaPengantinB}</strong></p>
        <p>${meta.tarikh} — ${meta.masa}</p>
        <p>${meta.lokasiNama}</p>
        <p class="muted">${meta.lokasiAlamat}</p>
      </body></html>`;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.print();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800">
      <header className="relative">
        <img src={meta.coverImage} alt="cover" className="w-full h-72 object-cover opacity-95" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-serif">{meta.namaPengantinA} & {meta.namaPengantinB}</h1>
            <p className="mt-2 text-lg">{meta.tarikh} • {meta.masa}</p>
            <p className="mt-1">{meta.lokasiNama}</p>
            <div className="mt-4 flex gap-3 justify-center">
              <button onClick={() => document.getElementById('rsvp-form')?.scrollIntoView({behavior:'smooth'})} className="bg-white/90 text-pink-600 px-4 py-2 rounded-lg shadow">RSVP</button>
              <button onClick={downloadInvite} className="bg-transparent border border-white/60 text-white px-4 py-2 rounded-lg">Cetak / Simpan</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold">Cerita Kami</h2>
          <p className="mt-3 text-gray-600">Kami berdua menjemput anda untuk meraikan hari bersejarah ini bersama. Sila hadir mengikut butiran di bawah — kehadiran anda bermakna dunia kepada kami.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-medium">Butiran Majlis</h3>
            <p className="mt-2">Tarikh: <strong>{meta.tarikh}</strong></p>
            <p>Masa: <strong>{meta.masa}</strong></p>
            <p>Tempat: <strong>{meta.lokasiNama}</strong></p>
            <p className="mt-2 text-sm text-gray-500">Alamat: {meta.lokasiAlamat}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-medium">Jadual Ringkas</h3>
            <ul className="mt-2 text-gray-600 space-y-2">
              <li>10:00 — Akad Nikah</li>
              <li>11:30 — Bersalaman & Jamuan</li>
              <li>2:00 — Sesi Bergambar</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-medium">Galeri</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {meta.gallery.map((src, i) => (
              <img key={i} src={src} alt={`galeri-${i}`} className="w-full h-40 object-cover rounded-lg shadow-sm" />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-medium">Lokasi</h3>
          <p className="mt-2 text-gray-600">{meta.lokasiNama} — {meta.lokasiAlamat}</p>
          <div className="mt-4 w-full h-64 rounded overflow-hidden">
            <iframe
              title="map"
              src={meta.mapEmbedSrc}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </section>

        <section id="rsvp-form" className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-medium">RSVP</h3>
          {!sent ? (
            <form onSubmit={submitRSVP} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium">Nama</label>
                <input name="nama" value={rsvp.nama} onChange={handleChange} required className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Akan Hadir?</label>
                <select name="hadir" value={rsvp.hadir} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2">
                  <option>Ya</option>
                  <option>Tidak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Bilangan Orang</label>
                <input type="number" min={1} name="orang" value={rsvp.orang} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium">Ucapan / Catatan</label>
                <textarea name="ucapan" value={rsvp.ucapan} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div className="col-span-2 flex gap-3">
                <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">Hantar RSVP</button>
                <button type="button" onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Link jemputan disalin'); }} className="border px-4 py-2 rounded">Salin Pautan</button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-green-50 rounded">Terima kasih! Kami akan menghubungi anda jika perlu. Sebuah email akan dibuka untuk pengesahan (atau jika tidak, sila emel kami ke example@domain.com).</div>
          )}
        </section>

        <footer className="text-center text-sm text-gray-500 py-8">Dibuat dengan kasih oleh pasangan: {meta.namaPengantinA} & {meta.namaPengantinB}</footer>
      </main>
    </div>
  );
}
