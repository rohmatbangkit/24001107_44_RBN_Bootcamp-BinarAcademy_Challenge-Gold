const apiUrl = '/drugs';

// Function to format price as Indonesian Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

// Handle form submit event
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const drugId = document.getElementById('drugId').value;
    if (drugId) {
        updateDrug(drugId);
    } else {
        addDrug();
    }
});

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
            <td>${formatCurrency(drug.Price)}</td> <!-- Format harga sebagai Rupiah di sini -->
            <td>${drug.Manufacture}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editDrug(${drug.Drug_id})">&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;</button>
                <pre></pre>
                <button class="btn btn-danger btn-sm" onclick="deleteDrug(${drug.Drug_id})">Delete</button>
            </td>
        </tr>`;
        drugTableBody.innerHTML += row;
    });
}

// Add new drug data to server
async function addDrug() {
    const name = document.getElementById('name').value;
    const preparation = document.getElementById('preparation').value;
    const stock = document.getElementById('stock').value;
    const pharmacology = document.getElementById('pharmacology').value;
    const price = document.getElementById('price').value;
    const manufacture = document.getElementById('manufacture').value;

    if (stock < 0 || price < 0) {
        alert('Stock and Price cannot be negative');
        return;
    }

    const newDrug = { Name_of_drug: name, Preparation: preparation, Stock: stock, Pharmacology: pharmacology, Price: price, Manufacture: manufacture };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDrug),
    });

    if (response.ok) {
        hideAddDrugForm();
        fetchDrugs();
    } else {
        alert('Failed to add drug');
    }
}

// Update drug data on server
async function updateDrug(drugId) {
    const name = document.getElementById('name').value;
    const preparation = document.getElementById('preparation').value;
    const stock = document.getElementById('stock').value;
    const pharmacology = document.getElementById('pharmacology').value;
    const price = document.getElementById('price').value;
    const manufacture = document.getElementById('manufacture').value;

    if (stock < 0 || price < 0) {
        alert('Stock and Price cannot be negative');
        return;
    }

    const updatedDrug = { Name_of_drug: name, Preparation: preparation, Stock: stock, Pharmacology: pharmacology, Price: price, Manufacture: manufacture };

    const response = await fetch(`${apiUrl}/${drugId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDrug),
    });

    if (response.ok) {
        hideAddDrugForm();
        fetchDrugs();
    } else {
        alert('Failed to update drug');
    }
}

// Delete drug data from server
async function deleteDrug(drugId) {
    const response = await fetch(`${apiUrl}/${drugId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        rearrangeIDs();
        fetchDrugs();
    } else {
        alert('Failed to delete drug');
    }
}

// Rearrange drug IDs after deletion
async function rearrangeIDs() {
    const response = await fetch(apiUrl);
    let drugs = await response.json();

    // Sort drugs array based on Drug_id
    drugs.sort((a, b) => a.Drug_id - b.Drug_id);

    // Update IDs sequentially
    for (let i = 0; i < drugs.length; i++) {
        const updatedDrug = { ...drugs[i], Drug_id: i + 1 };
        await fetch(`${apiUrl}/${drugs[i].Drug_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDrug),
        });
    }
}

// Show form to add new drug
function showAddDrugForm() {
    document.getElementById('drugForm').style.display = 'block';
    document.getElementById('drugId').value = '';
    document.getElementById('form').reset();
    document.getElementById('saveButton').innerText = 'Save';
}

// Hide form to add new drug
function hideAddDrugForm() {
    document.getElementById('drugForm').style.display = 'none';
}

// Fill form with selected drug data for editing
function editDrug(drugId) {
    fetch(`${apiUrl}/${drugId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch drug data');
            }
            return response.json();
        })
        .then(drug => {
            console.log('Fetched drug data:', drug); // Log the fetched drug data
            document.getElementById('drugId').value = drug.Drug_id;
            document.getElementById('name').value = drug.Name_of_drug;
            document.getElementById('preparation').value = drug.Preparation;
            document.getElementById('stock').value = drug.Stock;
            document.getElementById('pharmacology').value = drug.Pharmacology;
            document.getElementById('price').value = drug.Price;
            document.getElementById('manufacture').value = drug.Manufacture;
            document.getElementById('saveButton').innerText = 'Update';
            document.getElementById('drugForm').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching drug:', error);
            alert('Failed to fetch drug data');
        });
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
