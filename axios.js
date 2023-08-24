export const obtenerdata = async (url) => {
    try {
        const respuesta = await axios.get(url);
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}
