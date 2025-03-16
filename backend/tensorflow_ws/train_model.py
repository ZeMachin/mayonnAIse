import tensorflow as tf
import re
import string

from tensorflow.keras import layers

def train_model():
    return "success"

def custom_standardization(input_data):
    lowercase = tf.strings.lower(input_data)
    stripped_html = tf.strings.regex_replace(lowercase, '<br />', ' ')
    return tf.strings.regex_replace(stripped_html,
                                    '[%s]' % re.escape(string.punctuation),
                                    '')

def create_model():

    max_features = 10000
    sequence_length = 250 
    embedding_dim = 16

    vectorize_layer = layers.TextVectorization(
        standardize=custom_standardization,
        max_tokens=max_features,
        output_mode='int',
        output_sequence_length=sequence_length)

    def vectorize_text(text, label):
        text = tf.expand_dims(text, -1)
        return vectorize_layer(text), label

    model = tf.keras.Sequential(
        [
        layers.Embedding(max_features, embedding_dim),
        layers.Dropout(0.2),
        layers.GlobalAveragePooling1D(),
        layers.Dropout(0.2),
        layers.Dense(1, activation='sigmoid')]
        )

    # model.add(tf.layers.dense({ units: 100, inputShape: [100] }))
    # model.add(tf.layers.activation({ activation: 'softmax' }))
    # model.add(tf.layers.dense({ units: 1 }));
    # model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.sgd(0.001), metrics: ['accuracy'] })

    # print the model architecture
    model.summary()
    return model