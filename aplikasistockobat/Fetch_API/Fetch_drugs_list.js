const apiUrl = '/drugs';


// Fetch drugs data from server and display in table
async function fetchDrugs() {
    const response = await fetch(apiUrl);
    let drugs = await response.json();

    // Sort drugs array based on Drug_id
    drugs.sort((a, b) => a.Drug_id - b.Drug_id);

    const drugTableBody = document.getElementById('drugTableBody');
    drugTableBody.innerHTML = '';
    drugs.forEach(drug => {
        const row = `<tr>
            <td>${drug.Drug_id}</td>
            <td>${drug.Name_of_drug}</td>
            <td>${drug.Preparation}</td>
            <td>${drug.Stock}</td>
            <td>${drug.Pharmacology}</td>
            <td>${formatCurrency(drug.Price)}</td> 
            <td>${drug.Manufacture}</td>
            </td>
        </tr>`;
        drugTableBody.innerHTML += row;
    });
}

// Function to format price as Indonesian Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

// Search drugs based on name
function searchDrug() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const tableBody = document.getElementById('drugTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const name = row.getElementsByTagName('td')[1].textContent.toLowerCase();
        if (name.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Fetch drugs data when page loads
fetchDrugs();
