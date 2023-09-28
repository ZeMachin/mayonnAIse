import * as tf from '@tensorflow/tfjs-node';
import { Category, CategoryProperty } from '../model/category.model';
import { CATEGORIES } from '../data/categories';
// Use `tfjs-node-gpu`. Note that `tfjs` is imported indirectly by `tfjs-node-gpu`.
// import tf from '@tensorflow/tfjs-node-gpu';
const MODEL_STORAGE_PATH = 'file://./tensorflow/tf-model';
const NUMBER_EPOCHS = 10;

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
    // TODO: Call python service through Rest API
    const model = false;
    return model;
}

const trainModel = async (model: any, query: string, predicted: Category | CategoryProperty, correct: Category | CategoryProperty) => {
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
    // If prediction entirely correct
    if(correct && !correctCategory && !correctCategoryProperty) { 
        const modelCategories = loadOrCreateModel(`category-predicter`, CATEGORIES.length);
        trainModel(modelCategories, query, categoryPredicted, categoryPredicted);
        const modelProperties = loadOrCreateModel(`property-predicter/${categoryPredicted.name}`, categoryPredicted.properties.length);
        trainModel(modelProperties, query, categoryPropertyPredicted, categoryPropertyPredicted);
    }
    // If category correct only
    else if(!correct && correctCategory && categoryPredicted.name === correctCategory.name && correctCategoryProperty) {
        const modelCategories = loadOrCreateModel(`category-predicter`, CATEGORIES.length);
        trainModel(modelCategories, query, categoryPredicted, correctCategory);
        const modelProperties = loadOrCreateModel(`property-predicter/${categoryPredicted.name}`, categoryPredicted.properties.length);
        trainModel(modelProperties, query, categoryPropertyPredicted, correctCategoryProperty);
    }
    // If category incorrect
    else if(!correct && correctCategory && categoryPredicted.name !== correctCategory.name) {
        const modelCategories = loadOrCreateModel(`category-predicter`, CATEGORIES.length);
        trainModel(modelCategories, query, categoryPredicted, correctCategory);
    }
    // TODO: export data to make graphs
}

export { predictCategory, predictProperty }