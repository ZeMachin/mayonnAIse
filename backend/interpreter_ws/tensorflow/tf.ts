// import tf, { Tensor } from '@tensorflow/tfjs-node-gpu';
import tf, { Tensor } from '@tensorflow/tfjs';
import { Category, CategoryProperty } from '../model/category.model';
import { CATEGORIES } from '../data/categories';
const MODEL_STORAGE_PATH = 'file://./tensorflow/tf-model';
const NUMBER_EPOCHS = 10;

const loadOrCreateModel = async (modelName: string, pseudoClasses: number) => {
    let model = await loadModel(modelName);
    // TODO: get model from Rest API
    // if (!model) {
    //     console.log('no model found, creating model...')
    //     model = await createModel(pseudoClasses);
    //     await saveModel(model, modelName);
    // }
    return model;
}

const createModel = async (pseudoClasses: number) => {
    // TODO: Call python service through Rest API
    const model = false;
    return model;
}

// const createModel = async (pseudoClasses: number) => {
//     // Define our model.
//     const model = tf.sequential();

//     model.add(tf.layers.dense({ units: 100, inputShape: [100] }));
//     model.add(tf.layers.activation({ activation: 'softmax' }));
//     model.add(tf.layers.dense({ units: 1 }));
//     model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.sgd(0.001), metrics: ['accuracy'] });

//     // print the model architecture
//     model.summary();
//     return model;
// }

const trainModel = async (model: any, query: string, predicted: Category | CategoryProperty, correct: Category | CategoryProperty) => {
    console.log('Using feedback to train model');
    // TODO: read doc on how to pass data
    // await model.fit(data1, data1, {
    //     epochs: NUMBER_EPOCHS,
    //     callbacks: {
    //         onEpochEnd: (epoch: any, log: any) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
    //     }
    // });
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
    const model = loadOrCreateModel('category', CATEGORIES.length);
    // TODO: transform query to Tensor
    if(!model) {
        throw Error(`Error: model couldn't be found.`)
    } else {
        const entry: string[] = [query];
        const predictions = (await model as tf.LayersModel).predict(tf.tensor2d(entry)); 
        console.log('predictions:', predictions);
        const mean = tf.mean(predictions as Tensor);
        console.log('mean:', mean);
        const result = mean.arraySync();
        console.log('mean array sync:', result);
        // TODO: get category from array of probabilities
        return CATEGORIES[0];
    }
    // TODO: return most likely class
    // TODO: show confidence in logs
}

const predictProperty = async (category: Category, query: string): Promise<CategoryProperty> => {
    const model = loadOrCreateModel(`properties/${category.name}`, category.properties.length);
    // TODO: Get a prediction based on category & query 
    // TODO: Return prediction
    return CATEGORIES[0].properties[0];
}

const feedback = (query: string, categoryPredicted: Category, categoryPropertyPredicted: CategoryProperty, correct: boolean, correctCategory?: Category, correctCategoryProperty?: CategoryProperty) => {
    // If prediction entirely correct
    if(correct && !correctCategory && !correctCategoryProperty) { 
        const modelCategories = loadOrCreateModel(`category`, CATEGORIES.length);
        trainModel(modelCategories, query, categoryPredicted, categoryPredicted);
        const modelProperties = loadOrCreateModel(`properties/${categoryPredicted.name}`, categoryPredicted.properties.length);
        trainModel(modelProperties, query, categoryPropertyPredicted, categoryPropertyPredicted);
    }
    // If category correct only
    else if(!correct && correctCategory && categoryPredicted.name === correctCategory.name && correctCategoryProperty) {
        const modelCategories = loadOrCreateModel(`category`, CATEGORIES.length);
        trainModel(modelCategories, query, categoryPredicted, correctCategory);
        const modelProperties = loadOrCreateModel(`properties/${categoryPredicted.name}`, categoryPredicted.properties.length);
        trainModel(modelProperties, query, categoryPropertyPredicted, correctCategoryProperty);
    }
    // If category incorrect
        else if(!correct && correctCategory && categoryPredicted.name !== correctCategory.name) {
        const modelCategories = loadOrCreateModel(`category`, CATEGORIES.length);
        trainModel(modelCategories, query, categoryPredicted, correctCategory);
    }
    // TODO: export data to make graphs
}

export { predictCategory, predictProperty }