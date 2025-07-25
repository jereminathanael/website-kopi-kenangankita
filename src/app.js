document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
      { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
      { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 35000 },
      { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      // Cek barang yg sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika blm ada / cart masih kosong
      if(!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          if(item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;  
          }
        })
      }

    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if(cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if(cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

// form validation
const checkoutButton = document.getElementById('checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', () => {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].tagName === 'INPUT') {
      if (form.elements[i].value.trim() === '') {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled');
        return; // hentikan loop dan keluar dari event handler
      }
    }
  }
  
  
  // Jika loop selesai tanpa menemukan input kosong
  checkoutButton.disabled = false;
  checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', async(e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const obData = Object.fromEntries(data);
  // const message = formatMessage(obData);
  // window.open('http://wa.me/6289602668106?text=' + encodeURIComponent(message));
  
  // minta transaction token menggunakan ajax / fetch
  try{
    const response = await fetch('php/placeOrder.php', {
      method: 'POST',
      body: data,
    });
    const token = await response.text();
    window.snap.pay(token);
  } catch(err) {
    console.log(err.message);
  }
  
});

//  Format pesan WA
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
  
  Data Pesanan
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
  Total: ${rupiah(obj.total)}
  Terima kasih.`;
}

// konversi ke mata uang rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

