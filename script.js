import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://knczxfhtigbfozieihby.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuY3p4Zmh0aWdiZm96aWVpaGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3ODQyMDIsImV4cCI6MjA2NTM2MDIwMn0.pNNe92o493lWxk6AQpfv-_HOqDyzg4s7fT5aLsgoWRc' // key anonima

const supabase = createClient(supabaseUrl, supabaseKey)
const PlanetasButton = document.getElementById('get-planetas-btn');
const ExtraterrestresButton = document.getElementById('get-extraterrestres-btn');
const table1Title = document.getElementById('table1-title');

document.addEventListener('DOMContentLoaded', async () => {
    getExtraterrestres();
    getVisitas();
    ExtraterrestresButton.style.display = 'none'; // Ocultar boton de extraterrestres
})

PlanetasButton.addEventListener('click', async () => {
    table1Title.textContent = 'Planetas'; // Cambiar titulo de la tabla a Planetas
    ExtraterrestresButton.style.display = 'flex'; // Mostrar boton de extraterrestres
    PlanetasButton.style.display = 'none'; // Ocultar botón de planetas
    await getPlanets();
})
ExtraterrestresButton.addEventListener('click', async () => {
    table1Title.textContent = 'Extraterrestres'; // Cambiar titulo de la tabla a Extraterrestres
    PlanetasButton.style.display = 'flex'; // Mostrar boton de planetas
    ExtraterrestresButton.style.display = 'none'; // Ocultar botón de extraterrestres
    await getExtraterrestres();
})

    async function getExtraterrestres() {
        await supabase
        .from('Extraterrestre')
        .select('*')
        .then(response => renderTable(response.data, "tabla-container"))
        .catch(error => {
            console.error('Error al obtener extraterrestres:', error)
            return []
        })
    }

    async function getPlanets() {
        await supabase
        .from('Planeta')
        .select('*')
        .then(response => renderTable(response.data, "tabla-container"))
        .catch(error => {
                console.error('Error al obtener planetas:', error)
                return []
            })
    }

    async function getVisitas() {
        await supabase
        .from('Visita')
        .select('*')
        .then(response => renderTable(response.data, "tabla-visitas"))
        .catch(error => {
            console.error('Error al obtener visitas:', error)
            return []
        })
    }
    
    function renderTable(filas, tableId) {
        if (filas.length === 0) {
        document.getElementById(tableId).innerHTML = '<p>No hay datos.</p>'
        return
        }

        const columnas = Object.keys(filas[0])
        let html = ''
        html += '<thead><tr>' + columnas.map(col => `<th>${col}</th>`).join('') + '</tr></thead>'
        html += '<tbody>'
        for (const fila of filas) {
            html += '<tr>' + columnas.map(col => `<td>${fila[col]}</td>`).join('') + '</tr>'
        }
        html += '</tbody></table>'

        document.getElementById(tableId).innerHTML = html
    }
