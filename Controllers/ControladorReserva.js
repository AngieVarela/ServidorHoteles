import { ServicioReserva } from "../services/serviciosReserva.js"
import { ServicioHabitacion } from "../services/serviciosHabitacion.js"

export class ControladorReserva{

    constructor(){}

    async buscarReservas(request,response){
        let objetoServicioReserva= new ServicioReserva()
        try{
            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioReserva.buscarReserva(),
            })

        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })
        }  
    }


    async buscarReservaPorId(request,response){
        let id=request.params.idHabitacion //recibo id de la peticion
        let objetoServicioReserva= new objetoServicioReserva()
        try{
            response.status(200).json({
                "mensaje":"exito en la consulta "+id,
                "datos":await objetoServicioReserva.buscaReservaPorId(id),
            })

        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })
        }
    }

    async registrarReserva(request,response){

        let datosReserva=request.body
        let idHabitacionR = datosReserva.idHabitacion
        let objetoServicioHabitacion= new ServicioHabitacion()
        let objetoServicioReserva= new ServicioReserva()
        try{
            let habitacion = await objetoServicioHabitacion.buscarHabitacionPorId(idHabitacionR)
            let personasTotal= datosReserva.numeroAdultos+datosReserva.numeroNinos

            let dias = (new Date(datosReserva.fechaSalida)- new Date(datosReserva.fechaEntrada))/(1000*3600*24);
            let costoTPersonas = personasTotal * habitacion.valorNoche;
            let totalReserva = dias * costoTPersonas;
            datosReserva.costoReserva=totalReserva

            if (idHabitacionR = !null){
                if (personasTotal > habitacion.numeroMaximoPersonas){
                    response.status(200).json({
                        "mensaje": "Pasaste el limite total de personas",
                        "datos": null,
                    });
                }else{
                    response.status(200).json({
                        "mensaje": "Exito registrando reserva",
                        "datos": await objetoServicioReserva.agregarReservaEnBD(datosReserva)
                    })
                }
             }

        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })
        }
    }


    async editarReserva(request,response){
        let id = request.params.idReserva
        let datosReserva = request.body

     let objetoServicioReserva= new ServicioReserva()

        try{
            await objetoServicioReserva.editarReserva(id,datosReserva)
            response.status(200).json({
                "mensaje":"exito editando"+id,
                "datos":datosReserva,
            })

        }catch(error){
            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })
        }
    }
}