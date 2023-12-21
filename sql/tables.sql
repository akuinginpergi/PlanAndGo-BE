-- CREATE DATABASE plan_and_go;

CREATE TABLE public."tiket_transportasi" (
	id VARCHAR(5) PRIMARY KEY,
	jenis_transportasi VARCHAR(50) NOT NULL,
	nama_transportasi VARCHAR(100) NOT NULL,
	titik_keberangkatan VARCHAR(100) NOT NULL,
	kelas VARCHAR(50) NOT NULL,
	titik_kedatangan VARCHAR(100) NOT NULL,
	kota_tiba VARCHAR(100) NOT NULL,
	jarak VARCHAR(5),
	harga BIGINT CHECK(harga >= 0)
);

CREATE TABLE public."hotel" (
	nama_hotel VARCHAR(150) NOT NULL,
	rating REAL,
	bintang VARCHAR(100),
	harga INTEGER  CHECK(harga >= 0) NOT NULL,
	alamat TEXT,
	gambar TEXT,
	jenis_harga VARCHAR(30),
	id VARCHAR(5) PRIMARY KEY
);

CREATE TABLE public."tiket_wisata" (
	id VARCHAR(5) PRIMARY KEY,
	nama_wisata VARCHAR(100) NOT NULL,
	deskripsi TEXT NOT NULL,
	kategori VARCHAR(100) NOT NULL,
	lokasi_wisata VARCHAR(100) NOT NULL,
	harga INTEGER  CHECK(harga >= 0),
	rating REAL, 
	time_minutes VARCHAR(3),
	koordinat TEXT,
	lat VARCHAR(30),
	long VARCHAR(30),
	gambar VARCHAR(255)
);

	
CREATE TABLE public."pesananku" (
	id VARCHAR(10) PRIMARY KEY,
	tiket_keberangkatan VARCHAR(5) ,
	tiket_kedatangan VARCHAR(5),
	hotel VARCHAR(5),
	kota_asal VARCHAR(100)NOT NULL,
	kota_tujuan VARCHAR(100)NOT NULL,
	tanggal_berangkat DATE NOT NULL,
	tanggal_pulang DATE NOT NULL,
	dana INTEGER NOT NULL,
	tema VARCHAR(100) NOT NULL
);

CREATE TABLE public."pesanan_wisata" (
	id VARCHAR(10) PRIMARY KEY,
	tiket_wisata VARCHAR(5),
	pesananku VARCHAR(10),
	CONSTRAINT fk_wisata_pesanan FOREIGN KEY (tiket_wisata) REFERENCES tiket_wisata(id),
	CONSTRAINT fk_pesanan_wisata FOREIGN KEY (pesananku) REFERENCES pesananku(id)
);