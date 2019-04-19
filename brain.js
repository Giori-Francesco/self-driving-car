class Brain {
    constructor(param) {
        if (param instanceof Array) {
            this.createModel(param);
        }
    }

    createModel(param) {
        this.model = tf.sequential();
        param.forEach((nodesPerLayer, index) => {
            let layer;
            if (index == 0) {
                layer = tf.layers.dense({
                    units: nodesPerLayer,
                    inputShape: [nodesPerLayer, 2]
                });
            } else if (index == param.length - 1) {
                layer = tf.layers.dense({
                    units: nodesPerLayer,
                    activation: 'softmax'
                });
            } else {
                layer = tf.layers.dense({
                    units: nodesPerLayer,
                    activation: 'sigmoid'
                });
            }
            this.model.add(layer);
        });
        // this.model.compile({});
    }

    predict(arr) {
        const xs = tf.tensor2d(arr);
        const ys = this.model.predict(xs);
        let output = ys.dataSync();
        console.log(output);
        return output;
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