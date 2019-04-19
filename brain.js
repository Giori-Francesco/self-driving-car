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
    }

    predict(arr) {
        const xs = tf.tensor2d(arr);
        const ys = this.model.predict(xs);
        let output = ys.dataSync();
        console.log(output);
        return output;
    }
}