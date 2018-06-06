import React from 'react';
import Svg, {
  Path
} from 'react-native-svg';

export default ({ fill = '#323334' }) => (
  <Svg width={20} height={17} viewBox="0 0 20 17">
    <Path fill={fill} d="M815.12781,935 C815.608783,935 816.000061,935.391277 816,935.872251 C816,936.353163 815.608723,936.74444 815.127749,936.74444 C815.052476,936.74444 814.979879,936.733852 814.910143,936.71584 L812.22329,940.566972 C812.302458,940.69823 812.348888,940.851333 812.348888,941.01545 C812.348888,941.496363 811.957611,941.88764 811.476637,941.88764 C810.995664,941.88764 810.604387,941.496363 810.604387,941.01545 C810.604387,940.962813 810.609863,940.911454 810.61887,940.861313 L808.336316,939.212835 C808.192523,939.317196 808.016357,939.379509 807.825526,939.379509 C807.645952,939.379509 807.478974,939.324864 807.34011,939.231517 L804.970234,941.07472 C805.018977,941.183401 805.046664,941.303401 805.046664,941.429973 C805.046664,941.910946 804.655387,942.302224 804.174414,942.302224 C803.912811,942.302224 803.67841,942.185936 803.518431,942.002954 L801.386972,943.139728 C801.392084,943.17776 801.395613,943.216219 801.395613,943.255529 C801.395613,943.736502 801.004336,944.12778 800.523363,944.12778 C800.102328,944.12778 799.749996,943.827963 799.668759,943.430539 L797.632534,943.113805 C797.482899,943.379667 797.198417,943.559849 796.872251,943.559849 C796.391277,943.559849 796,943.168572 796,942.68766 C796,942.206686 796.391277,941.815409 796.87219,941.815409 C797.293224,941.815409 797.645556,942.115226 797.726793,942.51265 L799.763018,942.829384 C799.912653,942.563583 800.197136,942.3834 800.523302,942.3834 C800.744498,942.3834 800.946161,942.466889 801.100117,942.603075 L803.302224,941.428634 C803.303015,940.948392 803.693927,940.557844 804.174414,940.557844 C804.30488,940.557844 804.428227,940.587418 804.539464,940.63896 L806.984979,938.736913 C806.964958,938.663647 806.953336,938.586913 806.953336,938.507319 C806.953336,938.026346 807.344613,937.635129 807.825586,937.635129 C808.30656,937.635129 808.697837,938.026407 808.697837,938.507319 C808.697837,938.575838 808.689135,938.642167 808.674105,938.706183 L810.930979,940.3361 C811.080553,940.215735 811.270167,940.143261 811.476698,940.143261 C811.570958,940.143261 811.661627,940.158778 811.74682,940.186587 L814.410975,936.36795 C814.313247,936.227017 814.25556,936.056328 814.25556,935.872251 C814.25556,935.391277 814.646837,935 815.12781,935 Z M797.17651,946.399623 C797.344522,946.399623 797.480769,946.535871 797.480769,946.703883 L797.480769,951.206921 C797.480769,951.374933 797.344522,951.51118 797.17651,951.51118 L796.567991,951.51118 C796.399979,951.51118 796.263732,951.374933 796.263732,951.206921 L796.263732,946.703883 C796.263732,946.535871 796.399979,946.399623 796.567991,946.399623 L797.17651,946.399623 Z M800.827622,946.399623 C800.995634,946.399623 801.131881,946.535871 801.131881,946.703883 L801.131881,951.206921 C801.131881,951.374933 800.995634,951.51118 800.827622,951.51118 L800.219103,951.51118 C800.051091,951.51118 799.914844,951.374933 799.914844,951.206921 L799.914844,946.703883 C799.914844,946.535871 800.051091,946.399623 800.219103,946.399623 L800.827622,946.399623 Z M804.478734,943.113623 C804.646746,943.113623 804.782993,943.24987 804.782993,943.417882 L804.782993,951.206921 C804.782993,951.374933 804.646746,951.51118 804.478734,951.51118 L803.870215,951.51118 C803.702203,951.51118 803.565956,951.374933 803.565956,951.206921 L803.565956,943.417882 C803.565956,943.24987 803.702203,943.113623 803.870215,943.113623 L804.478734,943.113623 Z M808.129846,940.557844 C808.297858,940.557844 808.434105,940.694092 808.434105,940.862104 L808.434105,951.206921 C808.434105,951.374933 808.297858,951.51118 808.129846,951.51118 L807.521327,951.51118 C807.353315,951.51118 807.217068,951.374933 807.217068,951.206921 L807.217068,940.862104 C807.217068,940.694092 807.353315,940.557844 807.521327,940.557844 L808.129846,940.557844 Z M811.780958,943.113623 C811.94897,943.113623 812.085217,943.24987 812.085217,943.417882 L812.085217,951.206921 C812.085217,951.374933 811.94897,951.51118 811.780958,951.51118 L811.172439,951.51118 C811.004427,951.51118 810.86818,951.374933 810.86818,951.206921 L810.86818,943.417882 C810.86818,943.24987 811.004427,943.113623 811.172439,943.113623 L811.780958,943.113623 Z M815.43207,939.097399 C815.600082,939.097399 815.736329,939.233647 815.736329,939.401659 L815.736329,951.206921 C815.736329,951.374933 815.600082,951.51118 815.43207,951.51118 L814.823551,951.51118 C814.655539,951.51118 814.519292,951.374933 814.519292,951.206921 L814.519292,939.401659 C814.519292,939.233647 814.655539,939.097399 814.823551,939.097399 L815.43207,939.097399 Z" transform="translate(-796 -935)"/>
  </Svg>)
