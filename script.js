import { obtenerdata } from "./axios.js";

async function renderData() {

    const grLinea = await obtenerdata('http://ergast.com/api/f1/current/drivers/alonso/results.json');
    
    
    let datagrLinea = grLinea.data.MRData.RaceTable.Races;
    
    
    let circuitos = datagrLinea.map(circuito => circuito.raceName)
    let posiciones = datagrLinea.map(posicion => posicion.Results[0].points)

    const linea = document.getElementById('grlinea');
    

    new Chart(linea, {
        type: 'line',
        data: {
            labels: circuitos,
            datasets: [{
                label: 'Puntos Ganados por Carrera',
                data: posiciones,
                fill: false,
                borderColor: 'rgb(18, 151, 58)',
                backgroundColor: 'rgb(255, 128, 0)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                  labels: {
                    color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color:'white'
                    }
                }
            }
        }
    });

}
renderData(); 


