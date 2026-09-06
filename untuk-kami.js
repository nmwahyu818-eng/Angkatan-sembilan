// =============================================
// GARDAMAS - UNTUK KAMI
// FIREBASE FIRESTORE
// =============================================


// =============================================
// IMPORT FIREBASE
// =============================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


import {

    getFirestore,

    collection,

    addDoc,

    onSnapshot,

    serverTimestamp

} from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// =============================================
// FIREBASE CONFIG
// =============================================

const firebaseConfig = {

    apiKey:
        "AIzaSyCj2CLupx3oNLs4Bc0nmfFAAgRmjklc5xc",

    authDomain:
        "gardamas-76de0.firebaseapp.com",

    projectId:
        "gardamas-76de0",

    storageBucket:
        "gardamas-76de0.firebasestorage.app",

    messagingSenderId:
        "788861812748",

    appId:
        "1:788861812748:web:1b44bdf8f244eac1d72e29",

    measurementId:
        "G-GQWSJFFSLG"

};


// =============================================
// INITIALIZE FIREBASE
// =============================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// =============================================
// AMBIL ELEMENT HTML
// =============================================

const form =
    document.getElementById("messageForm");


const nameInput =
    document.getElementById("nameInput");


const messageInput =
    document.getElementById("messageInput");


const messageList =
    document.getElementById("messageList");


const submitButton =
    document.getElementById("submitButton");


const buttonText =
    document.getElementById("buttonText");


const characterCount =
    document.getElementById("characterCount");


const notification =
    document.getElementById("notification");


const notificationText =
    document.getElementById("notificationText");


// =============================================
// CHARACTER COUNTER
// =============================================

messageInput.addEventListener("input", () => {

    const total =
        messageInput.value.length;


    characterCount.textContent =
        total;

});


// =============================================
// NOTIFICATION FUNCTION
// =============================================

function showNotification(message) {

    notificationText.textContent =
        message;


    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove("show");

    }, 3500);

}


// =============================================
// KIRIM PESAN
// =============================================

form.addEventListener(
    "submit",

    async (event) => {

        // MENCEGAH HALAMAN REFRESH

        event.preventDefault();


        // AMBIL DATA

        const nama =
            nameInput.value.trim();


        const pesan =
            messageInput.value.trim();


        // VALIDASI

        if (nama.length === 0) {

            showNotification(
                "Silakan isi nama terlebih dahulu."
            );

            return;

        }


        if (pesan.length === 0) {

            showNotification(
                "Silakan tulis pesan terlebih dahulu."
            );

            return;

        }


        try {


            // UBAH TOMBOL

            submitButton.disabled =
                true;


            buttonText.textContent =
                "Mengirim...";


            // =================================
            // KIRIM KE FIRESTORE
            // =================================

            await addDoc(

                collection(
                    db,
                    "pesanUntukKami"
                ),

                {

                    nama:
                        nama,

                    pesan:
                        pesan,

                    waktu:
                        serverTimestamp(),

                    dibuatPada:
                        new Date().toISOString()

                }

            );


            // =================================
            // RESET FORM
            // =================================

            form.reset();


            characterCount.textContent =
                "0";


            showNotification(
                "Pesan berhasil dikirim 🤍"
            );


        } catch (error) {


            console.error(
                "FIREBASE ERROR:",
                error
            );


            showNotification(
                "Pesan gagal dikirim. Coba lagi."
            );


        } finally {


            submitButton.disabled =
                false;


            buttonText.textContent =
                "Kirim Pesan";

        }

    }

);


// =============================================
// TAMPILKAN PESAN REALTIME
// =============================================

const pesanCollection =
    collection(
        db,
        "pesanUntukKami"
    );


// LISTEN REALTIME

onSnapshot(

    pesanCollection,


    (snapshot) => {


        // KOSONGKAN LIST

        messageList.innerHTML = "";


        // JIKA BELUM ADA PESAN

        if (snapshot.empty) {


            messageList.innerHTML = `

                <div class="empty-message">

                    Belum ada pesan yang ditinggalkan.

                    <br><br>

                    Jadilah yang pertama
                    menulis sesuatu untuk kami.

                </div>

            `;


            return;

        }


        // SIMPAN DATA KE ARRAY

        const messages = [];


        snapshot.forEach((doc) => {


            const data =
                doc.data();


            messages.push({

                id:
                    doc.id,

                ...data

            });

        });


        // URUTKAN BERDASARKAN WAKTU

        messages.sort((a, b) => {


            const timeA =
                a.dibuatPada || "";


            const timeB =
                b.dibuatPada || "";


            return timeB.localeCompare(
                timeA
            );

        });


        // TAMPILKAN PESAN

        messages.forEach((data) => {


            createMessageCard(data);

        });

    },


    (error) => {


        console.error(
            "GAGAL MEMUAT PESAN:",
            error
        );


        messageList.innerHTML = `

            <div class="empty-message">

                Gagal memuat pesan.

                <br><br>

                Pastikan koneksi internet
                dan Firebase Rules sudah benar.

            </div>

        `;

    }

);


// =============================================
// BUAT MESSAGE CARD
// =============================================

function createMessageCard(data) {


    const card =
        document.createElement("article");


    card.className =
        "message-card";


    // NAMA

    const name =
        document.createElement("div");


    name.className =
        "message-name";


    name.textContent =
        data.nama || "Anonim";


    // PESAN

    const text =
        document.createElement("div");


    text.className =
        "message-text";


    text.textContent =
        data.pesan || "";


    // TANGGAL

    const date =
        document.createElement("div");


    date.className =
        "message-date";


    if (data.dibuatPada) {


        const tanggal =
            new Date(data.dibuatPada);


        date.textContent =
            formatDate(tanggal);

    }


    // MASUKKAN KE CARD

    card.appendChild(name);

    card.appendChild(text);

    card.appendChild(date);


    // MASUKKAN KE LIST

    messageList.appendChild(card);

}


// =============================================
// FORMAT TANGGAL
// =============================================

function formatDate(date) {


    return date.toLocaleDateString(

        "id-ID",

        {

            day:
                "numeric",

            month:
                "long",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"

        }

    );

}