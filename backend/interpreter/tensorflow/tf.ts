import * as tf from '@tensorflow/tfjs-node';
import { Category, CategoryProperty } from '../model/category.model';
import { CATEGORIES } from '../data/categories';
// Use `tfjs-node-gpu`. Note that `tfjs` is imported indirectly by `tfjs-node-gpu`.
// import tf from '@tensorflow/tfjs-node-gpu';
const MODEL_STORAGE_PATH = 'file://./tensorflow/tf-model';
const NUMBER_EPOCHS = 10;
const MAX_FEATURES = 10000;
const SEQUENCE_LENGTH = 25;
const LEARNING_RATE = 3e-4;
const TOKENIZER = {};
const VOCAB_PATH = 'file://./tensorflow/vocab/dictonary.json';

const loadOrCreateModel = async (modelName: string, pseudoClasses: number) => {
    let model = await loadModel(modelName);
    if (!model) {
        console.log('no model found, creating model...')
        model = await createModel(pseudoClasses);
        await saveModel(model, modelName);
    }
    return model;
}

const createModel = async (pseudoClasses: number) => {
    // Define our model.
    const model = tf.sequential();

    // // 1st layer: a 1d convolutional network
    // model.add(tf.layers.conv1d({
    //     filters: 100,
    //     kernelSize: 3,
    //     strides: 1,
    //     activation: 'relu',
    //     padding: 'valid',
    //     inputShape: [MAX_FEATURES, SEQUENCE_LENGTH],
    // }));

    // // transform 2d input into 1d
    // model.add(tf.layers.globalMaxPool1d({}));

    // // the final layer with one neuron
    // model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    // // here are some tuning, read in the TF docs for more
    // model.compile({
    //     optimizer: tf.train.adam(LEARNING_RATE),
    //     loss: 'binaryCrossentropy',
    //     metrics: ['accuracy'],
    // });

    model.add(tf.layers.dense({ units: 100, inputShape: [SEQUENCE_LENGTH] }));
    model.add(tf.layers.activation({ activation: 'softmax' }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.sgd(0.001), metrics: ['accuracy'] });

    // print the model architecture
    model.summary();
    return model;
}

const tokenize = (text: string) => {
    text = text.toLowerCase();
    text = text.replace(/[!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n]/g, '');
    const split_text = text.split('');
    const tokens: string[] = [];
    split_text.forEach((element: string) => {
        if (TOKENIZER[element as keyof typeof TOKENIZER] != undefined) {
            tokens.push(TOKENIZER[element as keyof typeof TOKENIZER]);
        }
    });

    // create a list of slices of the list of tokens
    let i = 0;
    const tokenized_text_segments = [];
    while (i + 50 < Math.max(tokens.length, 100)) {
        const new_slice = tokens.slice(i, i + 100);
        while (new_slice.length < 100) {
            new_slice.push('');
        }
        tokenized_text_segments.push(new_slice);
        i = i + 50;
    }
    return tokenized_text_segments;
}

//TODO: load tokenizer on init, save after each call
// load the tokenizer from json
const loadTokenizer = () => {
    let tokenizer = fetch(VOCAB_PATH).then(response => {
        return response.json();
    })
    return tokenizer;
}

const trainModel = async (model: any, data1: any, data2: any) => {
    // Train the model.
    console.log('using feedback to train model');
    await model.fit(data1, data1, {
        epochs: NUMBER_EPOCHS,
        callbacks: {
            onEpochEnd: (epoch: any, log: any) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
        }
    });
}

const saveModel = async (model: any, modelName: string) => {
    console.log('saving model:', modelName);
    try {
        await model.save(`${MODEL_STORAGE_PATH}/${modelName}`);
    } catch (err) {
        console.error(err);
    }
}

const loadModel = async (modelName: string) => {
    console.log('loading model:', modelName);
    try {
        return await tf.loadLayersModel(`${MODEL_STORAGE_PATH}/${modelName}/model.json`);
    } catch (err) {
        console.error(err);
    }
    return false;
}

const predictCategory = async (query: string): Promise<Category> => {
    const model = loadOrCreateModel('category-predicter', CATEGORIES.length);
    // TODO: transform query to Tensor
    const predictions = (await model).predict(tf.linspace(0, 1, 100));
    // TODO: return most likely class
    // TODO: show confidence in logs
    return CATEGORIES[0];
}

const predictProperty = async (category: Category, query: string): Promise<CategoryProperty> => {
    const model = loadOrCreateModel(`property-predicter/${category.name}`, category.properties.length);
    // Get a prediction based on category & query 
    // Return prediction
    return CATEGORIES[0].properties[0];
}

const feedback = (query: string, categoryPredicted: Category, categoryPropertyPredicted: CategoryProperty, correct: boolean, correctCategory?: Category, correctCategoryProperty?: CategoryProperty) => {
    // Use data to train model
    // TODO: export data to make graphs
}

export { predictCategory, predictProperty }