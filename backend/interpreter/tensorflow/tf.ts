import * as tf from '@tensorflow/tfjs-node';
// Use `tfjs-node-gpu`. Note that `tfjs` is imported indirectly by `tfjs-node-gpu`.
// import tf from '@tensorflow/tfjs-node-gpu';
const MODEL_STORAGE_PATH = 'file://./tensorflow/tf-model';

const test = async () => {
    let created = false;
    let model = await loadModel();
    if (!model) {
        created = true;
        console.log('no model found, creating model...')
        model = await createModel();
    }
    console.log(`model ${created ? 'created' : 'found'}, saving model...`);
    await saveModel(model);
    console.log('model saved');
}

const createModel = async () => {
    // Define a simple model.
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 100, activation: 'relu', inputShape: [10] }));
    model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    const xs = tf.randomNormal([100, 10]);
    const ys = tf.randomNormal([100, 1]);

    // Train the model.
    await model.fit(xs, ys, {
        epochs: 10,
        callbacks: {
            onEpochEnd: (epoch: any, log: any) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
        }
    });

    return model;
}

const saveModel = async (model: any) => {
    await model.save(MODEL_STORAGE_PATH);
}

const loadModel = async () => {
    console.log('loading model...');
    try {
        return await tf.loadLayersModel(MODEL_STORAGE_PATH + '/model.json');
    } catch (err) {
        console.error(err); 
    }
    return false;
}

export { test }