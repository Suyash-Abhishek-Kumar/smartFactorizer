async function factorize() {
    let number = document.getElementById("number").value;

    if (number === "") {
        document.getElementById("result").innerText = "Please enter a value.";
        return;
    }

    let response = await fetch("https://smartfactorizer.onrender.com/factorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number })
    });

    let data = await response.json();
    console.log("Received Data:", data.result);
    let list1 = data.result[0]; // First list
    let list2 = data.result[1]; // Second list

    newdata = {
        "Variant +": {
            "factorization" : list2[0],
            "required_numbers" : list1[0]
        },
        "Variant -": {
            "factorization" : list2[1],
            "required_numbers" : list1[1]
        },
        "Variant =": {
            "factorization" : list2[2],
            "required_numbers" : list1[2]
        }
    }
    displayFactorization(newdata);
}

function displayFactorization(data) {
    let output1 = "";
    let output2 = "";
    let output3 = "";

    let variants = Object.keys(data); // Get all variant keys (e.g., "+", "-", "=")

    if (variants.length >= 1) {
        output1 += `<h3>${variants[0]}:</h3>`;
        let factorization1 = data[variants[0]]["factorization"];
        for (let i = 0; i < factorization1.length; i++) {
            let num1 = 1;
            for (let j of factorization1[i]){
                if (j != 1 && j != -1){ num1 *= j; }
                else num1 += j;
            }
            let factors = Array.isArray(factorization1[i]) ? factorization1[i] : [factorization1[i]];
            let add = 0;
            if (factors[factors.length - 1] === -1 || factors[factors.length - 1] === 1) {add = factors.pop(); }
            if (add == 0){ output1 += `<span>${num1}: ${factors.join(" x ")}</span><br><br>`; }
            if (add == 1){ output1 += `<span>${num1}: ${factors.join(" x ")} + 1</span><br><br>`; }
            if (add == -1){ output1 += `<span>${num1}: ${factors.join(" x ")} - 1</span><br><br>`; }
        }
        output1 += `<strong>Required Numbers:</strong> ${data[variants[0]]["required_numbers"].join(", ")}`;
    }

    if (variants.length >= 2) {
        output2 += `<h3>${variants[1]}:</h3>`;
        let factorization2 = data[variants[1]]["factorization"];
        for (let i = 0; i < factorization2.length; i++) {
            let num2 = 1;
            for (let j of factorization2[i]){
                if (j != 1 && j != -1){ num2 *= j; }
                else num2 += j;
            }
            let factors = Array.isArray(factorization2[i]) ? factorization2[i] : [factorization2[i]];
            let add = 0;
            if (factors[factors.length - 1] === -1 || factors[factors.length - 1] === 1) {add = factors.pop(); }
            if (add == 0){ output2 += `<span>${num2}: ${factors.join(" x ")}</span><br><br>`; }
            if (add == 1){ output2 += `<span>${num2}: ${factors.join(" x ")} + 1</span><br><br>`; }
            if (add == -1){ output2 += `<span>${num2}: ${factors.join(" x ")} - 1</span><br><br>`; }
        }
        output2 += `<strong>Required Numbers:</strong> ${data[variants[1]]["required_numbers"].join(", ")}`;
    }

    if (variants.length >= 3) {
        output3 += `<h3>${variants[2]}:</h3>`;
        let factorization3 = data[variants[2]]["factorization"];
        for (let i = 0; i < factorization3.length; i++) {
            let num3 = 1;
            for (let j of factorization3[i]){
                if (j != 1 && j != -1){ num3 *= j; }
                else num3 += j;
            }
            let factors = Array.isArray(factorization3[i]) ? factorization3[i] : [factorization3[i]];
            let add = 0;
            if (factors[factors.length - 1] === -1 || factors[factors.length - 1] === 1) {add = factors.pop(); }
            if (add == 0){ output3 += `<span>${num3}: ${factors.join(" x ")}</span><br><br>`; }
            if (add == 1){ output3 += `<span>${num3}: ${factors.join(" x ")} + 1</span><br><br>`; }
            if (add == -1){ output3 += `<span>${num3}: ${factors.join(" x ")} - 1</span><br><br>`; }
        }
        output3 += `<strong>Required Numbers:</strong> ${data[variants[2]]["required_numbers"].join(", ")}`;
    }

    console.log("Output Elements:", document.getElementById("variant-plus"), document.getElementById("variant-minus"), document.getElementById("variant-equal"));
    console.log("Data:", data);

    document.getElementById("variant-plus").innerHTML = output1;
    document.getElementById("variant-minus").innerHTML = output2;
    document.getElementById("variant-equal").innerHTML = output3;
}

