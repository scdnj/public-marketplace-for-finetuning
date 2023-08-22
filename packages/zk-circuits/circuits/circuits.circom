pragma circom 2.0.0;

include "../node_modules/circomlib-ml/circuits/Dense.circom";
include "../node_modules/circomlib-ml/circuits/GlobalAveragePooling2D.circom";
include "../node_modules/circomlib-ml/circuits/Conv2D.circom";
include "../node_modules/circomlib-ml/circuits/BatchNormalization2D.circom";
include "../node_modules/circomlib-ml/circuits/AveragePooling2D.circom";
include "../node_modules/circomlib-ml/circuits/ArgMax.circom";

template Model() {
signal input in[50][50][1];
signal input conv2d_weights[3][3][1][4];
signal input conv2d_bias[4];
signal input batch_normalization_a[4];
signal input batch_normalization_b[4];
signal input dense_weights[4][2];
signal input dense_bias[2];
signal output out[1];

component conv2d = Conv2D(50, 50, 1, 4, 3, 1);
component batch_normalization = BatchNormalization2D(48, 48, 4);
component average_pooling2d = AveragePooling2D(48, 48, 4, 2, 2, 250000000000);
component global_average_pooling2d = GlobalAveragePooling2D(24, 24, 4, 1736111111);
component dense = Dense(4, 2);
component softmax = ArgMax(2);

for (var i0 = 0; i0 < 50; i0++) {
    for (var i1 = 0; i1 < 50; i1++) {
        for (var i2 = 0; i2 < 1; i2++) {
            conv2d.in[i0][i1][i2] <== in[i0][i1][i2];
}}}
for (var i0 = 0; i0 < 3; i0++) {
    for (var i1 = 0; i1 < 3; i1++) {
        for (var i2 = 0; i2 < 1; i2++) {
            for (var i3 = 0; i3 < 4; i3++) {
                conv2d.weights[i0][i1][i2][i3] <== conv2d_weights[i0][i1][i2][i3];
}}}}
for (var i0 = 0; i0 < 4; i0++) {
    conv2d.bias[i0] <== conv2d_bias[i0];
}
for (var i0 = 0; i0 < 48; i0++) {
    for (var i1 = 0; i1 < 48; i1++) {
        for (var i2 = 0; i2 < 4; i2++) {
            batch_normalization.in[i0][i1][i2] <== conv2d.out[i0][i1][i2];
}}}
for (var i0 = 0; i0 < 4; i0++) {
    batch_normalization.a[i0] <== batch_normalization_a[i0];
}
for (var i0 = 0; i0 < 4; i0++) {
    batch_normalization.b[i0] <== batch_normalization_b[i0];
}
for (var i0 = 0; i0 < 48; i0++) {
    for (var i1 = 0; i1 < 48; i1++) {
        for (var i2 = 0; i2 < 4; i2++) {
            average_pooling2d.in[i0][i1][i2] <== batch_normalization.out[i0][i1][i2];
}}}
for (var i0 = 0; i0 < 24; i0++) {
    for (var i1 = 0; i1 < 24; i1++) {
        for (var i2 = 0; i2 < 4; i2++) {
            global_average_pooling2d.in[i0][i1][i2] <== average_pooling2d.out[i0][i1][i2];
}}}
for (var i0 = 0; i0 < 4; i0++) {
    dense.in[i0] <== global_average_pooling2d.out[i0];
}
for (var i0 = 0; i0 < 4; i0++) {
    for (var i1 = 0; i1 < 2; i1++) {
        dense.weights[i0][i1] <== dense_weights[i0][i1];
}}
for (var i0 = 0; i0 < 2; i0++) {
    dense.bias[i0] <== dense_bias[i0];
}
for (var i0 = 0; i0 < 2; i0++) {
    softmax.in[i0] <== dense.out[i0];
}
out[0] <== softmax.out;

}

component main = Model();
