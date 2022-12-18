
$( document ).ready(function() {
  let captcha;

  function generate() {
    document.getElementById("submit").value = "";
    captcha = document.getElementById("image");
    let unique = "";
    const random =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 6; i++) {
      unique += random.charAt(
        Math.random() * random.length)
    }
    captcha.innerHTML = unique;
  }

  function aaa() {
    console.log(2333);
    generate();
  }

  // function print() {
  //   const usr_input = document
  //     .getElementById("submit").value;
  //   if (usr_input === captcha.innerHTML) {
  //     let s = document.getElementById("key")
  //       .innerHTML = "Mã chính xác";
  //     generate();
  //   } else {
  //     let s = document.getElementById("key")
  //       .innerHTML = "Mã không chính xác";
  //     generate();
  //   }
  // }

  let citis = document.getElementById("city");
  let districts = document.getElementById("district");
  let wards = document.getElementById("ward");
  let Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "application/json",
  };
  let promise = axios(Parameter);
  promise.then(function (result) {
    renderCity(result.data);
  });

  function renderCity(data) {
    for (const x of data) {
      citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }
    citis.onchange = function () {
      district.length = 1;
      ward.length = 1;
      if (this.value !== "") {
        const result = data.filter(n => n.Id === this.value);

        for (const k of result[0].Districts) {
          district.options[district.options.length] = new Option(k.Name, k.Id);
        }
      }
    };
    district.onchange = function () {
      ward.length = 1;
      const dataCity = data.filter((n) => n.Id === citis.value);
      if (this.value !== "") {
        const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

        for (const w of dataWards) {
          wards.options[wards.options.length] = new Option(w.Name, w.Id);
        }
      }
    };
  }
});
