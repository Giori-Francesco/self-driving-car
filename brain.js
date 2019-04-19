class Brain {
    constructor(param) {
        if (param instanceof Array) {
            this.weignts = [];
            this.layers = [];
            this.biases = [];
            param.forEach((layerNodes, index) => {
                this.weights.push([]);
                this.layers.push([]);
                for (let i = 0; i < layerNodes; i++) {
                    this.weights[index].push(random(-1, 1));
                    this.layers[index].push()
                }
            });
            this.createModel();
        }
    }

    createModel() {
        
    }
}

/*
    brain
        weights
            l1
                w1
                w2
                w3
                w4
                w5
            l2
                w1
                w2
                w3
                w4
            l3
                w1
                w2
                w3
                w4
        layers
            l1
                n1
                n2
                n3
            l2
                n1
                n2
                n3
            l3
                n1
                n2
                n3
        biases
            b1
            b2
            b3


*/