const URLAPI = "https://api-dishes.vercel.app/"


async function loadDishes() {
    try {
        const response = await fetch(URLAPI)
        if (!response.ok) {
            throw new Error('La respuesta de la API no fue exitosa');
        }
        const data = await response.json()
        // console.log(data.data)

        data.data.forEach(element => {
            const row = document.createElement('tr')
            const colId = document.createElement('td')
            colId.append(document.createTextNode(element.idDish))
            const colName = document.createElement('td')
            colName.append(document.createTextNode(element.name))
            const colCalories = document.createElement('td')
            colCalories.append(document.createTextNode(element.calories))
            const colVegetarian = document.createElement('td')
            colVegetarian.append(document.createTextNode(element.isVegetarian))
            const colValue = document.createElement('td')
            colValue.append(document.createTextNode(element.value))
            const colComments = document.createElement('td')
            colComments.append(document.createTextNode(element.comments))
            row.append(colId)
            row.append(colName)
            row.append(colCalories)
            row.append(colVegetarian)
            row.append(colValue)
            row.append(colComments)
            document.getElementById('tbody').append(row)

            const select = document.getElementById('selectID')
            const option = document.createElement('option');
            option.id = 'idOption' 
            option.value = element._id;
            option.textContent = element.name;
            select.appendChild(option)
            console.log(element._id)
        });
    } catch (error) {
        console.error('Error al onbtener los platos:', error.message);
    }
}

document.getElementById('filterForm').addEventListener('submit', async function(event){
    event.preventDefault();
    try {
        const _id = document.getElementById('idOption')
        const response = await fetch(URLAPI+_id )
        if (!response.ok) {
            throw new Error('La respuesta de la API no fue exitosa');
        }
        const data = await response.json()
         console.log(data.data)
    } catch (error) {
        console.error('Error al onbtener los platos:', error.message);
    }
})


document.getElementById('dishForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('inputId').value;
    const name = document.getElementById('inputName').value;
    const calories = document.getElementById('inputCalories').value;
    const isVegetarian = document.getElementById('selectVegetarian').value;
    const value = document.getElementById('inputValue').value;
    const description = document.getElementById('inputDescription').value;
    console.log(id, name, calories, isVegetarian, value, description);

    const dataDish = {
        "idDish": id,
        "name": name,
        "calories": calories,
        "isVegetarian": isVegetarian,
        "value": value,
        "comments": description,
    }
    addDish(dataDish)
});

async function addDish(dish) {
    try {
        const response = await fetch(URLAPI,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dish)
            })
        const responseData = response.json()

        if (!response.ok) {
            throw new Error('Error al registrar el plato en la API. Estado de respuesta: ' + response.status);
        }

        // return responseData
    } catch (error) {
        console.error('Error al registrar el plato:', error.message);
        throw error;
    }
}
