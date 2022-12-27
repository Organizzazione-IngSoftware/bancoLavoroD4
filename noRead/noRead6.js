class Car3 {
    constructor(type, model, color) {
        this.type = type;
        this.model = model;
        this.color = color;
    }
    description() {
        return this.color + ", " + this.model + ", " + this.type;
    };
}
var fiatPuntoBianca = new Car3('Fiat', 'Punto', 'White');
console.log(fiatPuntoBianca);
console.log(fiatPuntoBianca.description());



class Suv extends Car3 {
    description() {
        return this.color + ", " + this.model + ", " + this.type + ", SUV";
    };
}
var NissanQuashquai = new Suv('Nissan', 'Quashquai', 'Black');
console.log(NissanQuashquai);
console.log(NissanQuashquai.description());