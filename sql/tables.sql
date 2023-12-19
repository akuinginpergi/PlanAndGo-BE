-- CREATE DATABASE plan_and_go;

CREATE TABLE public."tiket_ka" (
	id VARCHAR(255) PRIMARY KEY,
	nama_kereta VARCHAR(100) NOT NULL,
	stasiun_keberangkatan VARCHAR(100) NOT NULL,
	stasiun_kedatangan VARCHAR(100) NOT NULL,
	nomor_kereta VARCHAR(3) NOT NULL,
	kelas VARCHAR(50) NOT NULL,
	sub_class VARCHAR(5),
	tanggal_berangkat TIMESTAMP,
	tanggal_tiba TIMESTAMP,
	harga INTEGER  CHECK(harga >= 0)
);

CREATE TABLE public."tiket_pesawat" (
	id VARCHAR(255) PRIMARY KEY,
	nama_maskapai VARCHAR(100) ,
	bandara_keberangkatan VARCHAR(100) NOT NULL,
	bandara_kedatangan VARCHAR(100) NOT NULL,
	kode_maskapai VARCHAR(3),
	nomor_maskapai VARCHAR(3),
	kelas VARCHAR(50) NOT NULL,
	tanggal_berangkat TIMESTAMP,
	tanggal_tiba TIMESTAMP,
	harga INTEGER  CHECK(harga >= 0)
);

CREATE TABLE public."hotel" (
	id VARCHAR(255) PRIMARY KEY,
	nama_hotel VARCHAR(100) NOT NULL,
	lokasi_hotel VARCHAR(100) NOT NULL,
	jenis_kamar VARCHAR(100) NOT NULL,
	tanggal_check_in TIMESTAMP NOT NULL,
	tanggal_check_out TIMESTAMP NOT NULL,
	harga INTEGER  CHECK(harga >= 0) NOT NULL
);

CREATE TABLE public."tiket_wisata" (
	id VARCHAR(255) PRIMARY KEY,
	nama_wisata VARCHAR(100) NOT NULL,
	lokasi_wisata VARCHAR(100) NOT NULL,
	harga INTEGER  CHECK(harga >= 0)
);

CREATE TABLE public."pesananku" (
	id VARCHAR(255) PRIMARY KEY,
	tiket_ka_keberangkatan INTEGER ,
	tiket_ka_kedatangan INTEGER ,
	tiket_pesawat_berangkat INTEGER ,
	tiket_pesawat_pulang INTEGER ,
	kota_asal VARCHAR(100)NOT NULL,
	kota_tujuan VARCHAR(100)NOT NULL,
	tanggal_berangkat DATE NOT NULL,
	tanggal_pulang DATE NOT NULL,
	dana INTEGER NOT NULL,
	tema VARCHAR(100) NOT NULL
);

CREATE TABLE public."pesananku_temp" (
	id VARCHAR(255) PRIMARY KEY,
	tiket_ka_keberangkatan INTEGER ,
	tiket_ka_kedatangan INTEGER ,
	tiket_pesawat_berangkat INTEGER ,
	tiket_pesawat_pulang INTEGER ,
	kota_asal VARCHAR(100) NOT NULL,
	kota_tujuan VARCHAR(100)NOT NULL,
	tanggal_berangkat DATE NOT NULL,
	tanggal_pulang DATE NOT NULL,
	dana INTEGER NOT NULL,
	tema VARCHAR(100) NOT NULL
);

CREATE TABLE pesanan_wisata (
	id VARCHAR(255) PRIMARY KEY,
	tiket_wisata VARCHAR(255),
	pesananku VARCHAR(255),
	CONSTRAINT fk_wisata_pesanan FOREIGN KEY (tiket_wisata) REFERENCES tiket_wisata(id),
	CONSTRAINT fk_pesanan_wisata FOREIGN KEY (pesananku) REFERENCES pesananku(id)
);