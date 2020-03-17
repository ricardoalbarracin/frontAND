
class MinJusticiaMessage {

    constructor() {}

    readonly message: any = {
        advice: "Recuerde que para se atendido en el consultorio jurídico, debe ser: persona natural de escasos recursos, con ingresos de hasta 3 SMLMV, mayor de edad, que resida en estratos 1,2 y 3. El ministerio de " + 
            "justicia y del derecho se exonera de cualquier circunstancia generada entre el consultorio jurídico y el cuidadano."
    };

    getMessage(key: string) {
        return this.message[key];
    }
}