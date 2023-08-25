import { obtenerdata } from "./axios.js";

async function renderData() {

    const grLinea = await obtenerdata('http://ergast.com/api/f1/current/drivers/alonso/results.json');
    const grCircular = await obtenerdata('http://ergast.com/api/f1/current/driverStandings.json');
    
    
    let datagrLinea = grLinea.data.MRData.RaceTable.Races;
    let datagrCircular= grCircular.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    
    
    let circuitos = datagrLinea.map(circuito => circuito.raceName)
    let posiciones = datagrLinea.map(posicion => posicion.Results[0].points)

    let puntosPilotos = datagrCircular.map(puntosPiloto => puntosPiloto.points)
    let nombrePilotos = datagrCircular.map(nombrePiloto =>nombrePiloto.Driver.familyName)

    const linea = document.getElementById('grlinea');
    const circular = document.getElementById('grcircular');

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

    new Chart(circular, {
        type: 'pie',
        data: {
            labels: [
                nombrePilotos[4],
                nombrePilotos[6]
                
            ],  
            datasets: [{
                label: 'Puntos',
                data: [puntosPilotos[4],puntosPilotos[6]],
                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(255, 255, 0)'
                ],
                hoverOffset: 4,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                  labels: {
                    color: 'white'
                    }
                }
            }
        }
    });

}
renderData(); 


