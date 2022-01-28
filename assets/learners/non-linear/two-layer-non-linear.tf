importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");
____
//js – Two-layer non linear model for regression (tfjs)

var model = tf.sequential();
model.add(tf.layers.dense({
  inputShape: [1],
  units: 50,
  activation: 'sigmoid',
  kernelInitialiser: 'leCunNormal' }));
model.add(tf.layers.dense({ units: 1 }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

//set up the training data set
var xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
var ys = tf.tensor2d([-3, -1, 1, 3, 500, 70], [6, 1]);

//train the model on the data set
model.fit(xs, ys, { epochs: 50 }).then(result => {console.log(`INFO:ml.model: Model trained`); console.dir(result)});

//define the callback for testing the model on new data
var test = (x) => { return model.predict(tf.tensor2d([x], [1, 1])).dataSync()[0]; }
____
//route the test data into the model

var w = 0;
input = (x,id) => {
	console.log(">toModel:   "+[id,x]);
	let p = test(x);
	output(p, 0);
};
