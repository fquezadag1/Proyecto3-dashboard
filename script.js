import { obtenerdata } from "./axios.js";

async function renderData() {

    const grLinea = await obtenerdata('http://ergast.com/api/f1/current/drivers/alonso/results.json');
    const grCircular = await obtenerdata('http://ergast.com/api/f1/current/driverStandings.json');
    const grBarra = await obtenerdata('http://ergast.com/api/f1/current/constructorStandings.json');
    
    
    let datagrLinea = grLinea.data.MRData.RaceTable.Races;
    let datagrCircular= grCircular.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    let datagrBarra= grBarra.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    
    let circuitos = datagrLinea.map(circuito => circuito.raceName)
    let posiciones = datagrLinea.map(posicion => posicion.Results[0].points)

    let puntosPilotos = datagrCircular.map(puntosPiloto => puntosPiloto.points)
    let nombrePilotos = datagrCircular.map(nombrePiloto =>nombrePiloto.Driver.familyName)

    let puntosEquipos = datagrBarra.map(puntosEquipo => puntosEquipo.points)
    let equipos = datagrBarra.map(equipo => equipo.Constructor.name)
    
    const linea = document.getElementById('grlinea');
    const circular = document.getElementById('grcircular');
    const barra = document.getElementById('grbarra');

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

    new Chart(barra, {
        type: 'bar',
        data: {
          labels: equipos,
          datasets: [{
            label: 'Puntos',
            data: puntosEquipos,
            borderWidth: 1,
            backgroundColor: [
                'rgba(0, 0, 204, 0.5)',
                'rgba(160, 160, 160, 0.5)',
                'rgba(0, 51, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 128, 0, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(3, 11, 255, 0.5)',
                'rgba(255, 255, 255, 0.5)',
                'rgba(153, 0, 0, 0.5)',
                'rgba(255, 255, 255, 0.5)'
            ],
            borderColor: [
                'rgb(0, 0, 204)',
                'rgb(160, 160, 160)',
                'rgb(0, 51, 0)',
                'rgb(255, 0, 0)',
                'rgb(255, 128, 0)',
                'rgb(153, 102, 255)',
                'rgb(255, 255, 255)',
                'rgb(255, 0, 0)',
                'rgb(255, 255, 255)',
                'rgb(0, 76, 153)'
            ]
          }]
        },
        options: {
            responsive: true,
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
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
      });
}
renderData(); 


