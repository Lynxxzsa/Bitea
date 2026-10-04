/* =========================
   JAM DAN TANGGAL
========================= */

function updateDateTime() {

    const now = new Date();


    /* =========================
       FORMAT TANGGAL
    ========================= */

    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };


    const formattedDate =
        now.toLocaleDateString(
            "id-ID",
            dateOptions
        );


    document.getElementById(
        "currentDate"
    ).textContent = formattedDate;


    /* =========================
       FORMAT JAM
    ========================= */

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    document.getElementById(
        "currentTime"
    ).textContent =
        `${hours}:${minutes}:${seconds} WIB`;

}


/* =========================
   UPDATE SETIAP 1 DETIK
========================= */

updateDateTime();

setInterval(
    updateDateTime,
    1000
);


/* =========================
   KONTROL PRODUK
========================= */

const switches =
    document.querySelectorAll(
        ".switch input"
    );


switches.forEach(
    function (switchInput) {

        switchInput.addEventListener(
            "change",
            function () {

                const controlItem =
                    switchInput.closest(
                        ".control-item"
                    );


                const status =
                    controlItem.querySelector(
                        ".available, .unavailable"
                    );


                if (switchInput.checked) {

                    status.textContent =
                        "Tersedia";

                    status.className =
                        "available";

                } else {

                    status.textContent =
                        "Tidak Tersedia";

                    status.className =
                        "unavailable";

                }

            }
        );

    }
);