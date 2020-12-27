import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { FaTemperatureLow, FaTemperatureHigh, FaLocationArrow } from 'react-icons/fa';

import Loader from '../Loader';

const data = {
    "lat":50.45,
    "lon":30.52,
    "timezone":"Europe/Kiev",
    "timezone_offset":7200,
    "current":{
       "dt":1609003050,
       "sunrise":1608962280,
       "sunset":1608991142,
       "temp":0.62,
       "feels_like":-4.62,
       "pressure":1017,
       "humidity":74,
       "dew_point":-3.07,
       "uvi":0,
       "clouds":75,
       "visibility":10000,
       "wind_speed":4,
       "wind_deg":280,
       "weather":[
          {
             "id":803,
             "main":"Clouds",
             "description":"broken clouds",
             "icon":"04n"
          }
       ]
    },
    "hourly":[
       {
          "dt":1609002000,
          "temp":0.62,
          "feels_like":-4.22,
          "pressure":1017,
          "humidity":74,
          "dew_point":-3.07,
          "uvi":0,
          "clouds":75,
          "visibility":10000,
          "wind_speed":3.43,
          "wind_deg":289,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609005600,
          "temp":0,
          "feels_like":-4,
          "pressure":1018,
          "humidity":85,
          "dew_point":-1.96,
          "uvi":0,
          "clouds":82,
          "visibility":10000,
          "wind_speed":2.45,
          "wind_deg":278,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609009200,
          "temp":-0.22,
          "feels_like":-4.21,
          "pressure":1019,
          "humidity":91,
          "dew_point":-1.36,
          "uvi":0,
          "clouds":93,
          "visibility":10000,
          "wind_speed":2.57,
          "wind_deg":254,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609012800,
          "temp":-0.33,
          "feels_like":-4.5,
          "pressure":1020,
          "humidity":93,
          "dew_point":-1.21,
          "uvi":0,
          "clouds":96,
          "visibility":10000,
          "wind_speed":2.86,
          "wind_deg":260,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609016400,
          "temp":-0.92,
          "feels_like":-5.56,
          "pressure":1020,
          "humidity":95,
          "dew_point":-1.54,
          "uvi":0,
          "clouds":95,
          "visibility":10000,
          "wind_speed":3.47,
          "wind_deg":254,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609020000,
          "temp":-1.76,
          "feels_like":-6.56,
          "pressure":1021,
          "humidity":96,
          "dew_point":-3.55,
          "uvi":0,
          "clouds":82,
          "visibility":10000,
          "wind_speed":3.57,
          "wind_deg":259,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609023600,
          "temp":-1.92,
          "feels_like":-6.9,
          "pressure":1021,
          "humidity":96,
          "dew_point":-3.84,
          "uvi":0,
          "clouds":66,
          "visibility":10000,
          "wind_speed":3.8,
          "wind_deg":269,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609027200,
          "temp":-1.97,
          "feels_like":-7.02,
          "pressure":1022,
          "humidity":96,
          "dew_point":-3.88,
          "uvi":0,
          "clouds":54,
          "visibility":10000,
          "wind_speed":3.89,
          "wind_deg":277,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609030800,
          "temp":-2.11,
          "feels_like":-6.95,
          "pressure":1022,
          "humidity":96,
          "dew_point":-3.87,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":3.57,
          "wind_deg":276,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609034400,
          "temp":-2.25,
          "feels_like":-6.93,
          "pressure":1022,
          "humidity":96,
          "dew_point":-3.91,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":3.32,
          "wind_deg":274,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609038000,
          "temp":-2.34,
          "feels_like":-6.97,
          "pressure":1022,
          "humidity":96,
          "dew_point":-3.98,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":3.22,
          "wind_deg":279,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609041600,
          "temp":-2.4,
          "feels_like":-6.78,
          "pressure":1023,
          "humidity":97,
          "dew_point":-4.02,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":2.88,
          "wind_deg":284,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609045200,
          "temp":-2.45,
          "feels_like":-6.42,
          "pressure":1023,
          "humidity":97,
          "dew_point":-3.95,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":2.29,
          "wind_deg":283,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609048800,
          "temp":-2.52,
          "feels_like":-6.16,
          "pressure":1024,
          "humidity":97,
          "dew_point":-3.86,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":1.8,
          "wind_deg":267,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609052400,
          "temp":-2.29,
          "feels_like":-5.72,
          "pressure":1025,
          "humidity":97,
          "dew_point":-3.69,
          "uvi":0.14,
          "clouds":12,
          "visibility":10000,
          "wind_speed":1.54,
          "wind_deg":264,
          "weather":[
             {
                "id":801,
                "main":"Clouds",
                "description":"few clouds",
                "icon":"02d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609056000,
          "temp":-1.71,
          "feels_like":-4.93,
          "pressure":1025,
          "humidity":96,
          "dew_point":-3.46,
          "uvi":0.33,
          "clouds":25,
          "visibility":10000,
          "wind_speed":1.32,
          "wind_deg":260,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609059600,
          "temp":-1.15,
          "feels_like":-4.06,
          "pressure":1025,
          "humidity":96,
          "dew_point":-3.37,
          "uvi":0.49,
          "clouds":38,
          "visibility":10000,
          "wind_speed":0.98,
          "wind_deg":248,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609063200,
          "temp":-0.82,
          "feels_like":-3.46,
          "pressure":1026,
          "humidity":95,
          "dew_point":-3.32,
          "uvi":0.57,
          "clouds":43,
          "visibility":10000,
          "wind_speed":0.63,
          "wind_deg":202,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609066800,
          "temp":-0.57,
          "feels_like":-3.66,
          "pressure":1026,
          "humidity":95,
          "dew_point":-3.29,
          "uvi":0.48,
          "clouds":45,
          "visibility":10000,
          "wind_speed":1.33,
          "wind_deg":175,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609070400,
          "temp":-0.44,
          "feels_like":-3.99,
          "pressure":1025,
          "humidity":95,
          "dew_point":-3.1,
          "uvi":0.31,
          "clouds":47,
          "visibility":10000,
          "wind_speed":2,
          "wind_deg":156,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609074000,
          "temp":-0.79,
          "feels_like":-4.45,
          "pressure":1025,
          "humidity":96,
          "dew_point":-3,
          "uvi":0.12,
          "clouds":63,
          "visibility":10000,
          "wind_speed":2.12,
          "wind_deg":156,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609077600,
          "temp":-1.62,
          "feels_like":-5.38,
          "pressure":1024,
          "humidity":97,
          "dew_point":-3.22,
          "uvi":0,
          "clouds":46,
          "visibility":10000,
          "wind_speed":2.14,
          "wind_deg":145,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609081200,
          "temp":-1.85,
          "feels_like":-5.87,
          "pressure":1024,
          "humidity":97,
          "dew_point":-3.39,
          "uvi":0,
          "clouds":35,
          "visibility":10000,
          "wind_speed":2.47,
          "wind_deg":129,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609084800,
          "temp":-1.91,
          "feels_like":-6.44,
          "pressure":1024,
          "humidity":96,
          "dew_point":-3.59,
          "uvi":0,
          "clouds":31,
          "visibility":10000,
          "wind_speed":3.16,
          "wind_deg":128,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609088400,
          "temp":-1.86,
          "feels_like":-6.81,
          "pressure":1025,
          "humidity":96,
          "dew_point":-3.83,
          "uvi":0,
          "clouds":31,
          "visibility":10000,
          "wind_speed":3.77,
          "wind_deg":137,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609092000,
          "temp":-1.78,
          "feels_like":-7.07,
          "pressure":1025,
          "humidity":95,
          "dew_point":-4.08,
          "uvi":0,
          "clouds":26,
          "visibility":10000,
          "wind_speed":4.25,
          "wind_deg":142,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609095600,
          "temp":-1.87,
          "feels_like":-7.19,
          "pressure":1024,
          "humidity":95,
          "dew_point":-4.21,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":4.27,
          "wind_deg":141,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609099200,
          "temp":-1.89,
          "feels_like":-7.44,
          "pressure":1024,
          "humidity":95,
          "dew_point":-4.36,
          "uvi":0,
          "clouds":0,
          "visibility":10000,
          "wind_speed":4.59,
          "wind_deg":142,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609102800,
          "temp":-1.87,
          "feels_like":-7.79,
          "pressure":1024,
          "humidity":94,
          "dew_point":-4.66,
          "uvi":0,
          "clouds":5,
          "visibility":10000,
          "wind_speed":5.1,
          "wind_deg":138,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609106400,
          "temp":-1.82,
          "feels_like":-8.12,
          "pressure":1024,
          "humidity":94,
          "dew_point":-4.96,
          "uvi":0,
          "clouds":24,
          "visibility":10000,
          "wind_speed":5.66,
          "wind_deg":140,
          "weather":[
             {
                "id":801,
                "main":"Clouds",
                "description":"few clouds",
                "icon":"02n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609110000,
          "temp":-1.77,
          "feels_like":-8.27,
          "pressure":1023,
          "humidity":93,
          "dew_point":-5.23,
          "uvi":0,
          "clouds":39,
          "visibility":10000,
          "wind_speed":5.92,
          "wind_deg":142,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609113600,
          "temp":-1.78,
          "feels_like":-8.41,
          "pressure":1022,
          "humidity":93,
          "dew_point":-5.39,
          "uvi":0,
          "clouds":49,
          "visibility":10000,
          "wind_speed":6.11,
          "wind_deg":136,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609117200,
          "temp":-1.73,
          "feels_like":-8.51,
          "pressure":1022,
          "humidity":92,
          "dew_point":-5.57,
          "uvi":0,
          "clouds":69,
          "visibility":10000,
          "wind_speed":6.3,
          "wind_deg":134,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609120800,
          "temp":-1.6,
          "feels_like":-8.68,
          "pressure":1021,
          "humidity":92,
          "dew_point":-5.72,
          "uvi":0,
          "clouds":82,
          "visibility":10000,
          "wind_speed":6.76,
          "wind_deg":133,
          "weather":[
             {
                "id":803,
                "main":"Clouds",
                "description":"broken clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609124400,
          "temp":-1.28,
          "feels_like":-8.38,
          "pressure":1020,
          "humidity":92,
          "dew_point":-5.65,
          "uvi":0,
          "clouds":88,
          "visibility":10000,
          "wind_speed":6.84,
          "wind_deg":139,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609128000,
          "temp":-1,
          "feels_like":-8.13,
          "pressure":1020,
          "humidity":91,
          "dew_point":-5.48,
          "uvi":0,
          "clouds":91,
          "visibility":10000,
          "wind_speed":6.91,
          "wind_deg":143,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609131600,
          "temp":-0.79,
          "feels_like":-8.1,
          "pressure":1020,
          "humidity":92,
          "dew_point":-5.14,
          "uvi":0,
          "clouds":93,
          "visibility":10000,
          "wind_speed":7.23,
          "wind_deg":137,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04n"
             }
          ],
          "pop":0
       },
       {
          "dt":1609135200,
          "temp":-0.33,
          "feels_like":-7.94,
          "pressure":1019,
          "humidity":91,
          "dew_point":-4.91,
          "uvi":0,
          "clouds":94,
          "visibility":10000,
          "wind_speed":7.71,
          "wind_deg":134,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609138800,
          "temp":-0.17,
          "feels_like":-7.93,
          "pressure":1019,
          "humidity":92,
          "dew_point":-4.48,
          "uvi":0.03,
          "clouds":100,
          "visibility":10000,
          "wind_speed":7.98,
          "wind_deg":133,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0.34
       },
       {
          "dt":1609142400,
          "temp":0.07,
          "feels_like":-7.99,
          "pressure":1018,
          "humidity":92,
          "dew_point":-4.22,
          "uvi":0.07,
          "clouds":100,
          "visibility":10000,
          "wind_speed":8.46,
          "wind_deg":132,
          "weather":[
             {
                "id":500,
                "main":"Rain",
                "description":"light rain",
                "icon":"10d"
             }
          ],
          "pop":0.29,
          "rain":{
             "1h":0.11
          }
       },
       {
          "dt":1609146000,
          "temp":0.29,
          "feels_like":-7.77,
          "pressure":1018,
          "humidity":91,
          "dew_point":-3.71,
          "uvi":0.1,
          "clouds":100,
          "visibility":10000,
          "wind_speed":8.48,
          "wind_deg":134,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0.25
       },
       {
          "dt":1609149600,
          "temp":0.72,
          "feels_like":-6.96,
          "pressure":1017,
          "humidity":89,
          "dew_point":-3.08,
          "uvi":0.27,
          "clouds":100,
          "visibility":10000,
          "wind_speed":7.96,
          "wind_deg":140,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0.1
       },
       {
          "dt":1609153200,
          "temp":0.73,
          "feels_like":-6.49,
          "pressure":1016,
          "humidity":90,
          "dew_point":-2.48,
          "uvi":0.23,
          "clouds":100,
          "visibility":10000,
          "wind_speed":7.33,
          "wind_deg":145,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0.06
       },
       {
          "dt":1609156800,
          "temp":0.7,
          "feels_like":-6.39,
          "pressure":1015,
          "humidity":91,
          "dew_point":-1.99,
          "uvi":0.15,
          "clouds":100,
          "visibility":10000,
          "wind_speed":7.17,
          "wind_deg":144,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0.06
       },
       {
          "dt":1609160400,
          "temp":1.01,
          "feels_like":-5.9,
          "pressure":1014,
          "humidity":91,
          "dew_point":-1.08,
          "uvi":0.1,
          "clouds":100,
          "visibility":10000,
          "wind_speed":6.98,
          "wind_deg":138,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609164000,
          "temp":1.47,
          "feels_like":-5.67,
          "pressure":1014,
          "humidity":89,
          "dew_point":-0.1,
          "uvi":0,
          "clouds":100,
          "visibility":10000,
          "wind_speed":7.34,
          "wind_deg":127,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "pop":0
       },
       {
          "dt":1609167600,
          "temp":1.62,
          "feels_like":-6.33,
          "pressure":1013,
          "humidity":90,
          "dew_point":0.3,
          "uvi":0,
          "clouds":100,
          "visibility":10000,
          "wind_speed":8.56,
          "wind_deg":122,
          "weather":[
             {
                "id":500,
                "main":"Rain",
                "description":"light rain",
                "icon":"10n"
             }
          ],
          "pop":0.46,
          "rain":{
             "1h":0.2
          }
       },
       {
          "dt":1609171200,
          "temp":1.47,
          "feels_like":-6.24,
          "pressure":1013,
          "humidity":92,
          "dew_point":0.4,
          "uvi":0,
          "clouds":100,
          "visibility":10000,
          "wind_speed":8.24,
          "wind_deg":130,
          "weather":[
             {
                "id":501,
                "main":"Rain",
                "description":"moderate rain",
                "icon":"10n"
             }
          ],
          "pop":0.76,
          "rain":{
             "1h":1.21
          }
       }
    ],
    "daily":[
       {
          "dt":1608973200,
          "sunrise":1608962280,
          "sunset":1608991142,
          "temp":{
             "day":-0.16,
             "min":-1.98,
             "max":0.68,
             "night":-0.92,
             "eve":-0.27,
             "morn":-1.2
          },
          "feels_like":{
             "day":-4.41,
             "night":-5.56,
             "eve":-4.69,
             "morn":-5.34
          },
          "pressure":1016,
          "humidity":97,
          "dew_point":-1.7,
          "wind_speed":3.12,
          "wind_deg":268,
          "weather":[
             {
                "id":800,
                "main":"Clear",
                "description":"clear sky",
                "icon":"01d"
             }
          ],
          "clouds":5,
          "pop":0,
          "uvi":0.41
       },
       {
          "dt":1609059600,
          "sunrise":1609048693,
          "sunset":1609077587,
          "temp":{
             "day":-1.15,
             "min":-2.52,
             "max":-0.44,
             "night":-1.87,
             "eve":-1.85,
             "morn":-2.34
          },
          "feels_like":{
             "day":-4.06,
             "night":-7.79,
             "eve":-5.87,
             "morn":-6.97
          },
          "pressure":1025,
          "humidity":96,
          "dew_point":-3.37,
          "wind_speed":0.98,
          "wind_deg":248,
          "weather":[
             {
                "id":802,
                "main":"Clouds",
                "description":"scattered clouds",
                "icon":"03d"
             }
          ],
          "clouds":38,
          "pop":0,
          "uvi":0.57
       },
       {
          "dt":1609146000,
          "sunrise":1609135102,
          "sunset":1609164034,
          "temp":{
             "day":0.29,
             "min":-1.82,
             "max":2.47,
             "night":2.47,
             "eve":1.62,
             "morn":-1.28
          },
          "feels_like":{
             "day":-7.77,
             "night":-4.28,
             "eve":-6.33,
             "morn":-8.38
          },
          "pressure":1018,
          "humidity":91,
          "dew_point":-3.71,
          "wind_speed":8.48,
          "wind_deg":134,
          "weather":[
             {
                "id":501,
                "main":"Rain",
                "description":"moderate rain",
                "icon":"10d"
             }
          ],
          "clouds":100,
          "pop":1,
          "rain":5.03,
          "uvi":0.27
       },
       {
          "dt":1609232400,
          "sunrise":1609221508,
          "sunset":1609250485,
          "temp":{
             "day":5.93,
             "min":2.48,
             "max":6.8,
             "night":2.69,
             "eve":4.86,
             "morn":3.64
          },
          "feels_like":{
             "day":0.5,
             "night":-1.34,
             "eve":0.84,
             "morn":-2.94
          },
          "pressure":1006,
          "humidity":91,
          "dew_point":4.72,
          "wind_speed":6.03,
          "wind_deg":162,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "clouds":100,
          "pop":0.88,
          "uvi":0.14
       },
       {
          "dt":1609322400,
          "sunrise":1609307911,
          "sunset":1609336938,
          "temp":{
             "day":7.24,
             "min":2.99,
             "max":8.07,
             "night":6.55,
             "eve":7.51,
             "morn":3.81
          },
          "feels_like":{
             "day":2.98,
             "night":2.94,
             "eve":4.19,
             "morn":-0.88
          },
          "pressure":1011,
          "humidity":94,
          "dew_point":6.37,
          "wind_speed":4.88,
          "wind_deg":185,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "clouds":100,
          "pop":0,
          "uvi":0.5
       },
       {
          "dt":1609408800,
          "sunrise":1609394311,
          "sunset":1609423394,
          "temp":{
             "day":6.92,
             "min":5.63,
             "max":6.92,
             "night":5.63,
             "eve":6.76,
             "morn":6.57
          },
          "feels_like":{
             "day":4.29,
             "night":2.45,
             "eve":4.52,
             "morn":3.5
          },
          "pressure":1010,
          "humidity":96,
          "dew_point":6.4,
          "wind_speed":2.55,
          "wind_deg":172,
          "weather":[
             {
                "id":500,
                "main":"Rain",
                "description":"light rain",
                "icon":"10d"
             }
          ],
          "clouds":100,
          "pop":0.27,
          "rain":0.11,
          "uvi":1
       },
       {
          "dt":1609495200,
          "sunrise":1609480708,
          "sunset":1609509853,
          "temp":{
             "day":4.68,
             "min":3.74,
             "max":4.99,
             "night":3.79,
             "eve":4.38,
             "morn":4.02
          },
          "feels_like":{
             "day":2.87,
             "night":0.66,
             "eve":1.59,
             "morn":1.11
          },
          "pressure":1017,
          "humidity":90,
          "dew_point":3.31,
          "wind_speed":0.48,
          "wind_deg":15,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "clouds":89,
          "pop":0,
          "uvi":1
       },
       {
          "dt":1609581600,
          "sunrise":1609567101,
          "sunset":1609596314,
          "temp":{
             "day":4.56,
             "min":3.74,
             "max":5.45,
             "night":4.05,
             "eve":4.43,
             "morn":3.79
          },
          "feels_like":{
             "day":2.24,
             "night":1.27,
             "eve":1.36,
             "morn":1
          },
          "pressure":1019,
          "humidity":93,
          "dew_point":3.54,
          "wind_speed":1.31,
          "wind_deg":32,
          "weather":[
             {
                "id":804,
                "main":"Clouds",
                "description":"overcast clouds",
                "icon":"04d"
             }
          ],
          "clouds":100,
          "pop":0,
          "uvi":1
       }
    ]
};
const dayArray = [
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
const monthArray = [
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan'
];
const getCurrentIcon = (type) => {
    return `http://openweathermap.org/img/wn/${type}@2x.png`
};
const getCurrentDate = (dateUTC) => {
    return new Date(+`${dateUTC}000`)
};
const getRotateWind = (deg) => {
    return `rotate(${deg}deg)`
};
const getDailyArrayInfo = (array) => {
    return array.map((element, index) => {
        const dayOfWeek = dayArray[getCurrentDate(element.dt).getUTCDay()];
        const month = monthArray[getCurrentDate(element.dt).getUTCMonth()]
        const day = getCurrentDate(element.dt).getUTCDate();
        const year = getCurrentDate(element.dt).getUTCFullYear();
        return <DayWeatherInfoContainer key={index}>
            <DayText>{dayOfWeek}</DayText>
            <DayText>{`${month} ${day} ${year}`}</DayText>
            <ImageWeatherDays src={getCurrentIcon(element.weather[0].icon)} size={45}/>
            <InfoTempText>{`Min ${Math.round(element.temp.min)}°C`}</InfoTempText><InfoTempText>{`Max ${Math.round(element.temp.max)}°C`}</InfoTempText>
            <div>
                <IconArrowWind deg={element.wind_deg - 45} size={15}/>
                <p>{`${element.wind_speed} m/s`}</p>
            </div>
        </DayWeatherInfoContainer>
    })
};

const CurrentWeatherInfo = () => {
    const dataWeatherRedux = useSelector(s => s.CurrentDataReducer);
    const locationRedux = useSelector(s => s.CurrentLocationReducer);
    const [loading, setLoading] = useState(true);
    const [dailyInfo, setDailyInfo] = useState(null)
    const [currentData, setCurrentData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    
   useEffect(() => {
      if(dataWeatherRedux.response !== null && !dataWeatherRedux.isBusy && dataWeatherRedux.isError === null){
         setCurrentData(dataWeatherRedux.response.current)
         setDailyData(dataWeatherRedux.response.daily)
         setDailyInfo(getDailyArrayInfo(dataWeatherRedux.response.daily))
         setLoading(false)
      } else {
         setLoading(true)
      }
   },[dataWeatherRedux])

    return (
        <Widget>
           {loading ? 
           <Loader/> : 
           <>
            <MainInfo>
                <h3>{`${locationRedux.city}, ${locationRedux.country}`}</h3>
                <p>{`${dayArray[getCurrentDate(currentData.dt).getUTCDay()]}, ${monthArray[getCurrentDate(currentData.dt).getUTCMonth()]} ${getCurrentDate(currentData.dt).getUTCDate()} ${getCurrentDate(currentData.dt).getUTCFullYear()}`}</p>
                <p>{currentData.weather[0].main}</p>
            </MainInfo>
            <WeatherIcon>
                <ImageWeatherDays src={getCurrentIcon(currentData.weather[0].icon)} size={120}/>
                <WeatherGroup>
                    <MainTemp>
                        <p>{Math.round(currentData.temp)}°C</p>
                    </MainTemp>
                    <SecondaryTemp>
                        <h4>Feels</h4>
                        <p>{Math.round(currentData.feels_like)}°C</p>
                    </SecondaryTemp>
                </WeatherGroup>
            </WeatherIcon>
            <InfoCurrentDate>
                <InfoSun>
                    <div>
                        <IconContext.Provider value={{ size: '22px', color: "#ffdd00" }}>
                            <GiSunrise/>
                        </IconContext.Provider>
                        <h4>Sunrise at</h4>
                        <p>{`${getCurrentDate(currentData.sunrise).getHours()}:${getCurrentDate(currentData.sunrise).getMinutes()}`}</p>
                    </div>
                    <div>
                        <IconContext.Provider value={{ size: '22px', color: "#e38202" }}>
                            <GiSunset/>
                        </IconContext.Provider>
                        <h4>Sunset at</h4>
                        <p>{`${getCurrentDate(currentData.sunset).getHours()}:${getCurrentDate(currentData.sunset).getMinutes()}`}</p>
                    </div>
                </InfoSun>
                <InfoPressure>
                    <h4>Pressure</h4>
                    <p>{currentData.pressure}mm</p>
                </InfoPressure>
                <InfoHumidity>
                    <h4>Humidity</h4>
                    <p>{currentData.humidity}%</p>
                </InfoHumidity>
                <InfoWind>
                    <h4>Wind</h4>
                    <div>
                        <IconArrowWind deg={currentData.wind_deg - 45} size={30}/>
                        <p>{currentData.wind_speed} m/s</p>
                    </div>
                </InfoWind>
            </InfoCurrentDate>
            <DaysWeatherInfo>
                {dailyInfo}
            </DaysWeatherInfo>
            </>
            }
        </Widget>
    )
}

export default CurrentWeatherInfo

const Widget = styled.div`
    width: 80%;
    max-width: 715px;
    margin: 0 auto;
    padding: 15px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.3);
    display: grid;
    grid-template: 
        "mainInfo mainInfo mainInfo"
        "iconWeather infoData infoData"
        "daysInfo daysInfo daysInfo";
   position: relative;
   min-height: 120px;
`
const WeatherIcon = styled.div`
    position: relative;
    grid-area: iconWeather;
    display: flex;
    align-items: center;
`
const WeatherGroup = styled.div`
    display: flex;
    flex-direction: column;
`
const MainTemp = styled.div`
    margin: 0;
    font-size: 50px;
    display: flex;
    justify-content: start;
    p{
        margin: 0;
    }
`
const SecondaryTemp = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    h4{
        margin: 0;
        margin-left: 10px;
    }
    p{
        margin: 0;
    }
`
const MainInfo = styled.div`
    grid-area: mainInfo;
    h3{
        margin: 0;
        font-size: 16px;
    }
    p{
        margin: 0;
        font-size: 14px;
    }

`
const DaysWeatherInfo = styled.div`
    grid-area: daysInfo;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    padding-top: 30px;
`
const InfoCurrentDate = styled.div`
    grid-area: infoData;
    display: grid;
    grid-template: 
        "sun sun sun"
        "press hum wind" / 1fr 1fr 1fr
    ;
`
const InfoSun = styled.div`
    display: flex;
    justify-content: center;
    grid-area: sun;
    margin-bottom: 5px;
    div{
        display: flex;
        margin: 0 10px;
        align-items: center;
        h4 {
            margin: 0;
            font-weight: 500;
            font-size: 12px;
        }
        p{
            margin: 0;
            margin-left: 5px;
            font-size: 15px;
        }
    }
`
const InfoPressure = styled.div`
    grid-area: press;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        margin: 0;
        margin-bottom: 5px;
    }
    p {
        margin: 0;
        font-size: 20px;
    }
`
const InfoHumidity = styled.div`
    grid-area: hum;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        margin: 0;
        margin-bottom: 5px;
    }
    p {
        margin: 0;
        font-size: 20px;
    }
`
const InfoWind = styled.div`
    grid-area: wind;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        margin: 0 0 5px 0;
    }
    div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        p{
            margin: 0;
            display: inline-block;
            font-size: 20px;
        }
    }
    
`
const IconArrowWind = styled(FaLocationArrow)`
    ${props => 
    `transform: rotate(${props.deg}deg);
    height: ${props.size}px`};
    color: #b5b5b5;
`
const DayWeatherInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        display: flex;
        padding-top: 10px;
        p{
            font-size: 10px;
            margin: 0 0 0 5px;
        }
    }
`
const DayText = styled.p`
    margin: 0;
    font-size: 12px;
`
const ImageWeatherDays = styled.img`
    ${props => 
    `height: ${props.size}px`};
`
const InfoTempText = styled.p`
    margin: 0;
    font-size: 10px;
`