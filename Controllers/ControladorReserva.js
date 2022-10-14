import { ServicioReserva } from "../services/serviciosReserva.js"

export class ControladorReserva{

    constructor(){}

    async buscarReservas(request,response){
        let objetoServicioReserva= new ServicioReserva()

        try{

            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioReserva.buscarReservas(),
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
        let objetoServicioReserva=new objetoServicioReserva()
        
        try{
            if(datosReserva.numeroMaximoPersonas<8){

                await objetoServicioReserva.agregarReservaEnBD(datosReserva)

                response.status(200).json({
                    "mensaje": "exito registrando reserva",
                    "datos": null
                })

            }else{

                response.status(400).json({
                    "mensaje": "Máximo de personas 8",
                    "datos": null
                })

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