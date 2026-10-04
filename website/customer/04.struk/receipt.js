
document.addEventListener(
    "DOMContentLoaded",
    function () {


        const printButton =
            document.getElementById(
                "printButton"
            );


        const downloadButton =
            document.getElementById(
                "downloadButton"
            );


        /*
         * CETAK STRUK
         *
         * Browser akan membuka
         * menu Print.
         *
         * Customer bisa memilih
         * "Save as PDF".
         */

        printButton.addEventListener(
            "click",
            function () {

                window.print();

            }
        );


        /*
         * DOWNLOAD
         *
         * Untuk sementara kita
         * arahkan ke Print.
         *
         * Nanti setelah Laravel
         * dibuat, tombol ini bisa
         * menghasilkan PDF asli
         * dari server.
         */

        downloadButton.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }
);
