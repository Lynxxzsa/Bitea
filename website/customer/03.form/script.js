document.addEventListener("DOMContentLoaded", () => {
  const rupiah = (value) => new Intl.NumberFormat("id-ID", {style:"currency",currency:"IDR",maximumFractionDigits:0}).format(value).replace("IDR","Rp");
  const cart = JSON.parse(localStorage.getItem("biteaCart") || "[]");
  const orderItems = document.getElementById("orderItems");
  const orderTotal = document.getElementById("orderTotal");
  const typeButtons = document.querySelectorAll(".type-btn");
  const classGroup = document.getElementById("classGroup");
  const otherGroup = document.getElementById("otherGroup");
  const kelas = document.getElementById("kelas");
  const other = document.getElementById("other");
  const paymentCards = document.querySelectorAll(".payment-card");
  const paymentStatus = document.getElementById("paymentStatus");
  const continueButton = document.getElementById("continueButton");
  const notification = document.getElementById("notification");
  const notificationIcon = document.getElementById("notificationIcon");
  const notificationTitle = document.getElementById("notificationTitle");
  const notificationMessage = document.getElementById("notificationMessage");
  const notificationClose = document.getElementById("notificationClose");
  const classDropdown = document.getElementById("classDropdown");
  const classDropdownButton = document.getElementById("classDropdownButton");
  const selectedClass = document.getElementById("selectedClass");
  const classDropdownMenu = document.getElementById("classDropdownMenu");
  const classOptions = document.getElementById("classOptions");
  const classSearch = document.getElementById("classSearch");
  const otherDropdown = document.getElementById("otherDropdown");
  const otherDropdownButton = document.getElementById("otherDropdownButton");
  const selectedOther = document.getElementById("selectedOther");
  const otherDropdownMenu = document.getElementById("otherDropdownMenu");
  const otherOptions = document.getElementById("otherOptions");

  if (!cart.length) {
    orderItems.innerHTML = '<div class="empty-order">Keranjang kosong. Kembali ke menu untuk memilih produk.</div>';
    continueButton.disabled = true;
  } else {
    orderItems.innerHTML = cart.map(item => `
      <div class="order-item">
        <div><strong>${item.name}</strong><small>× ${item.qty} • ${rupiah(item.price)} / item</small></div>
        <strong>${rupiah(item.price * item.qty)}</strong>
      </div>
    `).join("");
    orderTotal.textContent = rupiah(cart.reduce((sum,item) => sum + item.price * item.qty, 0));
  }

  let selectedType = null;
  let selectedPayment = null;
  let notificationTimer;

  const classData = {
    smk: {"X":["X PPLG","X DKV"],"XI":["XI PPLG","XI DKV"],"XII":["XII PPLG","XII DKV"]},
    ma: {"X":["X Umum 1","X Umum 2","X Umum 3","X Umum 4","X Umum 5"],"XI":["XI MIPA 1","XI MIPA 2","XI IPS 1","XI Agama 1"],"XII":["XII Agama 1","XII MIPA 1","XII MIPA 2","XII IPS 1","XII IPS 2"]},
    other: {"":["Guru","Karyawan","Orang Tua","Tamu","Lainnya"]}
  };

  function showNotification(title,message,icon="!") {
    notificationIcon.textContent=icon; notificationTitle.textContent=title; notificationMessage.textContent=message;
    notification.classList.add("show"); clearTimeout(notificationTimer);
    notificationTimer=setTimeout(()=>notification.classList.remove("show"),3500);
  }
  notificationClose.addEventListener("click",()=>notification.classList.remove("show"));

  function renderClassOptions(type) {
    classOptions.innerHTML=""; classSearch.value=""; selectedClass.textContent="Pilih kelas"; kelas.value="";
    Object.entries(classData[type] || {}).forEach(([level,items])=>{
      const title=document.createElement("div"); title.className="class-group-title"; title.textContent=level; classOptions.appendChild(title);
      items.forEach(className=>{
        const btn=document.createElement("button"); btn.type="button"; btn.className="class-option"; btn.textContent=className;
        btn.addEventListener("click",()=>{kelas.value=className;selectedClass.textContent=className;classDropdown.classList.remove("open");classSearch.value="";});
        classOptions.appendChild(btn);
      });
    });
  }
  function renderOtherOptions() {
    otherOptions.innerHTML="";
    classData.other[""].forEach(value=>{
      const btn=document.createElement("button"); btn.type="button"; btn.className="class-option"; btn.textContent=value;
      btn.addEventListener("click",()=>{other.value=value;selectedOther.textContent=value;otherDropdown.classList.remove("open");});
      otherOptions.appendChild(btn);
    });
  }
  classDropdownButton.addEventListener("click",()=>{classDropdown.classList.toggle("open");otherDropdown.classList.remove("open");});
  otherDropdownButton.addEventListener("click",()=>{otherDropdown.classList.toggle("open");classDropdown.classList.remove("open");});
  document.addEventListener("click",(e)=>{if(!classDropdown.contains(e.target))classDropdown.classList.remove("open");if(!otherDropdown.contains(e.target))otherDropdown.classList.remove("open");});
  classSearch.addEventListener("input",()=>{
    const q=classSearch.value.toLowerCase();
    classOptions.querySelectorAll(".class-option").forEach(btn=>btn.style.display=btn.textContent.toLowerCase().includes(q)?"block":"none");
  });

  typeButtons.forEach(button=>button.addEventListener("click",()=>{
    typeButtons.forEach(btn=>btn.classList.remove("active")); button.classList.add("active");
    selectedType=button.dataset.type;
    if(selectedType==="other"){classGroup.classList.add("hidden");otherGroup.classList.remove("hidden");kelas.value="";renderOtherOptions();}
    else{classGroup.classList.remove("hidden");otherGroup.classList.add("hidden");other.value="";renderClassOptions(selectedType);}
  }));

  paymentCards.forEach(card=>card.addEventListener("click",()=>{
    paymentCards.forEach(item=>item.classList.remove("active")); card.classList.add("active");
    selectedPayment=card.dataset.payment; paymentStatus.textContent=selectedPayment==="qris"?"QRIS dipilih":"Cash dipilih";
  }));

  continueButton.addEventListener("click",()=>{
    const nama=document.getElementById("nama").value.trim();
    const telepon=document.getElementById("telepon").value.trim();
    if(!nama)return showNotification("Data belum lengkap","Silakan isi nama terlebih dahulu.");
    if(!selectedType)return showNotification("Asal belum dipilih","Silakan pilih SMK, MA, atau OTHER.");
    if((selectedType==="smk"||selectedType==="ma")&&!kelas.value)return showNotification("Kelas belum dipilih","Silakan pilih kelas kamu.");
    if(selectedType==="other"&&!other.value)return showNotification("Asal belum dipilih","Silakan pilih asal pembeli.");
    if(!selectedPayment)return showNotification("Pembayaran belum dipilih","Silakan pilih Cash atau QRIS.");

    const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
    const orderData={orderId:"BIT-"+Date.now().toString().slice(-8),nama,tipe:selectedType,kelas:kelas.value,other:other.value,telepon,metodePembayaran:selectedPayment,items:cart,total,createdAt:new Date().toISOString()};
    localStorage.setItem("biteaOrder",JSON.stringify(orderData));
    window.location.href=selectedPayment==="qris"?"../05.payment/qris.html":"../05.payment/cash.html";
  });
});