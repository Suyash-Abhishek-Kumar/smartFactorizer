async function factorize() {
    let number = document.getElementById("number").value;

    if (conducted === "") {
        document.getElementById("result").innerText = "Please enter a value.";
        return;
    }

    let response = await fetch("https://margin-calculator-2.onrender.com/factorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number })
    });

    let data = await response.json();
    document.getElementById("result").innerText = data.result;
}