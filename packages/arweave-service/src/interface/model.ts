export interface IAgeModel {
  in: number[][]
  conv2d_weights: number[]
  conv2d_bias: number[]
  batch_normalization_a: number[]
  batch_normalization_b: number[]
  dense_weights: number[]
  dense_bias: number[]
}