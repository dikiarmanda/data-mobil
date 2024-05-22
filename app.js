let dataMobil = [
  {
    id: 100,
    brand: "Toyota",
    type: "Hiace",
    price: 35000,
  },
  {
    id: 101,
    brand: "Honda",
    type: "Accord",
    price: 28000,
  },
  {
    id: 103,
    brand: "Suzuki",
    type: "Katana",
    price: 15000,
  },
];

// Cetak Data
function cetakData() {
  document.querySelector("tbody").innerHTML = "";
  dataMobil.forEach((data, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${data.brand}</td>
            <td>${data.type}</td>
            <td>${data.price}</td>
            <td>
              <button class="editData btn btn-warning btn-sm" onclick="editData(${
                data.id
              })">Edit</button>
              <button class="deleteData btn btn-danger btn-sm" onclick="return confirm('Apakah anda yakin ingin menghapus data ini?') ? deleteData(${
                data.id
              }) : false;">Delete</button>  
            </td>
          `;
    document.querySelector("tbody").appendChild(row);
  });
}
cetakData();

// Btn tambahData
document.getElementById("tambahData").addEventListener("click", function () {
  document.getElementById("cardTambah").classList.remove("d-none");
});

// Get data form input
function getData() {
  const id = document.getElementById("id").value;
  const brand = document.getElementById("brand").value;
  const type = document.getElementById("type").value;
  const price = document.getElementById("price").value;
  return { id, brand, type, price };
}

// Simpan Data
const btnSimpan = document.getElementById("btnSimpan");
btnSimpan.addEventListener("click", function (e) {
  e.preventDefault();

  const { id, brand, type, price } = getData();

  // Cek apakah ada data yang sama
  if (dataMobil.find((data) => data.id == id)) {
    const dataIndex = dataMobil.findIndex((data) => data.id == id);
    console.log(dataIndex);
    dataMobil[dataIndex] = {
      id: id,
      brand: brand,
      type: type,
      price: price,
    };
  } else {
    const newData = {
      id: dataMobil.length ? dataMobil[dataMobil.length - 1].id + 1 : 1,
      brand: brand,
      type: type,
      price: price,
    };
    dataMobil.push(newData);
  }
  clearForm();
  cetakData();
});

// clear form input
function clearForm() {
  document.getElementById("cardTambah").classList.add("d-none");
  document.getElementById("brand").value = "";
  document.getElementById("type").value = "";
  document.getElementById("price").value = "";
}

// Function untuk mencari dataMobil berdasarkan id
function cariDataMobil(id) {
  return dataMobil.find((data) => data.id == id);
}

// Edit data
function editData(id) {
  const data = cariDataMobil(id);
  document.getElementById("cardTambah").classList.remove("d-none");
  document.getElementById("id").value = data.id;
  document.getElementById("brand").value = data.brand;
  document.getElementById("type").value = data.type;
  document.getElementById("price").value = data.price;
}

// Delete Data
function deleteData(id) {
  dataMobil = dataMobil.filter((data) => data.id != id);
  cetakData();
}
