CREATE DATABASE plan_and_go;

CREATE TABLE public."tiket_ka" (
	id INTEGER PRIMARY KEY,
	nama_kereta VARCHAR(100) NOT NULL,
	stasiun_keberangkatan VARCHAR(100) NOT NULL,
	stasiun_kedatangan VARCHAR(100) NOT NULL,
	nomor_kereta VARCHAR(3) NOT NULL,
	kelas VARCHAR(50) NOT NULL,
	sub_class VARCHAR(5),
	tanggal_berangkat TIMESTAMP,
	tanggal_tiba TIMESTAMP,
	harga INTEGER NOT NULL CHECK(harga >= 0)
);

CREATE TABLE public."tiket_pesawat" (
	id INTEGER PRIMARY KEY,
	nama_maskapai VARCHAR(100) NOT NULL,
	bandara_keberangkatan VARCHAR(100) NOT NULL,
	bandara_kedatangan VARCHAR(100) NOT NULL,
	kode_maskapai VARCHAR(3),
	nomor_maskapai VARCHAR(3),
	kelas VARCHAR(50) NOT NULL,
	tanggal_berangkat TIMESTAMP,
	tanggal_tiba TIMESTAMP,
	harga INTEGER NOT NULL CHECK(harga >= 0)
);

CREATE TABLE public."hotel" (
	id INTEGER PRIMARY KEY,
	nama_hotel VARCHAR(100) NOT NULL,
	lokasi_hotel VARCHAR(100) NOT NULL,
	jenis_kamar VARCHAR(100),
	tanggal_check_in TIMESTAMP,
	tanggal_check_out TIMESTAMP,
	harga INTEGER NOT NULL CHECK(harga >= 0)
);

CREATE TABLE public."tiket_wisata" (
	id INTEGER PRIMARY KEY,
	nama_wisata VARCHAR(100) NOT NULL,
	lokasi_wisata VARCHAR(100) NOT NULL,
	harga INTEGER NOT NULL CHECK(harga >= 0)
);

CREATE TABLE public."pesananku" (
	id INTEGER PRIMARY KEY,
	tiket_ka_keberangkatan INTEGER NOT NULL,
	tiket_ka_kedatangan INTEGER NOT NULL,
	tiket_pesawat_berangkat INTEGER NOT NULL,
	tiket_pesawat_pulang INTEGER NOT NULL,
	kota_asal VARCHAR(100),
	kota_tujuan VARCHAR(100),
	tanggal_berangkat TIMESTAMP,
	tanggal_pulang TIMESTAMP
);

CREATE TABLE public."pesananku_temp" (
	id INTEGER PRIMARY KEY,
	tiket_ka_keberangkatan INTEGER NOT NULL,
	tiket_ka_kedatangan INTEGER NOT NULL,
	tiket_pesawat_berangkat INTEGER NOT NULL,
	tiket_pesawat_pulang INTEGER NOT NULL,
	kota_asal VARCHAR(100),
	kota_tujuan VARCHAR(100),
	tanggal_berangkat TIMESTAMP,
	tanggal_pulang TIMESTAMP
);

CREATE TABLE pesanan_wisata (
	id INTEGER PRIMARY KEY,
	tiket_wisata INTEGER,
	pesananku INTEGER,
	CONSTRAINT fk_wisata_pesanan FOREIGN KEY (tiket_wisata) REFERENCES tiket_wisata(id),
	CONSTRAINT fk_pesanan_wisata FOREIGN KEY (pesananku) REFERENCES pesananku(id)
);