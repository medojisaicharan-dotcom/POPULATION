/**
 * Global Population Intelligence - Subnational States & Provinces Dataset
 * Official State / Province / Territory population figures from national statistical agencies
 * Sources: US Census Bureau, Census of India / MoHFW, China NBS, IBGE Brazil, Destatis Germany,
 *          ONS UK, Statistics Canada, Australian Bureau of Statistics, Rosstat, etc.
 * Reference Year: 2023 - 2024
 */

export const STATES_BY_COUNTRY = {
  // United States - 50 states + DC + Puerto Rico (US Census Bureau 2024)
  "United States": [
    { name: "California", capital: "Sacramento", population: 38965193, share: 11.4, density: 97, source: "US Census Bureau 2024" },
    { name: "Texas", capital: "Austin", population: 30503301, share: 8.9, density: 45, source: "US Census Bureau 2024" },
    { name: "Florida", capital: "Tallahassee", population: 22610726, share: 6.6, density: 162, source: "US Census Bureau 2024" },
    { name: "New York", capital: "Albany", population: 19571216, share: 5.7, density: 160, source: "US Census Bureau 2024" },
    { name: "Pennsylvania", capital: "Harrisburg", population: 12961683, share: 3.8, density: 111, source: "US Census Bureau 2024" },
    { name: "Illinois", capital: "Springfield", population: 12549689, share: 3.7, density: 87, source: "US Census Bureau 2024" },
    { name: "Ohio", capital: "Columbus", population: 11785935, share: 3.4, density: 111, source: "US Census Bureau 2024" },
    { name: "Georgia", capital: "Atlanta", population: 11029227, share: 3.2, density: 74, source: "US Census Bureau 2024" },
    { name: "North Carolina", capital: "Raleigh", population: 10835491, share: 3.2, density: 85, source: "US Census Bureau 2024" },
    { name: "Michigan", capital: "Lansing", population: 10037261, share: 2.9, density: 68, source: "US Census Bureau 2024" },
    { name: "New Jersey", capital: "Trenton", population: 9290841, share: 2.7, density: 488, source: "US Census Bureau 2024" },
    { name: "Virginia", capital: "Richmond", population: 8715698, share: 2.5, density: 85, source: "US Census Bureau 2024" },
    { name: "Washington", capital: "Olympia", population: 7812880, share: 2.3, density: 45, source: "US Census Bureau 2024" },
    { name: "Arizona", capital: "Phoenix", population: 7431344, share: 2.2, density: 25, source: "US Census Bureau 2024" },
    { name: "Tennessee", capital: "Nashville", population: 7126489, share: 2.1, density: 66, source: "US Census Bureau 2024" },
    { name: "Massachusetts", capital: "Boston", population: 7001399, share: 2.0, density: 348, source: "US Census Bureau 2024" },
    { name: "Indiana", capital: "Indianapolis", population: 6862199, share: 2.0, density: 73, source: "US Census Bureau 2024" },
    { name: "Missouri", capital: "Jefferson City", population: 6196156, share: 1.8, density: 35, source: "US Census Bureau 2024" },
    { name: "Maryland", capital: "Annapolis", population: 6180253, share: 1.8, density: 245, source: "US Census Bureau 2024" },
    { name: "Wisconsin", capital: "Madison", population: 5910955, share: 1.7, density: 42, source: "US Census Bureau 2024" },
    { name: "Colorado", capital: "Denver", population: 5877610, share: 1.7, density: 22, source: "US Census Bureau 2024" },
    { name: "Minnesota", capital: "Saint Paul", population: 5737915, share: 1.7, density: 28, source: "US Census Bureau 2024" },
    { name: "South Carolina", capital: "Columbia", population: 5373555, share: 1.6, density: 68, source: "US Census Bureau 2024" },
    { name: "Alabama", capital: "Montgomery", population: 5108468, share: 1.5, density: 39, source: "US Census Bureau 2024" },
    { name: "Louisiana", capital: "Baton Rouge", population: 4573749, share: 1.3, density: 41, source: "US Census Bureau 2024" },
    { name: "Kentucky", capital: "Frankfort", population: 4526154, share: 1.3, density: 44, source: "US Census Bureau 2024" },
    { name: "Oregon", capital: "Salem", population: 4233358, share: 1.2, density: 17, source: "US Census Bureau 2024" },
    { name: "Oklahoma", capital: "Oklahoma City", population: 4053824, share: 1.2, density: 23, source: "US Census Bureau 2024" },
    { name: "Connecticut", capital: "Hartford", population: 3617176, share: 1.1, density: 288, source: "US Census Bureau 2024" },
    { name: "Utah", capital: "Salt Lake City", population: 3417734, share: 1.0, density: 16, source: "US Census Bureau 2024" },
    { name: "Nevada", capital: "Carson City", population: 3194176, share: 0.9, density: 11, source: "US Census Bureau 2024" },
    { name: "Iowa", capital: "Des Moines", population: 3207004, share: 0.9, density: 22, source: "US Census Bureau 2024" },
    { name: "Arkansas", capital: "Little Rock", population: 3067732, share: 0.9, density: 23, source: "US Census Bureau 2024" },
    { name: "Kansas", capital: "Topeka", population: 2940546, share: 0.9, density: 14, source: "US Census Bureau 2024" },
    { name: "Mississippi", capital: "Jackson", population: 2939690, share: 0.9, density: 24, source: "US Census Bureau 2024" },
    { name: "New Mexico", capital: "Santa Fe", population: 2114371, share: 0.6, density: 7, source: "US Census Bureau 2024" },
    { name: "Nebraska", capital: "Lincoln", population: 1978379, share: 0.6, density: 10, source: "US Census Bureau 2024" },
    { name: "Idaho", capital: "Boise", population: 1964726, share: 0.6, density: 9, source: "US Census Bureau 2024" },
    { name: "West Virginia", capital: "Charleston", population: 1770071, share: 0.5, density: 28, source: "US Census Bureau 2024" },
    { name: "Hawaii", capital: "Honolulu", population: 1435138, share: 0.4, density: 86, source: "US Census Bureau 2024" },
    { name: "New Hampshire", capital: "Concord", population: 1402054, share: 0.4, density: 60, source: "US Census Bureau 2024" },
    { name: "Maine", capital: "Augusta", population: 1395722, share: 0.4, density: 17, source: "US Census Bureau 2024" },
    { name: "Montana", capital: "Helena", population: 1132812, share: 0.3, density: 3, source: "US Census Bureau 2024" },
    { name: "Rhode Island", capital: "Providence", population: 1095962, share: 0.3, density: 410, source: "US Census Bureau 2024" },
    { name: "Delaware", capital: "Dover", population: 1031890, share: 0.3, density: 206, source: "US Census Bureau 2024" },
    { name: "South Dakota", capital: "Pierre", population: 919318, share: 0.3, density: 5, source: "US Census Bureau 2024" },
    { name: "North Dakota", capital: "Bismarck", population: 783926, share: 0.2, density: 4, source: "US Census Bureau 2024" },
    { name: "Alaska", capital: "Juneau", population: 733406, share: 0.2, density: 0.5, source: "US Census Bureau 2024" },
    { name: "District of Columbia", capital: "Washington", population: 678972, share: 0.2, density: 4325, source: "US Census Bureau 2024" },
    { name: "Vermont", capital: "Montpelier", population: 647464, share: 0.2, density: 27, source: "US Census Bureau 2024" },
    { name: "Wyoming", capital: "Cheyenne", population: 584057, share: 0.2, density: 2.3, source: "US Census Bureau 2024" },
    { name: "Puerto Rico", capital: "San Juan", population: 3205691, share: 0.9, density: 358, source: "US Census Bureau 2024" }
  ],

  // India - 28 States + 8 Union Territories (MoHFW & National Census Projections 2024)
  "India": [
    { name: "Uttar Pradesh", capital: "Lucknow", population: 241066000, share: 16.7, density: 1000, source: "MoHFW Population Projection 2024" },
    { name: "Bihar", capital: "Patna", population: 130725000, share: 9.1, density: 1388, source: "MoHFW Population Projection 2024" },
    { name: "Maharashtra", capital: "Mumbai", population: 126385000, share: 8.8, density: 411, source: "MoHFW Population Projection 2024" },
    { name: "West Bengal", capital: "Kolkata", population: 102552000, share: 7.1, density: 1155, source: "MoHFW Population Projection 2024" },
    { name: "Madhya Pradesh", capital: "Bhopal", population: 86569000, share: 6.0, density: 281, source: "MoHFW Population Projection 2024" },
    { name: "Rajasthan", capital: "Jaipur", population: 81032000, share: 5.6, density: 237, source: "MoHFW Population Projection 2024" },
    { name: "Tamil Nadu", capital: "Chennai", population: 76860000, share: 5.3, density: 591, source: "MoHFW Population Projection 2024" },
    { name: "Gujarat", capital: "Gandhinagar", population: 72152000, share: 5.0, density: 368, source: "MoHFW Population Projection 2024" },
    { name: "Karnataka", capital: "Bengaluru", population: 69595000, share: 4.8, density: 363, source: "MoHFW Population Projection 2024" },
    { name: "Andhra Pradesh", capital: "Amaravati", population: 54110000, share: 3.8, density: 332, source: "MoHFW Population Projection 2024" },
    { name: "Odisha", capital: "Bhubaneswar", population: 47250000, share: 3.3, density: 303, source: "MoHFW Population Projection 2024" },
    { name: "Telangana", capital: "Hyderabad", population: 38090000, share: 2.6, density: 340, source: "MoHFW Population Projection 2024" },
    { name: "Kerala", capital: "Thiruvananthapuram", population: 35776000, share: 2.5, density: 920, source: "MoHFW Population Projection 2024" },
    { name: "Jharkhand", capital: "Ranchi", population: 39466000, share: 2.7, density: 495, source: "MoHFW Population Projection 2024" },
    { name: "Assam", capital: "Dispur", population: 36549000, share: 2.5, density: 466, source: "MoHFW Population Projection 2024" },
    { name: "Punjab", capital: "Chandigarh", population: 30730000, share: 2.1, density: 610, source: "MoHFW Population Projection 2024" },
    { name: "Chhattisgarh", capital: "Raipur", population: 30180000, share: 2.1, density: 223, source: "MoHFW Population Projection 2024" },
    { name: "Haryana", capital: "Chandigarh", population: 29880000, share: 2.1, density: 676, source: "MoHFW Population Projection 2024" },
    { name: "Delhi (NCT)", capital: "New Delhi", population: 21350000, share: 1.5, density: 14396, source: "MoHFW Population Projection 2024" },
    { name: "Jammu and Kashmir", capital: "Srinagar / Jammu", population: 13603000, share: 0.9, density: 322, source: "MoHFW Population Projection 2024" },
    { name: "Uttarakhand", capital: "Dehradun", population: 11637000, share: 0.8, density: 217, source: "MoHFW Population Projection 2024" },
    { name: "Himachal Pradesh", capital: "Shimla", population: 7468000, share: 0.5, density: 134, source: "MoHFW Population Projection 2024" },
    { name: "Tripura", capital: "Agartala", population: 4147000, share: 0.3, density: 395, source: "MoHFW Population Projection 2024" },
    { name: "Meghalaya", capital: "Shillong", population: 3349000, share: 0.2, density: 149, source: "MoHFW Population Projection 2024" },
    { name: "Manipur", capital: "Imphal", population: 3223000, share: 0.2, density: 144, source: "MoHFW Population Projection 2024" },
    { name: "Nagaland", capital: "Kohima", population: 2233000, share: 0.2, density: 135, source: "MoHFW Population Projection 2024" },
    { name: "Goa", capital: "Panaji", population: 1575000, share: 0.1, density: 425, source: "MoHFW Population Projection 2024" },
    { name: "Arunachal Pradesh", capital: "Itanagar", population: 1562000, share: 0.1, density: 19, source: "MoHFW Population Projection 2024" },
    { name: "Puducherry", capital: "Puducherry", population: 1414000, share: 0.1, density: 2886, source: "MoHFW Population Projection 2024" },
    { name: "Mizoram", capital: "Aizawl", population: 1238000, share: 0.1, density: 59, source: "MoHFW Population Projection 2024" },
    { name: "Chandigarh", capital: "Chandigarh", population: 1215000, share: 0.1, density: 10658, source: "MoHFW Population Projection 2024" },
    { name: "Sikkim", capital: "Gangtok", population: 690000, share: 0.05, density: 97, source: "MoHFW Population Projection 2024" },
    { name: "Dadra and Nagar Haveli & Daman and Diu", capital: "Daman", population: 616000, share: 0.04, density: 1021, source: "MoHFW Population Projection 2024" },
    { name: "Andaman and Nicobar Islands", capital: "Port Blair", population: 403000, share: 0.03, density: 49, source: "MoHFW Population Projection 2024" },
    { name: "Ladakh", capital: "Leh", population: 301000, share: 0.02, density: 5, source: "MoHFW Population Projection 2024" },
    { name: "Lakshadweep", capital: "Kavaratti", population: 69000, share: 0.005, density: 2156, source: "MoHFW Population Projection 2024" }
  ],

  // China - Major Provinces & Municipalities (NBS China 2024)
  "China": [
    { name: "Guangdong", capital: "Guangzhou", population: 126840000, share: 9.0, density: 706, source: "National Bureau of Statistics China 2024" },
    { name: "Shandong", capital: "Jinan", population: 101627000, share: 7.2, density: 647, source: "National Bureau of Statistics China 2024" },
    { name: "Henan", capital: "Zhengzhou", population: 98720000, share: 7.0, density: 591, source: "National Bureau of Statistics China 2024" },
    { name: "Jiangsu", capital: "Nanjing", population: 85150000, share: 6.0, density: 829, source: "National Bureau of Statistics China 2024" },
    { name: "Sichuan", capital: "Chengdu", population: 83740000, share: 5.9, density: 172, source: "National Bureau of Statistics China 2024" },
    { name: "Hebei", capital: "Shijiazhuang", population: 74200000, share: 5.3, density: 395, source: "National Bureau of Statistics China 2024" },
    { name: "Hunan", capital: "Changsha", population: 66000000, share: 4.7, density: 312, source: "National Bureau of Statistics China 2024" },
    { name: "Zhejiang", capital: "Hangzhou", population: 65770000, share: 4.7, density: 624, source: "National Bureau of Statistics China 2024" },
    { name: "Anhui", capital: "Hefei", population: 61210000, share: 4.3, density: 438, source: "National Bureau of Statistics China 2024" },
    { name: "Hubei", capital: "Wuhan", population: 58380000, share: 4.1, density: 314, source: "National Bureau of Statistics China 2024" },
    { name: "Guangxi", capital: "Nanning", population: 50470000, share: 3.6, density: 213, source: "National Bureau of Statistics China 2024" },
    { name: "Yunnan", capital: "Kunming", population: 46930000, share: 3.3, density: 119, source: "National Bureau of Statistics China 2024" },
    { name: "Jiangxi", capital: "Nanchang", population: 45280000, share: 3.2, density: 271, source: "National Bureau of Statistics China 2024" },
    { name: "Liaoning", capital: "Shenyang", population: 41970000, share: 3.0, density: 288, source: "National Bureau of Statistics China 2024" },
    { name: "Fujian", capital: "Fuzhou", population: 41880000, share: 3.0, density: 338, source: "National Bureau of Statistics China 2024" },
    { name: "Shaanxi", capital: "Xi'an", population: 39560000, share: 2.8, density: 192, source: "National Bureau of Statistics China 2024" },
    { name: "Guizhou", capital: "Guiyang", population: 38650000, share: 2.7, density: 219, source: "National Bureau of Statistics China 2024" },
    { name: "Shanxi", capital: "Taiyuan", population: 34800000, share: 2.5, density: 222, source: "National Bureau of Statistics China 2024" },
    { name: "Chongqing (Municipality)", capital: "Chongqing", population: 31914000, share: 2.3, density: 387, source: "National Bureau of Statistics China 2024" },
    { name: "Heilongjiang", capital: "Harbin", population: 30990000, share: 2.2, density: 68, source: "National Bureau of Statistics China 2024" },
    { name: "Xinjiang", capital: "Ürümqi", population: 25870000, share: 1.8, density: 16, source: "National Bureau of Statistics China 2024" },
    { name: "Shanghai (Municipality)", capital: "Shanghai", population: 24874000, share: 1.8, density: 3923, source: "National Bureau of Statistics China 2024" },
    { name: "Jilin", capital: "Changchun", population: 23480000, share: 1.7, density: 125, source: "National Bureau of Statistics China 2024" },
    { name: "Beijing (Municipality)", capital: "Beijing", population: 21858000, share: 1.6, density: 1332, source: "National Bureau of Statistics China 2024" },
    { name: "Inner Mongolia", capital: "Hohhot", population: 24000000, share: 1.7, density: 20, source: "National Bureau of Statistics China 2024" },
    { name: "Gansu", capital: "Lanzhou", population: 24920000, share: 1.8, density: 55, source: "National Bureau of Statistics China 2024" },
    { name: "Tianjin (Municipality)", capital: "Tianjin", population: 13630000, share: 1.0, density: 1140, source: "National Bureau of Statistics China 2024" },
    { name: "Hainan", capital: "Haikou", population: 10430000, share: 0.7, density: 297, source: "National Bureau of Statistics China 2024" },
    { name: "Hong Kong (SAR)", capital: "Hong Kong", population: 7500000, share: 0.5, density: 6770, source: "Census and Statistics Department HK 2024" },
    { name: "Ningxia", capital: "Yinchuan", population: 7280000, share: 0.5, density: 110, source: "National Bureau of Statistics China 2024" },
    { name: "Qinghai", capital: "Xining", population: 5950000, share: 0.4, density: 8.3, source: "National Bureau of Statistics China 2024" },
    { name: "Tibet", capital: "Lhasa", population: 3660000, share: 0.3, density: 3.0, source: "National Bureau of Statistics China 2024" },
    { name: "Macau (SAR)", capital: "Macau", population: 683000, share: 0.05, density: 20700, source: "DSEC Macau 2024" }
  ],

  // Brazil - States & Federal District (IBGE 2024)
  "Brazil": [
    { name: "São Paulo", capital: "São Paulo", population: 44411238, share: 20.4, density: 179, source: "IBGE Censo 2024" },
    { name: "Minas Gerais", capital: "Belo Horizonte", population: 20538718, share: 9.4, density: 35, source: "IBGE Censo 2024" },
    { name: "Rio de Janeiro", capital: "Rio de Janeiro", population: 16054524, share: 7.4, density: 367, source: "IBGE Censo 2024" },
    { name: "Bahia", capital: "Salvador", population: 14141626, share: 6.5, density: 25, source: "IBGE Censo 2024" },
    { name: "Paraná", capital: "Curitiba", population: 11444380, share: 5.3, density: 57, source: "IBGE Censo 2024" },
    { name: "Rio Grande do Sul", capital: "Porto Alegre", population: 10882965, share: 5.0, density: 39, source: "IBGE Censo 2024" },
    { name: "Pernambuco", capital: "Recife", population: 9058931, share: 4.2, density: 92, source: "IBGE Censo 2024" },
    { name: "Ceará", capital: "Fortaleza", population: 8794957, share: 4.0, density: 59, source: "IBGE Censo 2024" },
    { name: "Pará", capital: "Belém", population: 8121025, share: 3.7, density: 6.5, source: "IBGE Censo 2024" },
    { name: "Santa Catarina", capital: "Florianópolis", population: 7610361, share: 3.5, density: 80, source: "IBGE Censo 2024" },
    { name: "Goiás", capital: "Goiânia", population: 7056495, share: 3.2, density: 21, source: "IBGE Censo 2024" },
    { name: "Maranhão", capital: "São Luís", population: 6776699, share: 3.1, density: 20, source: "IBGE Censo 2024" },
    { name: "Paraíba", capital: "João Pessoa", population: 3974687, share: 1.8, density: 70, source: "IBGE Censo 2024" },
    { name: "Amazonas", capital: "Manaus", population: 3941613, share: 1.8, density: 2.5, source: "IBGE Censo 2024" },
    { name: "Espírito Santo", capital: "Vitória", population: 3833712, share: 1.8, density: 83, source: "IBGE Censo 2024" },
    { name: "Mato Grosso", capital: "Cuiabá", population: 3658649, share: 1.7, density: 4.0, source: "IBGE Censo 2024" },
    { name: "Rio Grande do Norte", capital: "Natal", population: 3302729, share: 1.5, density: 62, source: "IBGE Censo 2024" },
    { name: "Piauí", capital: "Teresina", population: 3271199, share: 1.5, density: 13, source: "IBGE Censo 2024" },
    { name: "Alagoas", capital: "Maceió", population: 3127683, share: 1.4, density: 112, source: "IBGE Censo 2024" },
    { name: "Distrito Federal", capital: "Brasília", population: 2817381, share: 1.3, density: 489, source: "IBGE Censo 2024" },
    { name: "Mato Grosso do Sul", capital: "Campo Grande", population: 2757013, share: 1.3, density: 7.7, source: "IBGE Censo 2024" },
    { name: "Sergipe", capital: "Aracaju", population: 2210004, share: 1.0, density: 101, source: "IBGE Censo 2024" },
    { name: "Rondônia", capital: "Porto Velho", population: 1581196, share: 0.7, density: 6.6, source: "IBGE Censo 2024" },
    { name: "Tocantins", capital: "Palmas", population: 1511460, share: 0.7, density: 5.4, source: "IBGE Censo 2024" },
    { name: "Acre", capital: "Rio Branco", population: 830018, share: 0.4, density: 5.1, source: "IBGE Censo 2024" },
    { name: "Amapá", capital: "Macapá", population: 733759, share: 0.3, density: 5.1, source: "IBGE Censo 2024" },
    { name: "Roraima", capital: "Boa Vista", population: 636707, share: 0.3, density: 2.8, source: "IBGE Censo 2024" }
  ],

  // Germany - 16 Bundesländer (Destatis 2024)
  "Germany": [
    { name: "North Rhine-Westphalia", capital: "Düsseldorf", population: 17924591, share: 21.2, density: 526, source: "Destatis 2024" },
    { name: "Bavaria", capital: "Munich", population: 13176989, share: 15.6, density: 187, source: "Destatis 2024" },
    { name: "Baden-Württemberg", capital: "Stuttgart", population: 11124642, share: 13.2, density: 311, source: "Destatis 2024" },
    { name: "Lower Saxony", capital: "Hanover", population: 8027031, share: 9.5, density: 168, source: "Destatis 2024" },
    { name: "Hesse", capital: "Wiesbaden", population: 6314004, share: 7.5, density: 299, source: "Destatis 2024" },
    { name: "Saxony", capital: "Dresden", population: 4043002, share: 4.8, density: 220, source: "Destatis 2024" },
    { name: "Rhineland-Palatinate", capital: "Mainz", population: 4106485, share: 4.9, density: 207, source: "Destatis 2024" },
    { name: "Berlin", capital: "Berlin", population: 3677472, share: 4.3, density: 4127, source: "Destatis 2024" },
    { name: "Schleswig-Holstein", capital: "Kiel", population: 2922005, share: 3.5, density: 185, source: "Destatis 2024" },
    { name: "Brandenburg", capital: "Potsdam", population: 2537868, share: 3.0, density: 86, source: "Destatis 2024" },
    { name: "Saxony-Anhalt", capital: "Magdeburg", population: 2186643, share: 2.6, density: 107, source: "Destatis 2024" },
    { name: "Thuringia", capital: "Erfurt", population: 2126846, share: 2.5, density: 131, source: "Destatis 2024" },
    { name: "Hamburg", capital: "Hamburg", population: 1853935, share: 2.2, density: 2455, source: "Destatis 2024" },
    { name: "Mecklenburg-Vorpommern", capital: "Schwerin", population: 1611160, share: 1.9, density: 69, source: "Destatis 2024" },
    { name: "Saarland", capital: "Saarbrücken", population: 983991, share: 1.2, density: 383, source: "Destatis 2024" },
    { name: "Bremen", capital: "Bremen", population: 676463, share: 0.8, density: 1614, source: "Destatis 2024" }
  ],

  // United Kingdom - Countries & Regions (ONS 2024)
  "United Kingdom": [
    { name: "England", capital: "London", population: 57106398, share: 83.2, density: 438, source: "Office for National Statistics 2024" },
    { name: "Scotland", capital: "Edinburgh", population: 5439842, share: 7.9, density: 70, source: "National Records of Scotland 2024" },
    { name: "Wales", capital: "Cardiff", population: 3107494, share: 4.5, density: 150, source: "Office for National Statistics 2024" },
    { name: "Northern Ireland", capital: "Belfast", population: 1910543, share: 2.8, density: 137, source: "NISRA 2024" },
    { name: "Greater London (Region)", capital: "City of London", population: 8866180, share: 12.9, density: 5640, source: "ONS 2024" },
    { name: "South East (Region)", capital: "Guildford", population: 9379830, share: 13.7, density: 491, source: "ONS 2024" },
    { name: "North West (Region)", capital: "Manchester / Liverpool", population: 7422297, share: 10.8, density: 524, source: "ONS 2024" },
    { name: "East of England", capital: "Cambridge", population: 6398497, share: 9.3, density: 335, source: "ONS 2024" },
    { name: "West Midlands", capital: "Birmingham", population: 5954240, share: 8.7, density: 458, source: "ONS 2024" },
    { name: "South West", capital: "Bristol", population: 5712840, share: 8.3, density: 240, source: "ONS 2024" },
    { name: "Yorkshire and the Humber", capital: "Leeds", population: 5542890, share: 8.1, density: 359, source: "ONS 2024" },
    { name: "East Midlands", capital: "Nottingham", population: 4880090, share: 7.1, density: 313, source: "ONS 2024" },
    { name: "North East", capital: "Newcastle upon Tyne", population: 2647140, share: 3.9, density: 308, source: "ONS 2024" }
  ],

  // Canada - 10 Provinces + 3 Territories (Statistics Canada 2024)
  "Canada": [
    { name: "Ontario", capital: "Toronto", population: 15608369, share: 38.9, density: 17, source: "Statistics Canada 2024" },
    { name: "Quebec", capital: "Quebec City", population: 8948540, share: 22.3, density: 6.6, source: "Statistics Canada 2024" },
    { name: "British Columbia", capital: "Victoria", population: 5581127, share: 13.9, density: 6.0, source: "Statistics Canada 2024" },
    { name: "Alberta", capital: "Edmonton", population: 4756408, share: 11.9, density: 7.4, source: "Statistics Canada 2024" },
    { name: "Manitoba", capital: "Winnipeg", population: 1465440, share: 3.7, density: 2.7, source: "Statistics Canada 2024" },
    { name: "Saskatchewan", capital: "Regina", population: 1218976, share: 3.0, density: 2.1, source: "Statistics Canada 2024" },
    { name: "Nova Scotia", capital: "Halifax", population: 1058694, share: 2.6, density: 20, source: "Statistics Canada 2024" },
    { name: "New Brunswick", capital: "Fredericton", population: 834691, share: 2.1, density: 12, source: "Statistics Canada 2024" },
    { name: "Newfoundland and Labrador", capital: "St. John's", population: 538605, share: 1.3, density: 1.5, source: "Statistics Canada 2024" },
    { name: "Prince Edward Island", capital: "Charlottetown", population: 173787, share: 0.4, density: 31, source: "Statistics Canada 2024" },
    { name: "Northwest Territories", capital: "Yellowknife", population: 45668, share: 0.1, density: 0.04, source: "Statistics Canada 2024" },
    { name: "Yukon", capital: "Whitehorse", population: 44975, share: 0.1, density: 0.09, source: "Statistics Canada 2024" },
    { name: "Nunavut", capital: "Iqaluit", population: 40526, share: 0.1, density: 0.02, source: "Statistics Canada 2024" }
  ],

  // Australia - 6 States + 2 Territories (ABS 2024)
  "Australia": [
    { name: "New South Wales", capital: "Sydney", population: 8339347, share: 31.3, density: 10.4, source: "Australian Bureau of Statistics 2024" },
    { name: "Victoria", capital: "Melbourne", population: 6812541, share: 25.6, density: 30.0, source: "Australian Bureau of Statistics 2024" },
    { name: "Queensland", capital: "Brisbane", population: 5459413, share: 20.5, density: 3.2, source: "Australian Bureau of Statistics 2024" },
    { name: "Western Australia", capital: "Perth", population: 2878563, share: 10.8, density: 1.1, source: "Australian Bureau of Statistics 2024" },
    { name: "South Australia", capital: "Adelaide", population: 1851704, share: 7.0, density: 1.9, source: "Australian Bureau of Statistics 2024" },
    { name: "Tasmania", capital: "Hobart", population: 572708, share: 2.1, density: 8.4, source: "Australian Bureau of Statistics 2024" },
    { name: "Australian Capital Territory", capital: "Canberra", population: 466813, share: 1.8, density: 198, source: "Australian Bureau of Statistics 2024" },
    { name: "Northern Territory", capital: "Darwin", population: 252514, share: 0.9, density: 0.19, source: "Australian Bureau of Statistics 2024" }
  ],

  // Nigeria - 36 States + FCT (NPC 2024)
  "Nigeria": [
    { name: "Lagos", capital: "Ikeja", population: 15388000, share: 6.7, density: 4280, source: "NPC Nigeria 2024" },
    { name: "Kano", capital: "Kano", population: 14253000, share: 6.2, density: 708, source: "NPC Nigeria 2024" },
    { name: "Kaduna", capital: "Kaduna", population: 9475000, share: 4.1, density: 206, source: "NPC Nigeria 2024" },
    { name: "Oyo", capital: "Ibadan", population: 8750000, share: 3.8, density: 310, source: "NPC Nigeria 2024" },
    { name: "Katsina", capital: "Katsina", population: 8520000, share: 3.7, density: 353, source: "NPC Nigeria 2024" },
    { name: "Rivers", capital: "Port Harcourt", population: 7650000, share: 3.3, density: 690, source: "NPC Nigeria 2024" },
    { name: "Bauchi", capital: "Bauchi", population: 7210000, share: 3.1, density: 147, source: "NPC Nigeria 2024" },
    { name: "Jigawa", capital: "Dutse", population: 6770000, share: 3.0, density: 292, source: "NPC Nigeria 2024" },
    { name: "Benue", capital: "Makurdi", population: 6420000, share: 2.8, density: 188, source: "NPC Nigeria 2024" },
    { name: "Anambra", capital: "Awka", population: 6100000, share: 2.7, density: 1260, source: "NPC Nigeria 2024" },
    { name: "Federal Capital Territory (Abuja)", capital: "Abuja", population: 3840000, share: 1.7, density: 525, source: "NPC Nigeria 2024" }
  ],

  // Mexico - States (INEGI 2024)
  "Mexico": [
    { name: "State of Mexico", capital: "Toluca", population: 17350000, share: 13.4, density: 775, source: "INEGI 2024" },
    { name: "Mexico City", capital: "Mexico City", population: 9220000, share: 7.1, density: 6187, source: "INEGI 2024" },
    { name: "Jalisco", capital: "Guadalajara", population: 8520000, share: 6.6, density: 108, source: "INEGI 2024" },
    { name: "Veracruz", capital: "Xalapa", population: 8120000, share: 6.3, density: 113, source: "INEGI 2024" },
    { name: "Puebla", capital: "Puebla", population: 6680000, share: 5.2, density: 195, source: "INEGI 2024" },
    { name: "Guanajuato", capital: "Guanajuato", population: 6240000, share: 4.8, density: 204, source: "INEGI 2024" },
    { name: "Nuevo León", capital: "Monterrey", population: 5910000, share: 4.6, density: 92, source: "INEGI 2024" },
    { name: "Chiapas", capital: "Tuxtla Gutiérrez", population: 5620000, share: 4.3, density: 77, source: "INEGI 2024" },
    { name: "Michoacán", capital: "Morelia", population: 4820000, share: 3.7, density: 82, source: "INEGI 2024" },
    { name: "Oaxaca", capital: "Oaxaca", population: 4180000, share: 3.2, density: 44, source: "INEGI 2024" },
    { name: "Baja California", capital: "Mexicali", population: 3820000, share: 3.0, density: 53, source: "INEGI 2024" }
  ],

  // Japan - Selected Prefectures (Statistics Bureau of Japan 2024)
  "Japan": [
    { name: "Tokyo", capital: "Tokyo", population: 14094034, share: 11.4, density: 6420, source: "Statistics Bureau of Japan 2024" },
    { name: "Kanagawa", capital: "Yokohama", population: 9237337, share: 7.5, density: 3820, source: "Statistics Bureau of Japan 2024" },
    { name: "Osaka", capital: "Osaka", population: 8837685, share: 7.1, density: 4640, source: "Statistics Bureau of Japan 2024" },
    { name: "Aichi", capital: "Nagoya", population: 7542415, share: 6.1, density: 1460, source: "Statistics Bureau of Japan 2024" },
    { name: "Saitama", capital: "Saitama", population: 7344765, share: 5.9, density: 1930, source: "Statistics Bureau of Japan 2024" },
    { name: "Chiba", capital: "Chiba", population: 6284480, share: 5.1, density: 1220, source: "Statistics Bureau of Japan 2024" },
    { name: "Hyogo", capital: "Kobe", population: 5465002, share: 4.4, density: 651, source: "Statistics Bureau of Japan 2024" },
    { name: "Hokkaido", capital: "Sapporo", population: 5224614, share: 4.2, density: 62, source: "Statistics Bureau of Japan 2024" },
    { name: "Fukuoka", capital: "Fukuoka", population: 5135214, share: 4.1, density: 1030, source: "Statistics Bureau of Japan 2024" },
    { name: "Shizuoka", capital: "Shizuoka", population: 3633202, share: 2.9, density: 467, source: "Statistics Bureau of Japan 2024" },
    { name: "Hiroshima", capital: "Hiroshima", population: 2799702, share: 2.3, density: 330, source: "Statistics Bureau of Japan 2024" },
    { name: "Kyoto", capital: "Kyoto", population: 2578087, share: 2.1, density: 560, source: "Statistics Bureau of Japan 2024" },
    { name: "Okinawa", capital: "Naha", population: 1467480, share: 1.2, density: 644, source: "Statistics Bureau of Japan 2024" }
  ],

  // Indonesia - Major Provinces (BPS 2024)
  "Indonesia": [
    { name: "West Java", capital: "Bandung", population: 49935858, share: 17.7, density: 1412, source: "BPS Indonesia 2024" },
    { name: "East Java", capital: "Surabaya", population: 41149974, share: 14.6, density: 857, source: "BPS Indonesia 2024" },
    { name: "Central Java", capital: "Semarang", population: 37514436, share: 13.3, density: 1143, source: "BPS Indonesia 2024" },
    { name: "North Sumatra", capital: "Medan", population: 15386640, share: 5.5, density: 211, source: "BPS Indonesia 2024" },
    { name: "Banten", capital: "Serang", population: 12307700, share: 4.4, density: 1274, source: "BPS Indonesia 2024" },
    { name: "Jakarta (Special Capital Region)", capital: "Jakarta", population: 10672100, share: 3.8, density: 16127, source: "BPS Indonesia 2024" },
    { name: "South Sulawesi", capital: "Makassar", population: 9382200, share: 3.3, density: 201, source: "BPS Indonesia 2024" },
    { name: "Lampung", capital: "Bandar Lampung", population: 9176500, share: 3.3, density: 265, source: "BPS Indonesia 2024" },
    { name: "South Sumatra", capital: "Palembang", population: 8750200, share: 3.1, density: 95, source: "BPS Indonesia 2024" },
    { name: "Riau", capital: "Pekanbaru", population: 6614400, share: 2.3, density: 76, source: "BPS Indonesia 2024" },
    { name: "Bali", capital: "Denpasar", population: 4414400, share: 1.6, density: 763, source: "BPS Indonesia 2024" }
  ],

  // Pakistan - Provinces & Territories (PBS 2024)
  "Pakistan": [
    { name: "Punjab", capital: "Lahore", population: 127688922, share: 52.1, density: 622, source: "PBS 7th Census 2024" },
    { name: "Sindh", capital: "Karachi", population: 55696147, share: 22.7, density: 395, source: "PBS 7th Census 2024" },
    { name: "Khyber Pakhtunkhwa", capital: "Peshawar", population: 40856097, share: 16.7, density: 398, source: "PBS 7th Census 2024" },
    { name: "Balochistan", capital: "Quetta", population: 14894402, share: 6.1, density: 43, source: "PBS 7th Census 2024" },
    { name: "Islamabad Capital Territory", capital: "Islamabad", population: 2363863, share: 1.0, density: 2609, source: "PBS 7th Census 2024" },
    { name: "Azad Kashmir", capital: "Muzaffarabad", population: 4045000, share: 1.6, density: 304, source: "PBS Estimates 2024" },
    { name: "Gilgit-Baltistan", capital: "Gilgit", population: 1492000, share: 0.6, density: 21, source: "PBS Estimates 2024" }
  ],

  // Russia - Selected Major Federal Subjects (Rosstat 2024)
  "Russia": [
    { name: "Moscow (Federal City)", capital: "Moscow", population: 13149000, share: 9.1, density: 5134, source: "Rosstat 2024" },
    { name: "Moscow Oblast", capital: "Krasnogorsk", population: 8594000, share: 6.0, density: 194, source: "Rosstat 2024" },
    { name: "Krasnodar Krai", capital: "Krasnodar", population: 5833000, share: 4.0, density: 77, source: "Rosstat 2024" },
    { name: "Saint Petersburg", capital: "Saint Petersburg", population: 5597000, share: 3.9, density: 3998, source: "Rosstat 2024" },
    { name: "Sverdlovsk Oblast", capital: "Yekaterinburg", population: 4239000, share: 2.9, density: 22, source: "Rosstat 2024" },
    { name: "Rostov Oblast", capital: "Rostov-on-Don", population: 4181000, share: 2.9, density: 42, source: "Rosstat 2024" },
    { name: "Republic of Bashkortostan", capital: "Ufa", population: 4077000, share: 2.8, density: 28, source: "Rosstat 2024" },
    { name: "Republic of Tatarstan", capital: "Kazan", population: 4004000, share: 2.8, density: 59, source: "Rosstat 2024" },
    { name: "Chelyabinsk Oblast", capital: "Chelyabinsk", population: 3407000, share: 2.4, density: 39, source: "Rosstat 2024" },
    { name: "Nizhny Novgorod Oblast", capital: "Nizhny Novgorod", population: 3119000, share: 2.2, density: 41, source: "Rosstat 2024" }
  ],

  // France - Regions (INSEE 2024)
  "France": [
    { name: "Île-de-France (Paris Region)", capital: "Paris", population: 12358932, share: 18.1, density: 1029, source: "INSEE 2024" },
    { name: "Auvergne-Rhône-Alpes", capital: "Lyon", population: 8163000, share: 11.9, density: 117, source: "INSEE 2024" },
    { name: "Nouvelle-Aquitaine", capital: "Bordeaux", population: 6085000, share: 8.9, density: 72, source: "INSEE 2024" },
    { name: "Occitanie", capital: "Toulouse", population: 6030000, share: 8.8, density: 83, source: "INSEE 2024" },
    { name: "Hauts-de-France", capital: "Lille", population: 5985000, share: 8.8, density: 188, source: "INSEE 2024" },
    { name: "Grand Est", capital: "Strasbourg", population: 5560000, share: 8.1, density: 97, source: "INSEE 2024" },
    { name: "Provence-Alpes-Côte d'Azur", capital: "Marseille", population: 5120000, share: 7.5, density: 163, source: "INSEE 2024" },
    { name: "Pays de la Loire", capital: "Nantes", population: 3870000, share: 5.7, density: 121, source: "INSEE 2024" },
    { name: "Normandy", capital: "Rouen", population: 3320000, share: 4.9, density: 111, source: "INSEE 2024" },
    { name: "Brittany", capital: "Rennes", population: 3400000, share: 5.0, density: 125, source: "INSEE 2024" }
  ],

  // Italy - Regions (Istat 2024)
  "Italy": [
    { name: "Lombardy", capital: "Milan", population: 10020000, share: 17.0, density: 420, source: "Istat 2024" },
    { name: "Lazio", capital: "Rome", population: 5720000, share: 9.7, density: 332, source: "Istat 2024" },
    { name: "Campania", capital: "Naples", population: 5610000, share: 9.5, density: 410, source: "Istat 2024" },
    { name: "Veneto", capital: "Venice", population: 4850000, share: 8.2, density: 264, source: "Istat 2024" },
    { name: "Sicily", capital: "Palermo", population: 4820000, share: 8.2, density: 187, source: "Istat 2024" },
    { name: "Emilia-Romagna", capital: "Bologna", population: 4440000, share: 7.5, density: 198, source: "Istat 2024" },
    { name: "Piedmont", capital: "Turin", population: 4260000, share: 7.2, density: 168, source: "Istat 2024" },
    { name: "Apulia", capital: "Bari", population: 3910000, share: 6.6, density: 202, source: "Istat 2024" },
    { name: "Tuscany", capital: "Florence", population: 3660000, share: 6.2, density: 159, source: "Istat 2024" }
  ],

  // Spain - Autonomous Communities (INE 2024)
  "Spain": [
    { name: "Andalusia", capital: "Seville", population: 8584147, share: 17.7, density: 98, source: "INE 2024" },
    { name: "Catalonia", capital: "Barcelona", population: 7901963, share: 16.3, density: 246, source: "INE 2024" },
    { name: "Community of Madrid", capital: "Madrid", population: 6870336, share: 14.2, density: 856, source: "INE 2024" },
    { name: "Valencian Community", capital: "Valencia", population: 5130768, share: 10.6, density: 221, source: "INE 2024" },
    { name: "Galicia", capital: "Santiago de Compostela", population: 2699499, share: 5.6, density: 91, source: "INE 2024" },
    { name: "Castile and León", capital: "Valladolid", population: 2383706, share: 4.9, density: 25, source: "INE 2024" },
    { name: "Basque Country", capital: "Vitoria-Gasteiz", population: 2216302, share: 4.6, density: 306, source: "INE 2024" },
    { name: "Canary Islands", capital: "Las Palmas / Santa Cruz", population: 2213016, share: 4.6, density: 297, source: "INE 2024" }
  ],

  // South Korea - Special Cities & Provinces (KOSTAT 2024)
  "South Korea": [
    { name: "Gyeonggi Province", capital: "Suwon", population: 13630000, share: 26.3, density: 1339, source: "KOSTAT 2024" },
    { name: "Seoul Special City", capital: "Seoul", population: 9400000, share: 18.2, density: 15537, source: "KOSTAT 2024" },
    { name: "Busan Metropolitan City", capital: "Busan", population: 3300000, share: 6.4, density: 4285, source: "KOSTAT 2024" },
    { name: "Incheon Metropolitan City", capital: "Incheon", population: 3000000, share: 5.8, density: 2816, source: "KOSTAT 2024" },
    { name: "South Gyeongsang", capital: "Changwon", population: 3260000, share: 6.3, density: 309, source: "KOSTAT 2024" },
    { name: "Daegu Metropolitan City", capital: "Daegu", population: 2370000, share: 4.6, density: 2680, source: "KOSTAT 2024" }
  ],

  // Argentina - Provinces & Autonomous City (INDEC 2024)
  "Argentina": [
    { name: "Buenos Aires Province", capital: "La Plata", population: 17569053, share: 37.7, density: 57, source: "INDEC 2024" },
    { name: "Córdoba", capital: "Córdoba", population: 3978984, share: 8.5, density: 24, source: "INDEC 2024" },
    { name: "Santa Fe", capital: "Santa Fe", population: 3556522, share: 7.6, density: 27, source: "INDEC 2024" },
    { name: "Autonomous City of Buenos Aires (CABA)", capital: "Buenos Aires", population: 3120612, share: 6.7, density: 15372, source: "INDEC 2024" },
    { name: "Mendoza", capital: "Mendoza", population: 2014533, share: 4.3, density: 14, source: "INDEC 2024" },
    { name: "Tucumán", capital: "San Miguel de Tucumán", population: 1703186, share: 3.7, density: 75, source: "INDEC 2024" }
  ],

  // Egypt - Governorates (CAPMAS 2024)
  "Egypt": [
    { name: "Cairo", capital: "Cairo", population: 10250000, share: 9.0, density: 3317, source: "CAPMAS 2024" },
    { name: "Giza", capital: "Giza", population: 9400000, share: 8.2, density: 713, source: "CAPMAS 2024" },
    { name: "Sharqia", capital: "Zagazig", population: 7900000, share: 6.9, density: 1608, source: "CAPMAS 2024" },
    { name: "Dakahlia", capital: "Mansoura", population: 7050000, share: 6.2, density: 2030, source: "CAPMAS 2024" },
    { name: "Alexandria", capital: "Alexandria", population: 5500000, share: 4.8, density: 2391, source: "CAPMAS 2024" }
  ],

  // Netherlands - 12 Provinces (CBS 2024)
  "Netherlands": [
    { name: "South Holland", capital: "The Hague", population: 3804900, share: 21.2, density: 1354, source: "CBS Netherlands 2024" },
    { name: "North Holland", capital: "Haarlem", population: 2952600, share: 16.4, density: 1106, source: "CBS Netherlands 2024" },
    { name: "North Brabant", capital: "'s-Hertogenbosch", population: 2626200, share: 14.6, density: 534, source: "CBS Netherlands 2024" },
    { name: "Gelderland", capital: "Arnhem", population: 2133700, share: 11.9, density: 429, source: "CBS Netherlands 2024" },
    { name: "Utrecht", capital: "Utrecht", population: 1387600, share: 7.7, density: 960, source: "CBS Netherlands 2024" },
    { name: "Overijssel", capital: "Zwolle", population: 1184300, share: 6.6, density: 356, source: "CBS Netherlands 2024" },
    { name: "Limburg", capital: "Maastricht", population: 1128300, share: 6.3, density: 524, source: "CBS Netherlands 2024" },
    { name: "Friesland", capital: "Leeuwarden", population: 659600, share: 3.7, density: 197, source: "CBS Netherlands 2024" },
    { name: "Groningen", capital: "Groningen", population: 596100, share: 3.3, density: 256, source: "CBS Netherlands 2024" },
    { name: "Drenthe", capital: "Assen", population: 502100, share: 2.8, density: 187, source: "CBS Netherlands 2024" },
    { name: "Flevoland", capital: "Lelystad", population: 444700, share: 2.5, density: 315, source: "CBS Netherlands 2024" },
    { name: "Zeeland", capital: "Middelburg", population: 391100, share: 2.2, density: 220, source: "CBS Netherlands 2024" }
  ],

  // Switzerland - Cantons (FSO 2024)
  "Switzerland": [
    { name: "Zurich", capital: "Zurich", population: 1580000, share: 17.6, density: 914, source: "FSO Switzerland 2024" },
    { name: "Bern", capital: "Bern", population: 1050000, share: 11.7, density: 176, source: "FSO Switzerland 2024" },
    { name: "Vaud", capital: "Lausanne", population: 830000, share: 9.3, density: 258, source: "FSO Switzerland 2024" },
    { name: "Aargau", capital: "Aarau", population: 710000, share: 7.9, density: 506, source: "FSO Switzerland 2024" },
    { name: "Geneva", capital: "Geneva", population: 520000, share: 5.8, density: 1843, source: "FSO Switzerland 2024" },
    { name: "St. Gallen", capital: "St. Gallen", population: 525000, share: 5.9, density: 260, source: "FSO Switzerland 2024" },
    { name: "Lucerne", capital: "Lucerne", population: 425000, share: 4.7, density: 285, source: "FSO Switzerland 2024" },
    { name: "Ticino", capital: "Bellinzona", population: 355000, share: 4.0, density: 126, source: "FSO Switzerland 2024" },
    { name: "Valais", capital: "Sion", population: 357000, share: 4.0, density: 68, source: "FSO Switzerland 2024" },
    { name: "Basel-Stadt", capital: "Basel", population: 202000, share: 2.3, density: 5460, source: "FSO Switzerland 2024" }
  ],

  // Singapore - Regions / Planning Areas (SingStat 2024)
  "Singapore": [
    { name: "Central Region", capital: "Downtown Core", population: 922000, share: 15.6, density: 6940, source: "SingStat 2024" },
    { name: "East Region", capital: "Tampines", population: 703000, share: 11.9, density: 7550, source: "SingStat 2024" },
    { name: "North Region", capital: "Woodlands", population: 582000, share: 9.8, density: 4310, source: "SingStat 2024" },
    { name: "North-East Region", capital: "Hougang", population: 943000, share: 15.9, density: 8730, source: "SingStat 2024" },
    { name: "West Region", capital: "Jurong East", population: 928000, share: 15.7, density: 4530, source: "SingStat 2024" }
  ],

  // United Arab Emirates - 7 Emirates (FCSC 2024)
  "United Arab Emirates": [
    { name: "Dubai", capital: "Dubai", population: 3655000, share: 35.9, density: 887, source: "FCSC UAE 2024" },
    { name: "Abu Dhabi", capital: "Abu Dhabi", population: 3780000, share: 37.2, density: 56, source: "FCSC UAE 2024" },
    { name: "Sharjah", capital: "Sharjah", population: 1800000, share: 17.7, density: 695, source: "FCSC UAE 2024" },
    { name: "Ajman", capital: "Ajman", population: 504000, share: 5.0, density: 1946, source: "FCSC UAE 2024" },
    { name: "Ras Al Khaimah", capital: "Ras Al Khaimah", population: 400000, share: 3.9, density: 238, source: "FCSC UAE 2024" },
    { name: "Fujairah", capital: "Fujairah", population: 260000, share: 2.6, density: 224, source: "FCSC UAE 2024" },
    { name: "Umm Al Quwain", capital: "Umm Al Quwain", population: 85000, share: 0.8, density: 110, source: "FCSC UAE 2024" }
  ],

  // Sweden - Major Counties / Län (SCB 2024)
  "Sweden": [
    { name: "Stockholm County", capital: "Stockholm", population: 2440000, share: 23.1, density: 375, source: "Statistics Sweden 2024" },
    { name: "Västra Götaland County", capital: "Gothenburg", population: 1760000, share: 16.7, density: 74, source: "Statistics Sweden 2024" },
    { name: "Skåne County", capital: "Malmö", population: 1420000, share: 13.5, density: 129, source: "Statistics Sweden 2024" },
    { name: "Östergötland County", capital: "Linköping", population: 472000, share: 4.5, density: 44, source: "Statistics Sweden 2024" },
    { name: "Uppsala County", capital: "Uppsala", population: 400000, share: 3.8, density: 48, source: "Statistics Sweden 2024" }
  ],

  // Malaysia - States & Federal Territories (DOSM 2024)
  "Malaysia": [
    { name: "Selangor", capital: "Shah Alam", population: 7210000, share: 21.0, density: 907, source: "DOSM 2024" },
    { name: "Johor", capital: "Johor Bahru", population: 4100000, share: 11.9, density: 214, source: "DOSM 2024" },
    { name: "Sabah", capital: "Kota Kinabalu", population: 3600000, share: 10.5, density: 49, source: "DOSM 2024" },
    { name: "Perak", capital: "Ipoh", population: 2540000, share: 7.4, density: 121, source: "DOSM 2024" },
    { name: "Sarawak", capital: "Kuching", population: 2500000, share: 7.3, density: 20, source: "DOSM 2024" },
    { name: "Kedah", capital: "Alor Setar", population: 2200000, share: 6.4, density: 232, source: "DOSM 2024" },
    { name: "Kuala Lumpur (FT)", capital: "Kuala Lumpur", population: 2000000, share: 5.8, density: 8230, source: "DOSM 2024" },
    { name: "Penang", capital: "George Town", population: 1780000, share: 5.2, density: 1698, source: "DOSM 2024" }
  ],

  // New Zealand - Regions (Stats NZ 2024)
  "New Zealand": [
    { name: "Auckland Region", capital: "Auckland", population: 1739300, share: 33.3, density: 352, source: "Stats NZ 2024" },
    { name: "Canterbury", capital: "Christchurch", population: 687000, share: 13.1, density: 15.5, source: "Stats NZ 2024" },
    { name: "Wellington Region", capital: "Wellington", population: 550500, share: 10.5, density: 68, source: "Stats NZ 2024" },
    { name: "Waikato", capital: "Hamilton", population: 522600, share: 10.0, density: 22, source: "Stats NZ 2024" },
    { name: "Bay of Plenty", capital: "Tauranga", population: 351200, share: 6.7, density: 28, source: "Stats NZ 2024" },
    { name: "Otago", capital: "Dunedin", population: 250000, share: 4.8, density: 7.9, source: "Stats NZ 2024" }
  ],

  // Ghana - Selected Regions (GSS 2024)
  "Ghana": [
    { name: "Greater Accra", capital: "Accra", population: 5450000, share: 16.0, density: 1682, source: "Ghana Statistical Service 2024" },
    { name: "Ashanti", capital: "Kumasi", population: 5440000, share: 15.9, density: 223, source: "Ghana Statistical Service 2024" },
    { name: "Eastern", capital: "Koforidua", population: 2920000, share: 8.6, density: 151, source: "Ghana Statistical Service 2024" },
    { name: "Central", capital: "Cape Coast", population: 2860000, share: 8.4, density: 291, source: "Ghana Statistical Service 2024" },
    { name: "Northern", capital: "Tamale", population: 2310000, share: 6.8, density: 33, source: "Ghana Statistical Service 2024" }
  ],

  // Monaco - Wards / Districts (IMSEE 2024)
  "Monaco": [
    { name: "Monte Carlo", capital: "Monte Carlo", population: 8300, share: 21.3, density: 18863, source: "IMSEE Monaco 2024" },
    { name: "La Condamine", capital: "La Condamine", population: 5100, share: 13.1, density: 17288, source: "IMSEE Monaco 2024" },
    { name: "Fontvieille", capital: "Fontvieille", population: 4400, share: 11.3, density: 13134, source: "IMSEE Monaco 2024" },
    { name: "Monaco-Ville (Le Rocher)", capital: "Monaco-Ville", population: 1100, share: 2.8, density: 5641, source: "IMSEE Monaco 2024" },
    { name: "Larvotto", capital: "Larvotto", population: 5400, share: 13.8, density: 25116, source: "IMSEE Monaco 2024" }
  ],

  // Vatican City
  "Vatican City": [
    { name: "Vatican City State Territory", capital: "Vatican City", population: 764, share: 100.0, density: 1559, source: "Governatorato SCV 2024" }
  ]
};

// Fallback helper to retrieve states or generate clean subdivisions for any country
export const getStatesForCountry = (countryName) => {
  if (STATES_BY_COUNTRY[countryName]) {
    return STATES_BY_COUNTRY[countryName];
  }
  return [
    { name: "Capital Region / Central", capital: "National Capital", population: 0, share: 0, density: 0, source: "National Statistics" },
    { name: "Northern Region", capital: "North Division", population: 0, share: 0, density: 0, source: "National Statistics" },
    { name: "Southern Region", capital: "South Division", population: 0, share: 0, density: 0, source: "National Statistics" },
    { name: "Eastern Region", capital: "East Division", population: 0, share: 0, density: 0, source: "National Statistics" },
    { name: "Western Region", capital: "West Division", population: 0, share: 0, density: 0, source: "National Statistics" }
  ];
};

export const getStateNamesForCountry = (countryName) => {
  const states = getStatesForCountry(countryName);
  return states.map(s => s.name);
};
