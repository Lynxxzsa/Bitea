document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENT
    ========================== */

    const typeButtons =
        document.querySelectorAll(".type-btn");

    const classGroup =
        document.getElementById("classGroup");

    const otherGroup =
        document.getElementById("otherGroup");

    const kelas =
        document.getElementById("kelas");


    const paymentCards =
        document.querySelectorAll(".payment-card");

    const paymentStatus =
        document.getElementById("paymentStatus");


    const continueButton =
        document.getElementById("continueButton");


    /* =========================
       CUSTOM DROPDOWN ELEMENT
    ========================== */

    const classDropdown =
        document.getElementById("classDropdown");

    const classDropdownButton =
        document.getElementById(
            "classDropdownButton"
        );

    const selectedClass =
        document.getElementById(
            "selectedClass"
        );

    const classDropdownMenu =
        document.getElementById(
            "classDropdownMenu"
        );

    const classOptions =
        document.getElementById(
            "classOptions"
        );

    const classSearch =
        document.getElementById(
            "classSearch"
        );


    /* =========================
       OTHER DROPDOWN ELEMENT
    ========================== */

    const otherDropdown =
        document.getElementById("otherDropdown");

    const otherDropdownButton =
        document.getElementById(
            "otherDropdownButton"
        );

    const selectedOther =
        document.getElementById(
            "selectedOther"
        );

    const otherDropdownMenu =
        document.getElementById(
            "otherDropdownMenu"
        );

    const otherOptions =
        document.getElementById(
            "otherOptions"
        );

    const other =
        document.getElementById("other");


    /* =========================
       NOTIFICATION ELEMENT
    ========================== */

    const notification =
        document.getElementById(
            "notification"
        );

    const notificationIcon =
        document.getElementById(
            "notificationIcon"
        );

    const notificationTitle =
        document.getElementById(
            "notificationTitle"
        );

    const notificationMessage =
        document.getElementById(
            "notificationMessage"
        );

    const notificationClose =
        document.getElementById(
            "notificationClose"
        );


    /* =========================
       STATE
    ========================== */

    let selectedType = null;

    let selectedPayment = null;

    let notificationTimer;


    /* =========================
       CLASS DATA
    ========================== */

    const classData = {

        smk: {

            "X": [
                "X PPLG",
                "X DKV"
            ],

            "XI": [
                "XI PPLG",
                "XI DKV"
            ],

            "XII": [
                "XII PPLG",
                "XII DKV"
            ]

        },


        ma: {

            "X": [
                "X Umum 1",
                "X Umum 2",
                "X Umum 3",
                "X Umum 4",
                "X Umum 5"
            ],

            "XI": [
                "XI MIPA 1",
                "XI MIPA 2",
                "XI IPS 1",
                "XI Agama 1"
            ],

            "XII": [
                "XII Agama 1",
                "XII MIPA 1",
                "XII MIPA 2",
                "XII IPS 1",
                "XII IPS 2"
            ]

        },
        
        other: {

            "": [
                "Guru",
                "Karyawan",
                "Orang Tua",
                "Tamu",
                "Lainnya"
            ]

        }

        

    };


    /* =========================
       SHOW NOTIFICATION
    ========================== */

    function showNotification(
        title,
        message,
        icon = "✓"
    ) {

        notificationIcon.textContent =
            icon;

        notificationTitle.textContent =
            title;

        notificationMessage.textContent =
            message;


        notification.classList.add(
            "show"
        );


        clearTimeout(
            notificationTimer
        );


        notificationTimer =
            setTimeout(function () {

                notification.classList.remove(
                    "show"
                );

            }, 4000);

    }


    /* =========================
       CLOSE NOTIFICATION
    ========================== */

    notificationClose.addEventListener(
        "click",
        function () {

            notification.classList.remove(
                "show"
            );

        }
    );


    /* =========================
       RENDER CLASS OPTIONS
    ========================== */

    function renderClassOptions(type) {

        classOptions.innerHTML = "";

        classSearch.value = "";

        selectedClass.textContent =
            "Pilih kelas";

        kelas.value = "";


        if (!classData[type]) {

            return;

        }


        Object.entries(
            classData[type]
        ).forEach(
            function ([level, classes]) {


                /* Create level title */

                const groupTitle =
                    document.createElement(
                        "div"
                    );

                groupTitle.className =
                    "class-group-title";

                groupTitle.textContent =
                    level;


                classOptions.appendChild(
                    groupTitle
                );


                /* Create class buttons */

                classes.forEach(
                    function (className) {

                        const option =
                            document.createElement(
                                "button"
                            );

                        option.type =
                            "button";

                        option.className =
                            "class-option";

                        option.textContent =
                            className;

                        option.dataset.value =
                            className;


                        /* Select class */

                        option.addEventListener(
                            "click",
                            function () {

                                kelas.value =
                                    className;

                                selectedClass.textContent =
                                    className;


                                /* Remove selected state */

                                document
                                    .querySelectorAll(
                                        ".class-option"
                                    )
                                    .forEach(
                                        function (item) {

                                            item.classList.remove(
                                                "selected"
                                            );

                                        }
                                    );


                                option.classList.add(
                                    "selected"
                                );


                                /* Close dropdown */

                                classDropdown.classList.remove(
                                    "open"
                                );


                                classSearch.value =
                                    "";

                            }
                        );


                        classOptions.appendChild(
                            option
                        );

                    }
                );

            }
        );

    }


    /* =========================
       RENDER OTHER OPTIONS
    ========================== */

    function renderOtherOptions() {

        otherOptions.innerHTML = "";

        selectedOther.textContent =
            "Pilih pilihan";

        other.value = "";


        if (!classData.other) {

            return;

        }


        classData.other[""].forEach(
            function (option) {

                const optionBtn =
                    document.createElement(
                        "button"
                    );

                optionBtn.type =
                    "button";

                optionBtn.className =
                    "class-option";

                optionBtn.textContent =
                    option;

                optionBtn.dataset.value =
                    option;


                /* Select other option */

                optionBtn.addEventListener(
                    "click",
                    function () {

                        other.value =
                            option;

                        selectedOther.textContent =
                            option;


                        /* Remove selected state */

                        document
                            .querySelectorAll(
                                "#otherOptions .class-option"
                            )
                            .forEach(
                                function (item) {

                                    item.classList.remove(
                                        "selected"
                                    );

                                }
                            );


                        optionBtn.classList.add(
                            "selected"
                        );


                        /* Close dropdown */

                        otherDropdown.classList.remove(
                            "open"
                        );

                    }
                );


                otherOptions.appendChild(
                    optionBtn
                );

            }
        );

    }


    /* =========================
       OPEN / CLOSE DROPDOWN
    ========================== */

    classDropdownButton.addEventListener(
        "click",
        function () {

            classDropdown.classList.toggle(
                "open"
            );


            if (
                classDropdown.classList.contains(
                    "open"
                )
            ) {

                setTimeout(
                    function () {

                        classSearch.focus();

                    },
                    100
                );

            }

        }
    );


    /* =========================
       OPEN / CLOSE OTHER DROPDOWN
    ========================== */

    otherDropdownButton.addEventListener(
        "click",
        function () {

            otherDropdown.classList.toggle(
                "open"
            );

        }
    );


    /* =========================
       SEARCH CLASS
    ========================== */

    classSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                classSearch.value
                    .toLowerCase()
                    .trim();


            const options =
                classOptions.querySelectorAll(
                    ".class-option"
                );

            const groups =
                classOptions.querySelectorAll(
                    ".class-group-title"
                );


            options.forEach(
                function (option) {

                    const className =
                        option.dataset.value
                            .toLowerCase();


                    if (
                        className.includes(
                            searchValue
                        )
                    ) {

                        option.style.display =
                            "block";

                    } else {

                        option.style.display =
                            "none";

                    }

                }
            );


            /* Hide empty group titles */

            groups.forEach(
                function (group) {

                    let nextElement =
                        group.nextElementSibling;

                    let hasVisibleOption =
                        false;


                    while (
                        nextElement &&
                        nextElement.classList.contains(
                            "class-option"
                        )
                    ) {

                        if (
                            nextElement.style.display !==
                            "none"
                        ) {

                            hasVisibleOption =
                                true;

                            break;

                        }

                        nextElement =
                            nextElement.nextElementSibling;

                    }


                    group.style.display =
                        hasVisibleOption
                            ? "block"
                            : "none";

                }
            );

        }
    );


    /* =========================
       CLOSE DROPDOWN OUTSIDE
    ========================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !classDropdown.contains(
                    event.target
                )
            ) {

                classDropdown.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =========================
       SELECT CUSTOMER TYPE
    ========================== */

    typeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    /* Remove active state */

                    typeButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Add active state */

                    button.classList.add(
                        "active"
                    );


                    /* Save customer type */

                    selectedType =
                        button.dataset.type;


                    /* =========================
                       SMK
                    ========================== */

                    if (
                        selectedType === "smk"
                    ) {

                        classGroup.classList.remove(
                            "hidden"
                        );

                        otherGroup.classList.add(
                            "hidden"
                        );


                        renderClassOptions(
                            "smk"
                        );

                    }


                    /* =========================
                       MA
                    ========================== */

                    if (
                        selectedType === "ma"
                    ) {

                        classGroup.classList.remove(
                            "hidden"
                        );

                        otherGroup.classList.add(
                            "hidden"
                        );


                        renderClassOptions(
                            "ma"
                        );

                    }


                    /* =========================
                       OTHER
                    ========================== */

                    if (
                        selectedType === "other"
                    ) {

                        classGroup.classList.add(
                            "hidden"
                        );

                        otherGroup.classList.remove(
                            "hidden"
                        );


                        kelas.value = "";

                        selectedClass.textContent =
                            "Pilih kelas";

                        renderOtherOptions();

                    }

                }
            );

        }
    );


    /* =========================
       SELECT PAYMENT METHOD
    ========================== */

    paymentCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {


                    /* Remove active state */

                    paymentCards.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Add active state */

                    card.classList.add(
                        "active"
                    );


                    /* Save payment method */

                    selectedPayment =
                        card.dataset.payment;


                    /* Update payment status */

                    if (
                        selectedPayment === "qris"
                    ) {

                        paymentStatus.textContent =
                            "QRIS dipilih";

                    }


                    if (
                        selectedPayment === "cash"
                    ) {

                        paymentStatus.textContent =
                            "Cash dipilih";

                    }

                }
            );

        }
    );


    /* =========================
       CHECKOUT
    ========================== */

    continueButton.addEventListener(
        "click",
        function () {


            /* Get customer data */

            const nama =
                document
                    .getElementById("nama")
                    .value
                    .trim();


            const kelasValue =
                kelas.value;


            const otherValue =
                document
                    .getElementById("other")
                    .value;


            const telepon =
                document
                    .getElementById("telepon")
                    .value
                    .trim();


            /* =========================
               VALIDATE NAME
            ========================== */

            if (
                nama === ""
            ) {

                showNotification(
                    "Data belum lengkap",
                    "Silakan isi nama terlebih dahulu.",
                    "!"
                );

                return;

            }


            /* =========================
               VALIDATE CUSTOMER TYPE
            ========================== */

            if (
                selectedType === null
            ) {

                showNotification(
                    "Asal belum dipilih",
                    "Silakan pilih SMK, MA, atau OTHER.",
                    "!"
                );

                return;

            }


            /* =========================
               VALIDATE CLASS
            ========================== */

            if (
                selectedType === "smk" ||
                selectedType === "ma"
            ) {

                if (
                    kelasValue === ""
                ) {

                    showNotification(
                        "Kelas belum dipilih",
                        "Silakan pilih kelas kamu.",
                        "!"
                    );

                    return;

                }

            }


            /* =========================
               VALIDATE OTHER
            ========================== */

            if (
                selectedType === "other"
            ) {

                if (
                    otherValue === ""
                ) {

                    showNotification(
                        "Asal belum dipilih",
                        "Silakan pilih asal pembeli.",
                        "!"
                    );

                    return;

                }

            }


            /* =========================
               VALIDATE PAYMENT
            ========================== */

            if (
                selectedPayment === null
            ) {

                showNotification(
                    "Pembayaran belum dipilih",
                    "Silakan pilih Cash atau QRIS.",
                    "!"
                );

                return;

            }


            /* =========================
               SAVE ORDER DATA
            ========================== */

            const orderData = {

                nama: nama,

                tipe: selectedType,

                kelas: kelasValue,

                other: otherValue,

                telepon: telepon,

                metodePembayaran:
                    selectedPayment

            };


            localStorage.setItem(
                "biteaOrder",
                JSON.stringify(orderData)
            );


            /* =========================
               REDIRECT PAYMENT PAGE
            ========================== */

            if (
                selectedPayment === "qris"
            ) {

                window.location.href =
                    "qris.html";

            }


            if (
                selectedPayment === "cash"
            ) {

                window.location.href =
                    "cash.html";

            }

        }
    );

});