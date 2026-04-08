export interface RasffNotificationLinkEntry {
  notification_id: string;
  notification_url: string;
}

// This file is intentionally kept in the repo and updated incrementally by
// `npm run enrich:rasff-links`. It is the durable, hardcoded mapping between
// public RASFF references (e.g. 2026.2954) and internal notification IDs
// (e.g. 836052).
export const rasffNotificationMap: Record<string, RasffNotificationLinkEntry> = {
  "2025.10337": {
    "notification_id": "813018",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813018"
  },
  "2025.10339": {
    "notification_id": "813030",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813030"
  },
  "2026.0101": {
    "notification_id": "814817",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814817"
  },
  "2026.0104": {
    "notification_id": "815026",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815026"
  },
  "2026.0107": {
    "notification_id": "815006",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815006"
  },
  "2026.0111": {
    "notification_id": "815056",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815056"
  },
  "2026.0120": {
    "notification_id": "815208",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815208"
  },
  "2026.0122": {
    "notification_id": "815104",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815104"
  },
  "2026.0123": {
    "notification_id": "815264",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815264"
  },
  "2026.0127": {
    "notification_id": "814971",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814971"
  },
  "2026.0129": {
    "notification_id": "815182",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815182"
  },
  "2026.0130": {
    "notification_id": "815277",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815277"
  },
  "2026.0131": {
    "notification_id": "814995",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814995"
  },
  "2026.0132": {
    "notification_id": "814979",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814979"
  },
  "2026.0135": {
    "notification_id": "815315",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815315"
  },
  "2026.0136": {
    "notification_id": "815173",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815173"
  },
  "2026.0148": {
    "notification_id": "815386",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815386"
  },
  "2026.0155": {
    "notification_id": "815546",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815546"
  },
  "2026.0157": {
    "notification_id": "815436",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815436"
  },
  "2026.0159": {
    "notification_id": "815416",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815416"
  },
  "2026.0161": {
    "notification_id": "815608",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815608"
  },
  "2026.0164": {
    "notification_id": "815624",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815624"
  },
  "2026.0166": {
    "notification_id": "815584",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815584"
  },
  "2026.0170": {
    "notification_id": "815248",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815248"
  },
  "2026.0173": {
    "notification_id": "815378",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815378"
  },
  "2026.0175": {
    "notification_id": "815431",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815431"
  },
  "2026.0177": {
    "notification_id": "815309",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815309"
  },
  "2026.0179": {
    "notification_id": "815076",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815076"
  },
  "2026.0180": {
    "notification_id": "815685",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815685"
  },
  "2026.0183": {
    "notification_id": "815706",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815706"
  },
  "2026.0184": {
    "notification_id": "815715",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815715"
  },
  "2026.0187": {
    "notification_id": "815775",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815775"
  },
  "2026.0189": {
    "notification_id": "815723",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815723"
  },
  "2026.0190": {
    "notification_id": "815732",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815732"
  },
  "2026.0191": {
    "notification_id": "815731",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815731"
  },
  "2026.0193": {
    "notification_id": "814820",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814820"
  },
  "2026.0196": {
    "notification_id": "815902",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815902"
  },
  "2026.0200": {
    "notification_id": "813727",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813727"
  },
  "2026.0204": {
    "notification_id": "815782",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815782"
  },
  "2026.0206": {
    "notification_id": "813765",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813765"
  },
  "2026.0208": {
    "notification_id": "815992",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815992"
  },
  "2026.0209": {
    "notification_id": "815345",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815345"
  },
  "2026.0210": {
    "notification_id": "816066",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816066"
  },
  "2026.0213": {
    "notification_id": "813834",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813834"
  },
  "2026.0219": {
    "notification_id": "815943",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815943"
  },
  "2026.0220": {
    "notification_id": "815676",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815676"
  },
  "2026.0221": {
    "notification_id": "815996",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815996"
  },
  "2026.0223": {
    "notification_id": "816120",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816120"
  },
  "2026.0225": {
    "notification_id": "815999",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815999"
  },
  "2026.0226": {
    "notification_id": "811323",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/811323"
  },
  "2026.0227": {
    "notification_id": "815591",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815591"
  },
  "2026.0228": {
    "notification_id": "816177",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816177"
  },
  "2026.0229": {
    "notification_id": "816014",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816014"
  },
  "2026.0232": {
    "notification_id": "816019",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816019"
  },
  "2026.0234": {
    "notification_id": "816250",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816250"
  },
  "2026.0236": {
    "notification_id": "816083",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816083"
  },
  "2026.0238": {
    "notification_id": "816297",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816297"
  },
  "2026.0241": {
    "notification_id": "816306",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816306"
  },
  "2026.0243": {
    "notification_id": "816218",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816218"
  },
  "2026.0245": {
    "notification_id": "816317",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816317"
  },
  "2026.0251": {
    "notification_id": "816393",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816393"
  },
  "2026.0256": {
    "notification_id": "815908",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815908"
  },
  "2026.0257": {
    "notification_id": "815951",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815951"
  },
  "2026.0260": {
    "notification_id": "816207",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816207"
  },
  "2026.0264": {
    "notification_id": "816507",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816507"
  },
  "2026.0272": {
    "notification_id": "816579",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816579"
  },
  "2026.0273": {
    "notification_id": "816553",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816553"
  },
  "2026.0275": {
    "notification_id": "816450",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816450"
  },
  "2026.0278": {
    "notification_id": "816627",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816627"
  },
  "2026.0280": {
    "notification_id": "816613",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816613"
  },
  "2026.0281": {
    "notification_id": "816520",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816520"
  },
  "2026.0283": {
    "notification_id": "816672",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816672"
  },
  "2026.0285": {
    "notification_id": "816675",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816675"
  },
  "2026.0290": {
    "notification_id": "816706",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816706"
  },
  "2026.0306": {
    "notification_id": "816765",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816765"
  },
  "2026.0307": {
    "notification_id": "816385",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816385"
  },
  "2026.0309": {
    "notification_id": "816818",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816818"
  },
  "2026.0311": {
    "notification_id": "816899",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816899"
  },
  "2026.0312": {
    "notification_id": "816751",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816751"
  },
  "2026.0313": {
    "notification_id": "816670",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816670"
  },
  "2026.0315": {
    "notification_id": "816852",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816852"
  },
  "2026.0317": {
    "notification_id": "810522",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/810522"
  },
  "2026.0321": {
    "notification_id": "815659",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815659"
  },
  "2026.0326": {
    "notification_id": "810409",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/810409"
  },
  "2026.0327": {
    "notification_id": "816963",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816963"
  },
  "2026.0328": {
    "notification_id": "816828",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816828"
  },
  "2026.0329": {
    "notification_id": "816904",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816904"
  },
  "2026.0331": {
    "notification_id": "816778",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816778"
  },
  "2026.0344": {
    "notification_id": "816986",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816986"
  },
  "2026.0345": {
    "notification_id": "815791",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815791"
  },
  "2026.0347": {
    "notification_id": "816985",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816985"
  },
  "2026.0349": {
    "notification_id": "817018",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817018"
  },
  "2026.0353": {
    "notification_id": "817009",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817009"
  },
  "2026.0361": {
    "notification_id": "816578",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816578"
  },
  "2026.0363": {
    "notification_id": "817105",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817105"
  },
  "2026.0366": {
    "notification_id": "817235",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817235"
  },
  "2026.0368": {
    "notification_id": "798663",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/798663"
  },
  "2026.0371": {
    "notification_id": "816619",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816619"
  },
  "2026.0372": {
    "notification_id": "816921",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816921"
  },
  "2026.0373": {
    "notification_id": "816928",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816928"
  },
  "2026.0376": {
    "notification_id": "817390",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817390"
  },
  "2026.0377": {
    "notification_id": "817032",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817032"
  },
  "2026.0379": {
    "notification_id": "817404",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817404"
  },
  "2026.0380": {
    "notification_id": "817356",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817356"
  },
  "2026.0381": {
    "notification_id": "817375",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817375"
  },
  "2026.0382": {
    "notification_id": "817401",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817401"
  },
  "2026.0383": {
    "notification_id": "817174",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817174"
  },
  "2026.0384": {
    "notification_id": "817419",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817419"
  },
  "2026.0385": {
    "notification_id": "817416",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817416"
  },
  "2026.0387": {
    "notification_id": "816622",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816622"
  },
  "2026.0388": {
    "notification_id": "817382",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817382"
  },
  "2026.0391": {
    "notification_id": "816614",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816614"
  },
  "2026.0392": {
    "notification_id": "817475",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817475"
  },
  "2026.0395": {
    "notification_id": "817285",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817285"
  },
  "2026.0397": {
    "notification_id": "817474",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817474"
  },
  "2026.0399": {
    "notification_id": "813845",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813845"
  },
  "2026.0402": {
    "notification_id": "815241",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815241"
  },
  "2026.0405": {
    "notification_id": "817517",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817517"
  },
  "2026.0406": {
    "notification_id": "817432",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817432"
  },
  "2026.0407": {
    "notification_id": "815668",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/815668"
  },
  "2026.0414": {
    "notification_id": "816573",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816573"
  },
  "2026.0415": {
    "notification_id": "817660",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817660"
  },
  "2026.0417": {
    "notification_id": "798856",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/798856"
  },
  "2026.0419": {
    "notification_id": "817639",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817639"
  },
  "2026.0420": {
    "notification_id": "817655",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817655"
  },
  "2026.0421": {
    "notification_id": "817672",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817672"
  },
  "2026.0422": {
    "notification_id": "817675",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817675"
  },
  "2026.0423": {
    "notification_id": "798628",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/798628"
  },
  "2026.0424": {
    "notification_id": "817683",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817683"
  },
  "2026.0430": {
    "notification_id": "817692",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817692"
  },
  "2026.0431": {
    "notification_id": "817696",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817696"
  },
  "2026.0434": {
    "notification_id": "817745",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817745"
  },
  "2026.0438": {
    "notification_id": "817689",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817689"
  },
  "2026.0440": {
    "notification_id": "817694",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817694"
  },
  "2026.0442": {
    "notification_id": "817829",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817829"
  },
  "2026.0443": {
    "notification_id": "817723",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817723"
  },
  "2026.0444": {
    "notification_id": "817772",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817772"
  },
  "2026.0445": {
    "notification_id": "817550",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817550"
  },
  "2026.0446": {
    "notification_id": "817661",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817661"
  },
  "2026.0448": {
    "notification_id": "817794",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817794"
  },
  "2026.0450": {
    "notification_id": "817748",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817748"
  },
  "2026.0451": {
    "notification_id": "817841",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817841"
  },
  "2026.0454": {
    "notification_id": "816587",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816587"
  },
  "2026.0455": {
    "notification_id": "817016",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817016"
  },
  "2026.0456": {
    "notification_id": "817801",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817801"
  },
  "2026.0457": {
    "notification_id": "817575",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817575"
  },
  "2026.0458": {
    "notification_id": "817699",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817699"
  },
  "2026.0460": {
    "notification_id": "817606",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817606"
  },
  "2026.0462": {
    "notification_id": "817706",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817706"
  },
  "2026.0463": {
    "notification_id": "817922",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817922"
  },
  "2026.0466": {
    "notification_id": "817755",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817755"
  },
  "2026.0467": {
    "notification_id": "813032",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/813032"
  },
  "2026.0473": {
    "notification_id": "817944",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817944"
  },
  "2026.0476": {
    "notification_id": "817891",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817891"
  },
  "2026.0479": {
    "notification_id": "817697",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817697"
  },
  "2026.0481": {
    "notification_id": "818033",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818033"
  },
  "2026.0489": {
    "notification_id": "818065",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818065"
  },
  "2026.0490": {
    "notification_id": "817986",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817986"
  },
  "2026.0495": {
    "notification_id": "818083",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818083"
  },
  "2026.0497": {
    "notification_id": "818074",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818074"
  },
  "2026.0499": {
    "notification_id": "817923",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817923"
  },
  "2026.0500": {
    "notification_id": "818204",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818204"
  },
  "2026.0503": {
    "notification_id": "818209",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818209"
  },
  "2026.0504": {
    "notification_id": "818195",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818195"
  },
  "2026.0505": {
    "notification_id": "818211",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818211"
  },
  "2026.0509": {
    "notification_id": "818215",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818215"
  },
  "2026.0510": {
    "notification_id": "816582",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816582"
  },
  "2026.0519": {
    "notification_id": "818272",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818272"
  },
  "2026.0523": {
    "notification_id": "818181",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818181"
  },
  "2026.0524": {
    "notification_id": "818246",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818246"
  },
  "2026.0526": {
    "notification_id": "818363",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818363"
  },
  "2026.0527": {
    "notification_id": "818354",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818354"
  },
  "2026.0530": {
    "notification_id": "818376",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818376"
  },
  "2026.0533": {
    "notification_id": "818333",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818333"
  },
  "2026.0535": {
    "notification_id": "818022",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818022"
  },
  "2026.0536": {
    "notification_id": "818280",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818280"
  },
  "2026.0537": {
    "notification_id": "818184",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818184"
  },
  "2026.0539": {
    "notification_id": "818445",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818445"
  },
  "2026.0540": {
    "notification_id": "818385",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818385"
  },
  "2026.0541": {
    "notification_id": "818441",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818441"
  },
  "2026.0542": {
    "notification_id": "818328",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818328"
  },
  "2026.0543": {
    "notification_id": "818437",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818437"
  },
  "2026.0544": {
    "notification_id": "818275",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818275"
  },
  "2026.0547": {
    "notification_id": "818405",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818405"
  },
  "2026.0551": {
    "notification_id": "818473",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818473"
  },
  "2026.0553": {
    "notification_id": "818407",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818407"
  },
  "2026.0556": {
    "notification_id": "818459",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818459"
  },
  "2026.0557": {
    "notification_id": "818433",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818433"
  },
  "2026.0558": {
    "notification_id": "818424",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818424"
  },
  "2026.0563": {
    "notification_id": "818599",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818599"
  },
  "2026.0566": {
    "notification_id": "816537",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816537"
  },
  "2026.0568": {
    "notification_id": "818604",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818604"
  },
  "2026.0569": {
    "notification_id": "818406",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818406"
  },
  "2026.0570": {
    "notification_id": "818693",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818693"
  },
  "2026.0571": {
    "notification_id": "818390",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818390"
  },
  "2026.0574": {
    "notification_id": "818453",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818453"
  },
  "2026.0576": {
    "notification_id": "818753",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818753"
  },
  "2026.0579": {
    "notification_id": "818582",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818582"
  },
  "2026.0580": {
    "notification_id": "799020",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/799020"
  },
  "2026.0582": {
    "notification_id": "818659",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818659"
  },
  "2026.0583": {
    "notification_id": "818478",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818478"
  },
  "2026.0584": {
    "notification_id": "818707",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818707"
  },
  "2026.0585": {
    "notification_id": "818592",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818592"
  },
  "2026.0586": {
    "notification_id": "818735",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818735"
  },
  "2026.0589": {
    "notification_id": "818218",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818218"
  },
  "2026.0591": {
    "notification_id": "818687",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818687"
  },
  "2026.0592": {
    "notification_id": "818723",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818723"
  },
  "2026.0593": {
    "notification_id": "818205",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818205"
  },
  "2026.0594": {
    "notification_id": "818718",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818718"
  },
  "2026.0595": {
    "notification_id": "818828",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818828"
  },
  "2026.0597": {
    "notification_id": "818832",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818832"
  },
  "2026.0598": {
    "notification_id": "818714",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818714"
  },
  "2026.0602": {
    "notification_id": "818776",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818776"
  },
  "2026.0603": {
    "notification_id": "818311",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818311"
  },
  "2026.0604": {
    "notification_id": "818589",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818589"
  },
  "2026.0608": {
    "notification_id": "818851",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818851"
  },
  "2026.0612": {
    "notification_id": "818744",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818744"
  },
  "2026.0613": {
    "notification_id": "818269",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818269"
  },
  "2026.0617": {
    "notification_id": "818834",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818834"
  },
  "2026.0619": {
    "notification_id": "819082",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819082"
  },
  "2026.0621": {
    "notification_id": "819094",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819094"
  },
  "2026.0622": {
    "notification_id": "819044",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819044"
  },
  "2026.0624": {
    "notification_id": "818898",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818898"
  },
  "2026.0625": {
    "notification_id": "819100",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819100"
  },
  "2026.0626": {
    "notification_id": "809462",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/809462"
  },
  "2026.0630": {
    "notification_id": "819095",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819095"
  },
  "2026.0631": {
    "notification_id": "817822",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817822"
  },
  "2026.0632": {
    "notification_id": "818578",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818578"
  },
  "2026.0636": {
    "notification_id": "819186",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819186"
  },
  "2026.0637": {
    "notification_id": "816879",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816879"
  },
  "2026.0638": {
    "notification_id": "817886",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817886"
  },
  "2026.0641": {
    "notification_id": "819138",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819138"
  },
  "2026.0642": {
    "notification_id": "819007",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819007"
  },
  "2026.0644": {
    "notification_id": "819264",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819264"
  },
  "2026.0645": {
    "notification_id": "819088",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819088"
  },
  "2026.0647": {
    "notification_id": "819191",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819191"
  },
  "2026.0648": {
    "notification_id": "819151",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819151"
  },
  "2026.0658": {
    "notification_id": "819141",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819141"
  },
  "2026.0663": {
    "notification_id": "818900",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818900"
  },
  "2026.0664": {
    "notification_id": "819236",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819236"
  },
  "2026.0665": {
    "notification_id": "819346",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819346"
  },
  "2026.0667": {
    "notification_id": "818863",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818863"
  },
  "2026.0668": {
    "notification_id": "819157",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819157"
  },
  "2026.0671": {
    "notification_id": "819243",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819243"
  },
  "2026.0672": {
    "notification_id": "819439",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819439"
  },
  "2026.0673": {
    "notification_id": "819401",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819401"
  },
  "2026.0677": {
    "notification_id": "819207",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819207"
  },
  "2026.0678": {
    "notification_id": "816854",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816854"
  },
  "2026.0680": {
    "notification_id": "819203",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819203"
  },
  "2026.0681": {
    "notification_id": "819233",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819233"
  },
  "2026.0682": {
    "notification_id": "819467",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819467"
  },
  "2026.0684": {
    "notification_id": "817862",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817862"
  },
  "2026.0685": {
    "notification_id": "818417",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818417"
  },
  "2026.0688": {
    "notification_id": "819387",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819387"
  },
  "2026.0692": {
    "notification_id": "819645",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819645"
  },
  "2026.0693": {
    "notification_id": "819565",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819565"
  },
  "2026.0697": {
    "notification_id": "812314",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/812314"
  },
  "2026.0699": {
    "notification_id": "819705",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819705"
  },
  "2026.0700": {
    "notification_id": "819084",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819084"
  },
  "2026.0701": {
    "notification_id": "819002",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819002"
  },
  "2026.0706": {
    "notification_id": "819000",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819000"
  },
  "2026.0707": {
    "notification_id": "804729",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/804729"
  },
  "2026.0708": {
    "notification_id": "819673",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819673"
  },
  "2026.0709": {
    "notification_id": "816530",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816530"
  },
  "2026.0710": {
    "notification_id": "819562",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819562"
  },
  "2026.0711": {
    "notification_id": "817141",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/817141"
  },
  "2026.0712": {
    "notification_id": "819653",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819653"
  },
  "2026.0715": {
    "notification_id": "819595",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819595"
  },
  "2026.0717": {
    "notification_id": "818103",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818103"
  },
  "2026.0719": {
    "notification_id": "818701",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818701"
  },
  "2026.0727": {
    "notification_id": "819636",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819636"
  },
  "2026.0729": {
    "notification_id": "819897",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819897"
  },
  "2026.0737": {
    "notification_id": "819704",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819704"
  },
  "2026.0738": {
    "notification_id": "819881",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819881"
  },
  "2026.0749": {
    "notification_id": "819857",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819857"
  },
  "2026.0751": {
    "notification_id": "819602",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819602"
  },
  "2026.0752": {
    "notification_id": "819764",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819764"
  },
  "2026.0753": {
    "notification_id": "819942",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819942"
  },
  "2026.0754": {
    "notification_id": "819597",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819597"
  },
  "2026.0757": {
    "notification_id": "819874",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819874"
  },
  "2026.0760": {
    "notification_id": "819312",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819312"
  },
  "2026.0765": {
    "notification_id": "820071",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820071"
  },
  "2026.0766": {
    "notification_id": "819920",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819920"
  },
  "2026.0767": {
    "notification_id": "820020",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820020"
  },
  "2026.0772": {
    "notification_id": "820099",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820099"
  },
  "2026.0773": {
    "notification_id": "819774",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819774"
  },
  "2026.0776": {
    "notification_id": "820144",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820144"
  },
  "2026.0779": {
    "notification_id": "819956",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819956"
  },
  "2026.0784": {
    "notification_id": "819747",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819747"
  },
  "2026.0785": {
    "notification_id": "820129",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820129"
  },
  "2026.0788": {
    "notification_id": "820111",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820111"
  },
  "2026.0790": {
    "notification_id": "814456",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814456"
  },
  "2026.0791": {
    "notification_id": "820113",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820113"
  },
  "2026.0796": {
    "notification_id": "820161",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820161"
  },
  "2026.0798": {
    "notification_id": "820196",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820196"
  },
  "2026.0799": {
    "notification_id": "820305",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820305"
  },
  "2026.0802": {
    "notification_id": "820104",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820104"
  },
  "2026.0807": {
    "notification_id": "820135",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820135"
  },
  "2026.0808": {
    "notification_id": "819708",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819708"
  },
  "2026.0811": {
    "notification_id": "818854",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818854"
  },
  "2026.0812": {
    "notification_id": "820253",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820253"
  },
  "2026.0814": {
    "notification_id": "820364",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820364"
  },
  "2026.0816": {
    "notification_id": "820045",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820045"
  },
  "2026.0817": {
    "notification_id": "820029",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820029"
  },
  "2026.0819": {
    "notification_id": "820126",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820126"
  },
  "2026.0820": {
    "notification_id": "820419",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820419"
  },
  "2026.0823": {
    "notification_id": "819399",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819399"
  },
  "2026.0824": {
    "notification_id": "819543",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819543"
  },
  "2026.0825": {
    "notification_id": "820329",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820329"
  },
  "2026.0826": {
    "notification_id": "820200",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820200"
  },
  "2026.0827": {
    "notification_id": "819113",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819113"
  },
  "2026.0828": {
    "notification_id": "819220",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819220"
  },
  "2026.0829": {
    "notification_id": "820175",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820175"
  },
  "2026.0831": {
    "notification_id": "820037",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820037"
  },
  "2026.0832": {
    "notification_id": "820483",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820483"
  },
  "2026.0841": {
    "notification_id": "820541",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820541"
  },
  "2026.0842": {
    "notification_id": "820539",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820539"
  },
  "2026.0844": {
    "notification_id": "820559",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820559"
  },
  "2026.0847": {
    "notification_id": "820591",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820591"
  },
  "2026.0848": {
    "notification_id": "820650",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820650"
  },
  "2026.0850": {
    "notification_id": "820573",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820573"
  },
  "2026.0854": {
    "notification_id": "820667",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820667"
  },
  "2026.0856": {
    "notification_id": "820548",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820548"
  },
  "2026.0857": {
    "notification_id": "819854",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819854"
  },
  "2026.0858": {
    "notification_id": "820598",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820598"
  },
  "2026.0859": {
    "notification_id": "820652",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820652"
  },
  "2026.0861": {
    "notification_id": "819962",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819962"
  },
  "2026.0863": {
    "notification_id": "819862",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819862"
  },
  "2026.0864": {
    "notification_id": "820770",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820770"
  },
  "2026.0866": {
    "notification_id": "820798",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820798"
  },
  "2026.0869": {
    "notification_id": "820451",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820451"
  },
  "2026.0872": {
    "notification_id": "820643",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820643"
  },
  "2026.0873": {
    "notification_id": "818102",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818102"
  },
  "2026.0874": {
    "notification_id": "812825",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/812825"
  },
  "2026.0875": {
    "notification_id": "820549",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820549"
  },
  "2026.0877": {
    "notification_id": "820755",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820755"
  },
  "2026.0889": {
    "notification_id": "820376",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820376"
  },
  "2026.0896": {
    "notification_id": "820923",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820923"
  },
  "2026.0899": {
    "notification_id": "820955",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820955"
  },
  "2026.0908": {
    "notification_id": "819641",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819641"
  },
  "2026.0910": {
    "notification_id": "819740",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819740"
  },
  "2026.0911": {
    "notification_id": "820970",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820970"
  },
  "2026.0912": {
    "notification_id": "810128",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/810128"
  },
  "2026.0913": {
    "notification_id": "820283",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820283"
  },
  "2026.0914": {
    "notification_id": "821004",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821004"
  },
  "2026.0916": {
    "notification_id": "821092",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821092"
  },
  "2026.0917": {
    "notification_id": "821093",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821093"
  },
  "2026.0927": {
    "notification_id": "821069",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821069"
  },
  "2026.0928": {
    "notification_id": "820410",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820410"
  },
  "2026.0931": {
    "notification_id": "821055",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821055"
  },
  "2026.0933": {
    "notification_id": "821193",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821193"
  },
  "2026.0937": {
    "notification_id": "821297",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821297"
  },
  "2026.0940": {
    "notification_id": "821173",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821173"
  },
  "2026.0944": {
    "notification_id": "821087",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821087"
  },
  "2026.0945": {
    "notification_id": "820339",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820339"
  },
  "2026.0946": {
    "notification_id": "821323",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821323"
  },
  "2026.0948": {
    "notification_id": "816895",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/816895"
  },
  "2026.0949": {
    "notification_id": "821315",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821315"
  },
  "2026.0950": {
    "notification_id": "819310",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819310"
  },
  "2026.0951": {
    "notification_id": "821362",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821362"
  },
  "2026.0952": {
    "notification_id": "821168",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821168"
  },
  "2026.0958": {
    "notification_id": "821440",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821440"
  },
  "2026.0960": {
    "notification_id": "821395",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821395"
  },
  "2026.0962": {
    "notification_id": "821398",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821398"
  },
  "2026.0968": {
    "notification_id": "821624",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821624"
  },
  "2026.0969": {
    "notification_id": "821277",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821277"
  },
  "2026.0971": {
    "notification_id": "820796",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820796"
  },
  "2026.0972": {
    "notification_id": "821542",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821542"
  },
  "2026.0975": {
    "notification_id": "821533",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821533"
  },
  "2026.0977": {
    "notification_id": "821675",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821675"
  },
  "2026.0979": {
    "notification_id": "821415",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821415"
  },
  "2026.0980": {
    "notification_id": "821687",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821687"
  },
  "2026.0981": {
    "notification_id": "821125",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821125"
  },
  "2026.0982": {
    "notification_id": "821668",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821668"
  },
  "2026.0984": {
    "notification_id": "821685",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821685"
  },
  "2026.0985": {
    "notification_id": "821722",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821722"
  },
  "2026.0987": {
    "notification_id": "821775",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821775"
  },
  "2026.0988": {
    "notification_id": "821588",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821588"
  },
  "2026.0990": {
    "notification_id": "821657",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821657"
  },
  "2026.0992": {
    "notification_id": "821811",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821811"
  },
  "2026.0997": {
    "notification_id": "821455",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821455"
  },
  "2026.0999": {
    "notification_id": "821456",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821456"
  },
  "2026.1000": {
    "notification_id": "821598",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821598"
  },
  "2026.1001": {
    "notification_id": "821761",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821761"
  },
  "2026.1003": {
    "notification_id": "821638",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821638"
  },
  "2026.1005": {
    "notification_id": "822003",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822003"
  },
  "2026.1007": {
    "notification_id": "821852",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821852"
  },
  "2026.1008": {
    "notification_id": "821744",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821744"
  },
  "2026.1009": {
    "notification_id": "821892",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821892"
  },
  "2026.1011": {
    "notification_id": "821509",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821509"
  },
  "2026.1012": {
    "notification_id": "821928",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821928"
  },
  "2026.1014": {
    "notification_id": "821751",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821751"
  },
  "2026.1017": {
    "notification_id": "821686",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821686"
  },
  "2026.1018": {
    "notification_id": "822106",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822106"
  },
  "2026.1020": {
    "notification_id": "822107",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822107"
  },
  "2026.1021": {
    "notification_id": "821646",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821646"
  },
  "2026.1022": {
    "notification_id": "821402",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821402"
  },
  "2026.1026": {
    "notification_id": "819610",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/819610"
  },
  "2026.1027": {
    "notification_id": "822029",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822029"
  },
  "2026.1028": {
    "notification_id": "822174",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822174"
  },
  "2026.1031": {
    "notification_id": "822238",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822238"
  },
  "2026.1034": {
    "notification_id": "821880",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821880"
  },
  "2026.1038": {
    "notification_id": "821716",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821716"
  },
  "2026.1040": {
    "notification_id": "822242",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822242"
  },
  "2026.1050": {
    "notification_id": "822250",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822250"
  },
  "2026.1051": {
    "notification_id": "822223",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822223"
  },
  "2026.1054": {
    "notification_id": "821767",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821767"
  },
  "2026.1055": {
    "notification_id": "822413",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822413"
  },
  "2026.1057": {
    "notification_id": "822209",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822209"
  },
  "2026.1067": {
    "notification_id": "822353",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822353"
  },
  "2026.1068": {
    "notification_id": "821726",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821726"
  },
  "2026.1070": {
    "notification_id": "822402",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822402"
  },
  "2026.1080": {
    "notification_id": "822561",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822561"
  },
  "2026.1089": {
    "notification_id": "822424",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822424"
  },
  "2026.1090": {
    "notification_id": "822023",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822023"
  },
  "2026.1091": {
    "notification_id": "822642",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822642"
  },
  "2026.1092": {
    "notification_id": "822386",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822386"
  },
  "2026.1098": {
    "notification_id": "822538",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822538"
  },
  "2026.1101": {
    "notification_id": "809118",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/809118"
  },
  "2026.1102": {
    "notification_id": "822702",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822702"
  },
  "2026.1103": {
    "notification_id": "821906",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821906"
  },
  "2026.1104": {
    "notification_id": "822503",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822503"
  },
  "2026.1107": {
    "notification_id": "822049",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822049"
  },
  "2026.1111": {
    "notification_id": "822753",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822753"
  },
  "2026.1117": {
    "notification_id": "822773",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822773"
  },
  "2026.1120": {
    "notification_id": "822673",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822673"
  },
  "2026.1123": {
    "notification_id": "822264",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822264"
  },
  "2026.1126": {
    "notification_id": "822305",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822305"
  },
  "2026.1127": {
    "notification_id": "822746",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822746"
  },
  "2026.1130": {
    "notification_id": "822180",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822180"
  },
  "2026.1136": {
    "notification_id": "822807",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822807"
  },
  "2026.1137": {
    "notification_id": "820284",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820284"
  },
  "2026.1138": {
    "notification_id": "822769",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822769"
  },
  "2026.1141": {
    "notification_id": "822852",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822852"
  },
  "2026.1142": {
    "notification_id": "822771",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822771"
  },
  "2026.1143": {
    "notification_id": "822800",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822800"
  },
  "2026.1145": {
    "notification_id": "821802",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821802"
  },
  "2026.1146": {
    "notification_id": "822765",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822765"
  },
  "2026.1148": {
    "notification_id": "818089",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818089"
  },
  "2026.1149": {
    "notification_id": "818155",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/818155"
  },
  "2026.1150": {
    "notification_id": "822324",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822324"
  },
  "2026.1152": {
    "notification_id": "822925",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822925"
  },
  "2026.1153": {
    "notification_id": "823002",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823002"
  },
  "2026.1164": {
    "notification_id": "823024",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823024"
  },
  "2026.1165": {
    "notification_id": "822745",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822745"
  },
  "2026.1168": {
    "notification_id": "823013",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823013"
  },
  "2026.1169": {
    "notification_id": "814790",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/814790"
  },
  "2026.1170": {
    "notification_id": "821936",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821936"
  },
  "2026.1172": {
    "notification_id": "823011",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823011"
  },
  "2026.1174": {
    "notification_id": "822953",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822953"
  },
  "2026.1178": {
    "notification_id": "822957",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822957"
  },
  "2026.1181": {
    "notification_id": "822779",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822779"
  },
  "2026.1183": {
    "notification_id": "822595",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822595"
  },
  "2026.1190": {
    "notification_id": "822912",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822912"
  },
  "2026.1192": {
    "notification_id": "823123",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823123"
  },
  "2026.1194": {
    "notification_id": "823227",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823227"
  },
  "2026.1195": {
    "notification_id": "822609",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822609"
  },
  "2026.1198": {
    "notification_id": "823143",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823143"
  },
  "2026.1200": {
    "notification_id": "823070",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823070"
  },
  "2026.1201": {
    "notification_id": "823088",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823088"
  },
  "2026.1202": {
    "notification_id": "823014",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823014"
  },
  "2026.1204": {
    "notification_id": "821819",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821819"
  },
  "2026.1205": {
    "notification_id": "822689",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822689"
  },
  "2026.1206": {
    "notification_id": "823348",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823348"
  },
  "2026.1207": {
    "notification_id": "823320",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823320"
  },
  "2026.1208": {
    "notification_id": "822698",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822698"
  },
  "2026.1209": {
    "notification_id": "822931",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822931"
  },
  "2026.1214": {
    "notification_id": "822361",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822361"
  },
  "2026.1215": {
    "notification_id": "823411",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823411"
  },
  "2026.1216": {
    "notification_id": "823259",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823259"
  },
  "2026.1217": {
    "notification_id": "823537",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823537"
  },
  "2026.1219": {
    "notification_id": "823576",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823576"
  },
  "2026.1220": {
    "notification_id": "823473",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823473"
  },
  "2026.1223": {
    "notification_id": "823149",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823149"
  },
  "2026.1226": {
    "notification_id": "823273",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823273"
  },
  "2026.1229": {
    "notification_id": "823661",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823661"
  },
  "2026.1230": {
    "notification_id": "823573",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823573"
  },
  "2026.1233": {
    "notification_id": "823684",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823684"
  },
  "2026.1234": {
    "notification_id": "822428",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822428"
  },
  "2026.1235": {
    "notification_id": "823671",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823671"
  },
  "2026.1236": {
    "notification_id": "823536",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823536"
  },
  "2026.1237": {
    "notification_id": "822202",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822202"
  },
  "2026.1238": {
    "notification_id": "823713",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823713"
  },
  "2026.1239": {
    "notification_id": "823466",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823466"
  },
  "2026.1246": {
    "notification_id": "823737",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823737"
  },
  "2026.1248": {
    "notification_id": "823757",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823757"
  },
  "2026.1251": {
    "notification_id": "822772",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822772"
  },
  "2026.1252": {
    "notification_id": "822498",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822498"
  },
  "2026.1253": {
    "notification_id": "823744",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823744"
  },
  "2026.1254": {
    "notification_id": "823663",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823663"
  },
  "2026.1260": {
    "notification_id": "823152",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823152"
  },
  "2026.1264": {
    "notification_id": "823784",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823784"
  },
  "2026.1265": {
    "notification_id": "823856",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823856"
  },
  "2026.1266": {
    "notification_id": "823384",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823384"
  },
  "2026.1267": {
    "notification_id": "823364",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823364"
  },
  "2026.1268": {
    "notification_id": "823600",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823600"
  },
  "2026.1270": {
    "notification_id": "822929",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822929"
  },
  "2026.1273": {
    "notification_id": "823551",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823551"
  },
  "2026.1281": {
    "notification_id": "823790",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823790"
  },
  "2026.1286": {
    "notification_id": "823653",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823653"
  },
  "2026.1296": {
    "notification_id": "824061",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824061"
  },
  "2026.1297": {
    "notification_id": "823854",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823854"
  },
  "2026.1299": {
    "notification_id": "823727",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823727"
  },
  "2026.1300": {
    "notification_id": "823641",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823641"
  },
  "2026.1301": {
    "notification_id": "823053",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823053"
  },
  "2026.1302": {
    "notification_id": "823816",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823816"
  },
  "2026.1304": {
    "notification_id": "824094",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824094"
  },
  "2026.1305": {
    "notification_id": "823857",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823857"
  },
  "2026.1307": {
    "notification_id": "824076",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824076"
  },
  "2026.1308": {
    "notification_id": "823919",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823919"
  },
  "2026.1311": {
    "notification_id": "822660",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822660"
  },
  "2026.1316": {
    "notification_id": "824192",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824192"
  },
  "2026.1319": {
    "notification_id": "824165",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824165"
  },
  "2026.1320": {
    "notification_id": "824233",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824233"
  },
  "2026.1321": {
    "notification_id": "823373",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823373"
  },
  "2026.1323": {
    "notification_id": "810364",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/810364"
  },
  "2026.1327": {
    "notification_id": "824187",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824187"
  },
  "2026.1328": {
    "notification_id": "824229",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824229"
  },
  "2026.1329": {
    "notification_id": "822525",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822525"
  },
  "2026.1333": {
    "notification_id": "824299",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824299"
  },
  "2026.1334": {
    "notification_id": "824152",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824152"
  },
  "2026.1337": {
    "notification_id": "824236",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824236"
  },
  "2026.1338": {
    "notification_id": "823899",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823899"
  },
  "2026.1339": {
    "notification_id": "824379",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824379"
  },
  "2026.1341": {
    "notification_id": "824176",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824176"
  },
  "2026.1343": {
    "notification_id": "822245",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822245"
  },
  "2026.1345": {
    "notification_id": "824242",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824242"
  },
  "2026.1350": {
    "notification_id": "824414",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824414"
  },
  "2026.1351": {
    "notification_id": "823171",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823171"
  },
  "2026.1353": {
    "notification_id": "824450",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824450"
  },
  "2026.1360": {
    "notification_id": "824483",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824483"
  },
  "2026.1365": {
    "notification_id": "824494",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824494"
  },
  "2026.1366": {
    "notification_id": "824134",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824134"
  },
  "2026.1370": {
    "notification_id": "822683",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822683"
  },
  "2026.1371": {
    "notification_id": "824159",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824159"
  },
  "2026.1373": {
    "notification_id": "824325",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824325"
  },
  "2026.1376": {
    "notification_id": "824004",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824004"
  },
  "2026.1382": {
    "notification_id": "822839",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822839"
  },
  "2026.1383": {
    "notification_id": "824750",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824750"
  },
  "2026.1385": {
    "notification_id": "824739",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824739"
  },
  "2026.1392": {
    "notification_id": "824174",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824174"
  },
  "2026.1395": {
    "notification_id": "824369",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824369"
  },
  "2026.1396": {
    "notification_id": "824645",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824645"
  },
  "2026.1402": {
    "notification_id": "822461",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822461"
  },
  "2026.1405": {
    "notification_id": "824567",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824567"
  },
  "2026.1406": {
    "notification_id": "824754",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824754"
  },
  "2026.1411": {
    "notification_id": "824793",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824793"
  },
  "2026.1419": {
    "notification_id": "824088",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824088"
  },
  "2026.1421": {
    "notification_id": "824694",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824694"
  },
  "2026.1422": {
    "notification_id": "824997",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824997"
  },
  "2026.1423": {
    "notification_id": "825015",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825015"
  },
  "2026.1424": {
    "notification_id": "824439",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824439"
  },
  "2026.1426": {
    "notification_id": "825039",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825039"
  },
  "2026.1427": {
    "notification_id": "822442",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822442"
  },
  "2026.1429": {
    "notification_id": "824848",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824848"
  },
  "2026.1431": {
    "notification_id": "825094",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825094"
  },
  "2026.1432": {
    "notification_id": "824700",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824700"
  },
  "2026.1435": {
    "notification_id": "825154",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825154"
  },
  "2026.1441": {
    "notification_id": "825086",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825086"
  },
  "2026.1446": {
    "notification_id": "825037",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825037"
  },
  "2026.1448": {
    "notification_id": "824048",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824048"
  },
  "2026.1452": {
    "notification_id": "825291",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825291"
  },
  "2026.1454": {
    "notification_id": "825046",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825046"
  },
  "2026.1455": {
    "notification_id": "825295",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825295"
  },
  "2026.1456": {
    "notification_id": "821383",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821383"
  },
  "2026.1457": {
    "notification_id": "825316",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825316"
  },
  "2026.1459": {
    "notification_id": "825359",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825359"
  },
  "2026.1460": {
    "notification_id": "825365",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825365"
  },
  "2026.1461": {
    "notification_id": "825352",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825352"
  },
  "2026.1470": {
    "notification_id": "825436",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825436"
  },
  "2026.1474": {
    "notification_id": "825408",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825408"
  },
  "2026.1477": {
    "notification_id": "825567",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825567"
  },
  "2026.1479": {
    "notification_id": "825502",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825502"
  },
  "2026.1480": {
    "notification_id": "821723",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821723"
  },
  "2026.1481": {
    "notification_id": "825632",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825632"
  },
  "2026.1483": {
    "notification_id": "825628",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825628"
  },
  "2026.1485": {
    "notification_id": "825686",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825686"
  },
  "2026.1487": {
    "notification_id": "825518",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825518"
  },
  "2026.1490": {
    "notification_id": "825454",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825454"
  },
  "2026.1491": {
    "notification_id": "825515",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825515"
  },
  "2026.1494": {
    "notification_id": "825534",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825534"
  },
  "2026.1495": {
    "notification_id": "825563",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825563"
  },
  "2026.1497": {
    "notification_id": "825679",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825679"
  },
  "2026.1498": {
    "notification_id": "825584",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825584"
  },
  "2026.1500": {
    "notification_id": "824766",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824766"
  },
  "2026.1501": {
    "notification_id": "825603",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825603"
  },
  "2026.1502": {
    "notification_id": "825439",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825439"
  },
  "2026.1503": {
    "notification_id": "825772",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825772"
  },
  "2026.1504": {
    "notification_id": "825112",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825112"
  },
  "2026.1508": {
    "notification_id": "825757",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825757"
  },
  "2026.1510": {
    "notification_id": "825868",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825868"
  },
  "2026.1511": {
    "notification_id": "825826",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825826"
  },
  "2026.1512": {
    "notification_id": "809453",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/809453"
  },
  "2026.1513": {
    "notification_id": "825707",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825707"
  },
  "2026.1516": {
    "notification_id": "825508",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825508"
  },
  "2026.1518": {
    "notification_id": "824231",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824231"
  },
  "2026.1519": {
    "notification_id": "821883",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/821883"
  },
  "2026.1522": {
    "notification_id": "826016",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826016"
  },
  "2026.1530": {
    "notification_id": "825952",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825952"
  },
  "2026.1531": {
    "notification_id": "825992",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825992"
  },
  "2026.1534": {
    "notification_id": "825994",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825994"
  },
  "2026.1535": {
    "notification_id": "825990",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825990"
  },
  "2026.1537": {
    "notification_id": "826184",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826184"
  },
  "2026.1538": {
    "notification_id": "826090",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826090"
  },
  "2026.1540": {
    "notification_id": "826232",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826232"
  },
  "2026.1541": {
    "notification_id": "826243",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826243"
  },
  "2026.1542": {
    "notification_id": "825544",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825544"
  },
  "2026.1545": {
    "notification_id": "825968",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825968"
  },
  "2026.1548": {
    "notification_id": "824292",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824292"
  },
  "2026.1549": {
    "notification_id": "825653",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825653"
  },
  "2026.1550": {
    "notification_id": "826261",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826261"
  },
  "2026.1552": {
    "notification_id": "826214",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826214"
  },
  "2026.1558": {
    "notification_id": "826267",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826267"
  },
  "2026.1560": {
    "notification_id": "826013",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826013"
  },
  "2026.1561": {
    "notification_id": "825862",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825862"
  },
  "2026.1563": {
    "notification_id": "826254",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826254"
  },
  "2026.1564": {
    "notification_id": "826414",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826414"
  },
  "2026.1565": {
    "notification_id": "826310",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826310"
  },
  "2026.1566": {
    "notification_id": "826370",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826370"
  },
  "2026.1567": {
    "notification_id": "825642",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825642"
  },
  "2026.1569": {
    "notification_id": "826147",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826147"
  },
  "2026.1573": {
    "notification_id": "826371",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826371"
  },
  "2026.1575": {
    "notification_id": "826472",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826472"
  },
  "2026.1579": {
    "notification_id": "826521",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826521"
  },
  "2026.1580": {
    "notification_id": "826533",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826533"
  },
  "2026.1581": {
    "notification_id": "826544",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826544"
  },
  "2026.1582": {
    "notification_id": "826301",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826301"
  },
  "2026.1583": {
    "notification_id": "826359",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826359"
  },
  "2026.1589": {
    "notification_id": "826469",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826469"
  },
  "2026.1590": {
    "notification_id": "826555",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826555"
  },
  "2026.1591": {
    "notification_id": "826088",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826088"
  },
  "2026.1592": {
    "notification_id": "826627",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826627"
  },
  "2026.1600": {
    "notification_id": "826623",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826623"
  },
  "2026.1601": {
    "notification_id": "826646",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826646"
  },
  "2026.1603": {
    "notification_id": "824704",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824704"
  },
  "2026.1604": {
    "notification_id": "826343",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826343"
  },
  "2026.1605": {
    "notification_id": "826711",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826711"
  },
  "2026.1606": {
    "notification_id": "826629",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826629"
  },
  "2026.1611": {
    "notification_id": "826492",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826492"
  },
  "2026.1612": {
    "notification_id": "826788",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826788"
  },
  "2026.1618": {
    "notification_id": "826098",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826098"
  },
  "2026.1620": {
    "notification_id": "826444",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826444"
  },
  "2026.1622": {
    "notification_id": "825703",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825703"
  },
  "2026.1623": {
    "notification_id": "826425",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826425"
  },
  "2026.1624": {
    "notification_id": "826478",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826478"
  },
  "2026.1625": {
    "notification_id": "810154",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/810154"
  },
  "2026.1630": {
    "notification_id": "826281",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826281"
  },
  "2026.1635": {
    "notification_id": "826913",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826913"
  },
  "2026.1645": {
    "notification_id": "826432",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826432"
  },
  "2026.1646": {
    "notification_id": "825361",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825361"
  },
  "2026.1648": {
    "notification_id": "826853",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826853"
  },
  "2026.1651": {
    "notification_id": "823759",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823759"
  },
  "2026.1652": {
    "notification_id": "826970",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826970"
  },
  "2026.1653": {
    "notification_id": "827122",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827122"
  },
  "2026.1657": {
    "notification_id": "825578",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825578"
  },
  "2026.1661": {
    "notification_id": "826600",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826600"
  },
  "2026.1664": {
    "notification_id": "827099",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827099"
  },
  "2026.1666": {
    "notification_id": "827173",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827173"
  },
  "2026.1668": {
    "notification_id": "827041",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827041"
  },
  "2026.1669": {
    "notification_id": "827179",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827179"
  },
  "2026.1670": {
    "notification_id": "827193",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827193"
  },
  "2026.1671": {
    "notification_id": "826568",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826568"
  },
  "2026.1672": {
    "notification_id": "826421",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826421"
  },
  "2026.1673": {
    "notification_id": "827180",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827180"
  },
  "2026.1674": {
    "notification_id": "827156",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827156"
  },
  "2026.1678": {
    "notification_id": "824733",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824733"
  },
  "2026.1679": {
    "notification_id": "827219",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827219"
  },
  "2026.1680": {
    "notification_id": "826276",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826276"
  },
  "2026.1681": {
    "notification_id": "824116",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824116"
  },
  "2026.1683": {
    "notification_id": "827221",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827221"
  },
  "2026.1684": {
    "notification_id": "825078",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825078"
  },
  "2026.1690": {
    "notification_id": "827319",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827319"
  },
  "2026.1692": {
    "notification_id": "824333",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824333"
  },
  "2026.1696": {
    "notification_id": "827195",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827195"
  },
  "2026.1697": {
    "notification_id": "827346",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827346"
  },
  "2026.1698": {
    "notification_id": "827224",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827224"
  },
  "2026.1699": {
    "notification_id": "827358",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827358"
  },
  "2026.1701": {
    "notification_id": "827376",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827376"
  },
  "2026.1702": {
    "notification_id": "827392",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827392"
  },
  "2026.1703": {
    "notification_id": "827398",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827398"
  },
  "2026.1716": {
    "notification_id": "826579",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826579"
  },
  "2026.1721": {
    "notification_id": "827509",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827509"
  },
  "2026.1729": {
    "notification_id": "827568",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827568"
  },
  "2026.1732": {
    "notification_id": "827561",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827561"
  },
  "2026.1733": {
    "notification_id": "827500",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827500"
  },
  "2026.1736": {
    "notification_id": "827555",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827555"
  },
  "2026.1737": {
    "notification_id": "827564",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827564"
  },
  "2026.1738": {
    "notification_id": "827548",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827548"
  },
  "2026.1746": {
    "notification_id": "826505",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826505"
  },
  "2026.1747": {
    "notification_id": "827722",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827722"
  },
  "2026.1749": {
    "notification_id": "827597",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827597"
  },
  "2026.1751": {
    "notification_id": "827627",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827627"
  },
  "2026.1752": {
    "notification_id": "825304",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825304"
  },
  "2026.1755": {
    "notification_id": "827614",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827614"
  },
  "2026.1757": {
    "notification_id": "827550",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827550"
  },
  "2026.1761": {
    "notification_id": "827665",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827665"
  },
  "2026.1762": {
    "notification_id": "827817",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827817"
  },
  "2026.1764": {
    "notification_id": "827482",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827482"
  },
  "2026.1769": {
    "notification_id": "827541",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827541"
  },
  "2026.1770": {
    "notification_id": "825178",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825178"
  },
  "2026.1773": {
    "notification_id": "825256",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825256"
  },
  "2026.1778": {
    "notification_id": "827659",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827659"
  },
  "2026.1779": {
    "notification_id": "827674",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827674"
  },
  "2026.1780": {
    "notification_id": "827849",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827849"
  },
  "2026.1782": {
    "notification_id": "827841",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827841"
  },
  "2026.1784": {
    "notification_id": "827997",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827997"
  },
  "2026.1785": {
    "notification_id": "827966",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827966"
  },
  "2026.1788": {
    "notification_id": "827505",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827505"
  },
  "2026.1789": {
    "notification_id": "827872",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827872"
  },
  "2026.1790": {
    "notification_id": "827839",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827839"
  },
  "2026.1791": {
    "notification_id": "827766",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827766"
  },
  "2026.1793": {
    "notification_id": "827987",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827987"
  },
  "2026.1794": {
    "notification_id": "827624",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827624"
  },
  "2026.1799": {
    "notification_id": "827250",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827250"
  },
  "2026.1800": {
    "notification_id": "827934",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827934"
  },
  "2026.1802": {
    "notification_id": "828052",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828052"
  },
  "2026.1805": {
    "notification_id": "826730",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826730"
  },
  "2026.1806": {
    "notification_id": "827867",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827867"
  },
  "2026.1808": {
    "notification_id": "828077",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828077"
  },
  "2026.1809": {
    "notification_id": "828099",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828099"
  },
  "2026.1810": {
    "notification_id": "827876",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827876"
  },
  "2026.1812": {
    "notification_id": "828070",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828070"
  },
  "2026.1814": {
    "notification_id": "828131",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828131"
  },
  "2026.1815": {
    "notification_id": "828016",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828016"
  },
  "2026.1816": {
    "notification_id": "828078",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828078"
  },
  "2026.1817": {
    "notification_id": "828081",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828081"
  },
  "2026.1818": {
    "notification_id": "828122",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828122"
  },
  "2026.1824": {
    "notification_id": "812453",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/812453"
  },
  "2026.1825": {
    "notification_id": "828114",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828114"
  },
  "2026.1828": {
    "notification_id": "824407",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824407"
  },
  "2026.1829": {
    "notification_id": "825867",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/825867"
  },
  "2026.1830": {
    "notification_id": "828142",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828142"
  },
  "2026.1832": {
    "notification_id": "820878",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820878"
  },
  "2026.1833": {
    "notification_id": "820900",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820900"
  },
  "2026.1834": {
    "notification_id": "820912",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/820912"
  },
  "2026.1837": {
    "notification_id": "822325",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/822325"
  },
  "2026.1839": {
    "notification_id": "828219",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828219"
  },
  "2026.1841": {
    "notification_id": "828152",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828152"
  },
  "2026.1842": {
    "notification_id": "828244",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828244"
  },
  "2026.1843": {
    "notification_id": "828261",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828261"
  },
  "2026.1845": {
    "notification_id": "827877",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827877"
  },
  "2026.1850": {
    "notification_id": "827375",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827375"
  },
  "2026.1851": {
    "notification_id": "827344",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827344"
  },
  "2026.1852": {
    "notification_id": "828103",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828103"
  },
  "2026.1855": {
    "notification_id": "827436",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827436"
  },
  "2026.1859": {
    "notification_id": "828150",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828150"
  },
  "2026.1860": {
    "notification_id": "828237",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828237"
  },
  "2026.1861": {
    "notification_id": "828115",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828115"
  },
  "2026.1862": {
    "notification_id": "827982",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827982"
  },
  "2026.1863": {
    "notification_id": "828240",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828240"
  },
  "2026.1864": {
    "notification_id": "826009",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826009"
  },
  "2026.1868": {
    "notification_id": "823583",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823583"
  },
  "2026.1869": {
    "notification_id": "827479",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827479"
  },
  "2026.1875": {
    "notification_id": "824318",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/824318"
  },
  "2026.1882": {
    "notification_id": "827852",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827852"
  },
  "2026.1886": {
    "notification_id": "828419",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828419"
  },
  "2026.1889": {
    "notification_id": "826385",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826385"
  },
  "2026.1892": {
    "notification_id": "828683",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828683"
  },
  "2026.1893": {
    "notification_id": "826909",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826909"
  },
  "2026.1894": {
    "notification_id": "828162",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828162"
  },
  "2026.1898": {
    "notification_id": "828701",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828701"
  },
  "2026.1903": {
    "notification_id": "828745",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828745"
  },
  "2026.1904": {
    "notification_id": "828217",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828217"
  },
  "2026.1905": {
    "notification_id": "828653",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828653"
  },
  "2026.1906": {
    "notification_id": "827026",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827026"
  },
  "2026.1907": {
    "notification_id": "828687",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828687"
  },
  "2026.1908": {
    "notification_id": "828740",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828740"
  },
  "2026.1909": {
    "notification_id": "828779",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828779"
  },
  "2026.1912": {
    "notification_id": "828829",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828829"
  },
  "2026.1917": {
    "notification_id": "828832",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828832"
  },
  "2026.1919": {
    "notification_id": "828816",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828816"
  },
  "2026.1922": {
    "notification_id": "828614",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828614"
  },
  "2026.1924": {
    "notification_id": "828060",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828060"
  },
  "2026.1925": {
    "notification_id": "828541",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828541"
  },
  "2026.1926": {
    "notification_id": "828795",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828795"
  },
  "2026.1927": {
    "notification_id": "828875",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828875"
  },
  "2026.1933": {
    "notification_id": "828968",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828968"
  },
  "2026.1936": {
    "notification_id": "828741",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828741"
  },
  "2026.1940": {
    "notification_id": "828397",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828397"
  },
  "2026.1942": {
    "notification_id": "828324",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828324"
  },
  "2026.1944": {
    "notification_id": "828764",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828764"
  },
  "2026.1945": {
    "notification_id": "828919",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828919"
  },
  "2026.1946": {
    "notification_id": "828224",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828224"
  },
  "2026.1949": {
    "notification_id": "829025",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829025"
  },
  "2026.1952": {
    "notification_id": "828334",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828334"
  },
  "2026.1953": {
    "notification_id": "828830",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828830"
  },
  "2026.1954": {
    "notification_id": "829122",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829122"
  },
  "2026.1955": {
    "notification_id": "828677",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828677"
  },
  "2026.1957": {
    "notification_id": "829034",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829034"
  },
  "2026.1959": {
    "notification_id": "829108",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829108"
  },
  "2026.1960": {
    "notification_id": "829117",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829117"
  },
  "2026.1967": {
    "notification_id": "829081",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829081"
  },
  "2026.1970": {
    "notification_id": "829182",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829182"
  },
  "2026.1971": {
    "notification_id": "828819",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828819"
  },
  "2026.1975": {
    "notification_id": "829245",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829245"
  },
  "2026.1977": {
    "notification_id": "829168",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829168"
  },
  "2026.1979": {
    "notification_id": "829221",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829221"
  },
  "2026.1985": {
    "notification_id": "829162",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829162"
  },
  "2026.1986": {
    "notification_id": "828225",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828225"
  },
  "2026.1987": {
    "notification_id": "829167",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829167"
  },
  "2026.1988": {
    "notification_id": "829196",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829196"
  },
  "2026.1991": {
    "notification_id": "829238",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829238"
  },
  "2026.1992": {
    "notification_id": "829304",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829304"
  },
  "2026.1993": {
    "notification_id": "829303",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829303"
  },
  "2026.1994": {
    "notification_id": "829373",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829373"
  },
  "2026.1995": {
    "notification_id": "829360",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829360"
  },
  "2026.1996": {
    "notification_id": "829199",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829199"
  },
  "2026.1997": {
    "notification_id": "829349",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829349"
  },
  "2026.1998": {
    "notification_id": "829266",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829266"
  },
  "2026.2000": {
    "notification_id": "829422",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829422"
  },
  "2026.2001": {
    "notification_id": "829286",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829286"
  },
  "2026.2002": {
    "notification_id": "829224",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829224"
  },
  "2026.2004": {
    "notification_id": "829183",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829183"
  },
  "2026.2005": {
    "notification_id": "829383",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829383"
  },
  "2026.2007": {
    "notification_id": "829417",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829417"
  },
  "2026.2008": {
    "notification_id": "829149",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829149"
  },
  "2026.2011": {
    "notification_id": "829485",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829485"
  },
  "2026.2012": {
    "notification_id": "829457",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829457"
  },
  "2026.2021": {
    "notification_id": "829435",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829435"
  },
  "2026.2023": {
    "notification_id": "829509",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829509"
  },
  "2026.2024": {
    "notification_id": "829582",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829582"
  },
  "2026.2025": {
    "notification_id": "828120",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828120"
  },
  "2026.2029": {
    "notification_id": "829592",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829592"
  },
  "2026.2030": {
    "notification_id": "829140",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829140"
  },
  "2026.2032": {
    "notification_id": "829560",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829560"
  },
  "2026.2033": {
    "notification_id": "829300",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829300"
  },
  "2026.2034": {
    "notification_id": "829610",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829610"
  },
  "2026.2035": {
    "notification_id": "829366",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829366"
  },
  "2026.2038": {
    "notification_id": "829669",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829669"
  },
  "2026.2039": {
    "notification_id": "829664",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829664"
  },
  "2026.2040": {
    "notification_id": "829678",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829678"
  },
  "2026.2043": {
    "notification_id": "829765",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829765"
  },
  "2026.2044": {
    "notification_id": "829636",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829636"
  },
  "2026.2045": {
    "notification_id": "829758",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829758"
  },
  "2026.2046": {
    "notification_id": "829727",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829727"
  },
  "2026.2048": {
    "notification_id": "829770",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829770"
  },
  "2026.2049": {
    "notification_id": "823976",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823976"
  },
  "2026.2050": {
    "notification_id": "829703",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829703"
  },
  "2026.2051": {
    "notification_id": "823989",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823989"
  },
  "2026.2052": {
    "notification_id": "829700",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829700"
  },
  "2026.2053": {
    "notification_id": "829594",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829594"
  },
  "2026.2055": {
    "notification_id": "823982",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823982"
  },
  "2026.2060": {
    "notification_id": "829657",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829657"
  },
  "2026.2061": {
    "notification_id": "829640",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829640"
  },
  "2026.2063": {
    "notification_id": "829570",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829570"
  },
  "2026.2067": {
    "notification_id": "829804",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829804"
  },
  "2026.2068": {
    "notification_id": "829620",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829620"
  },
  "2026.2078": {
    "notification_id": "829813",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829813"
  },
  "2026.2087": {
    "notification_id": "829878",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829878"
  },
  "2026.2088": {
    "notification_id": "829877",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829877"
  },
  "2026.2090": {
    "notification_id": "829811",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829811"
  },
  "2026.2091": {
    "notification_id": "829896",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829896"
  },
  "2026.2092": {
    "notification_id": "829472",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829472"
  },
  "2026.2098": {
    "notification_id": "827579",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/827579"
  },
  "2026.2101": {
    "notification_id": "830083",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830083"
  },
  "2026.2102": {
    "notification_id": "828794",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828794"
  },
  "2026.2107": {
    "notification_id": "830092",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830092"
  },
  "2026.2108": {
    "notification_id": "829894",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829894"
  },
  "2026.2110": {
    "notification_id": "829994",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829994"
  },
  "2026.2115": {
    "notification_id": "830084",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830084"
  },
  "2026.2116": {
    "notification_id": "830169",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830169"
  },
  "2026.2117": {
    "notification_id": "830118",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830118"
  },
  "2026.2119": {
    "notification_id": "830117",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830117"
  },
  "2026.2122": {
    "notification_id": "830109",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830109"
  },
  "2026.2123": {
    "notification_id": "830048",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830048"
  },
  "2026.2127": {
    "notification_id": "823991",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823991"
  },
  "2026.2128": {
    "notification_id": "830119",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830119"
  },
  "2026.2131": {
    "notification_id": "830351",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830351"
  },
  "2026.2132": {
    "notification_id": "829655",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829655"
  },
  "2026.2135": {
    "notification_id": "830195",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830195"
  },
  "2026.2136": {
    "notification_id": "830104",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830104"
  },
  "2026.2137": {
    "notification_id": "829660",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829660"
  },
  "2026.2138": {
    "notification_id": "829565",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829565"
  },
  "2026.2140": {
    "notification_id": "829642",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829642"
  },
  "2026.2141": {
    "notification_id": "830302",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830302"
  },
  "2026.2142": {
    "notification_id": "828931",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828931"
  },
  "2026.2143": {
    "notification_id": "830417",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830417"
  },
  "2026.2144": {
    "notification_id": "830271",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830271"
  },
  "2026.2146": {
    "notification_id": "830415",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830415"
  },
  "2026.2147": {
    "notification_id": "830403",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830403"
  },
  "2026.2148": {
    "notification_id": "829773",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829773"
  },
  "2026.2149": {
    "notification_id": "829771",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829771"
  },
  "2026.2150": {
    "notification_id": "830462",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830462"
  },
  "2026.2151": {
    "notification_id": "830161",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830161"
  },
  "2026.2152": {
    "notification_id": "830091",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830091"
  },
  "2026.2153": {
    "notification_id": "828043",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828043"
  },
  "2026.2156": {
    "notification_id": "829338",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829338"
  },
  "2026.2158": {
    "notification_id": "830490",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830490"
  },
  "2026.2162": {
    "notification_id": "829978",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829978"
  },
  "2026.2163": {
    "notification_id": "828905",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828905"
  },
  "2026.2169": {
    "notification_id": "830591",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830591"
  },
  "2026.2172": {
    "notification_id": "830487",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830487"
  },
  "2026.2189": {
    "notification_id": "830631",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830631"
  },
  "2026.2190": {
    "notification_id": "830645",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830645"
  },
  "2026.2191": {
    "notification_id": "830735",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830735"
  },
  "2026.2192": {
    "notification_id": "830402",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830402"
  },
  "2026.2193": {
    "notification_id": "830622",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830622"
  },
  "2026.2194": {
    "notification_id": "830769",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830769"
  },
  "2026.2197": {
    "notification_id": "830789",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830789"
  },
  "2026.2199": {
    "notification_id": "830804",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830804"
  },
  "2026.2200": {
    "notification_id": "829861",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829861"
  },
  "2026.2203": {
    "notification_id": "830594",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830594"
  },
  "2026.2206": {
    "notification_id": "830746",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830746"
  },
  "2026.2209": {
    "notification_id": "823025",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/823025"
  },
  "2026.2214": {
    "notification_id": "830780",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830780"
  },
  "2026.2217": {
    "notification_id": "830843",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830843"
  },
  "2026.2219": {
    "notification_id": "830809",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830809"
  },
  "2026.2232": {
    "notification_id": "830981",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830981"
  },
  "2026.2251": {
    "notification_id": "831091",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831091"
  },
  "2026.2252": {
    "notification_id": "831077",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831077"
  },
  "2026.2254": {
    "notification_id": "830912",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830912"
  },
  "2026.2255": {
    "notification_id": "831000",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831000"
  },
  "2026.2257": {
    "notification_id": "831042",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831042"
  },
  "2026.2258": {
    "notification_id": "831179",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831179"
  },
  "2026.2262": {
    "notification_id": "830916",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830916"
  },
  "2026.2264": {
    "notification_id": "830924",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830924"
  },
  "2026.2265": {
    "notification_id": "831280",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831280"
  },
  "2026.2266": {
    "notification_id": "830717",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830717"
  },
  "2026.2267": {
    "notification_id": "829951",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829951"
  },
  "2026.2270": {
    "notification_id": "830105",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830105"
  },
  "2026.2271": {
    "notification_id": "830425",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830425"
  },
  "2026.2272": {
    "notification_id": "831192",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831192"
  },
  "2026.2273": {
    "notification_id": "831226",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831226"
  },
  "2026.2274": {
    "notification_id": "831219",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831219"
  },
  "2026.2275": {
    "notification_id": "830996",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830996"
  },
  "2026.2279": {
    "notification_id": "831233",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831233"
  },
  "2026.2280": {
    "notification_id": "831036",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831036"
  },
  "2026.2286": {
    "notification_id": "831320",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831320"
  },
  "2026.2287": {
    "notification_id": "831265",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831265"
  },
  "2026.2288": {
    "notification_id": "831293",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831293"
  },
  "2026.2291": {
    "notification_id": "831098",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831098"
  },
  "2026.2293": {
    "notification_id": "831345",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831345"
  },
  "2026.2296": {
    "notification_id": "831379",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831379"
  },
  "2026.2301": {
    "notification_id": "830937",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830937"
  },
  "2026.2303": {
    "notification_id": "831140",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831140"
  },
  "2026.2304": {
    "notification_id": "831363",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831363"
  },
  "2026.2307": {
    "notification_id": "831412",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831412"
  },
  "2026.2315": {
    "notification_id": "831401",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831401"
  },
  "2026.2316": {
    "notification_id": "831404",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831404"
  },
  "2026.2323": {
    "notification_id": "831543",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831543"
  },
  "2026.2326": {
    "notification_id": "831532",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831532"
  },
  "2026.2333": {
    "notification_id": "831424",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831424"
  },
  "2026.2334": {
    "notification_id": "826724",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826724"
  },
  "2026.2335": {
    "notification_id": "831391",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831391"
  },
  "2026.2338": {
    "notification_id": "831643",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831643"
  },
  "2026.2340": {
    "notification_id": "831652",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831652"
  },
  "2026.2342": {
    "notification_id": "831613",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831613"
  },
  "2026.2345": {
    "notification_id": "831468",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831468"
  },
  "2026.2347": {
    "notification_id": "831662",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831662"
  },
  "2026.2349": {
    "notification_id": "830901",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830901"
  },
  "2026.2350": {
    "notification_id": "831685",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831685"
  },
  "2026.2351": {
    "notification_id": "831689",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831689"
  },
  "2026.2352": {
    "notification_id": "831096",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831096"
  },
  "2026.2354": {
    "notification_id": "831354",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831354"
  },
  "2026.2357": {
    "notification_id": "831722",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831722"
  },
  "2026.2358": {
    "notification_id": "830941",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830941"
  },
  "2026.2359": {
    "notification_id": "831600",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831600"
  },
  "2026.2370": {
    "notification_id": "829618",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/829618"
  },
  "2026.2375": {
    "notification_id": "831849",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831849"
  },
  "2026.2379": {
    "notification_id": "831878",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831878"
  },
  "2026.2380": {
    "notification_id": "831743",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831743"
  },
  "2026.2381": {
    "notification_id": "828400",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/828400"
  },
  "2026.2383": {
    "notification_id": "831946",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831946"
  },
  "2026.2387": {
    "notification_id": "831697",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831697"
  },
  "2026.2388": {
    "notification_id": "831829",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831829"
  },
  "2026.2400": {
    "notification_id": "831681",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831681"
  },
  "2026.2401": {
    "notification_id": "831617",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831617"
  },
  "2026.2404": {
    "notification_id": "832021",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832021"
  },
  "2026.2405": {
    "notification_id": "831957",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831957"
  },
  "2026.2406": {
    "notification_id": "832012",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832012"
  },
  "2026.2407": {
    "notification_id": "831936",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831936"
  },
  "2026.2408": {
    "notification_id": "832097",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832097"
  },
  "2026.2409": {
    "notification_id": "832072",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832072"
  },
  "2026.2410": {
    "notification_id": "832002",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832002"
  },
  "2026.2411": {
    "notification_id": "831173",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831173"
  },
  "2026.2413": {
    "notification_id": "831568",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831568"
  },
  "2026.2414": {
    "notification_id": "832018",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832018"
  },
  "2026.2415": {
    "notification_id": "831802",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831802"
  },
  "2026.2416": {
    "notification_id": "826805",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/826805"
  },
  "2026.2417": {
    "notification_id": "832129",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832129"
  },
  "2026.2418": {
    "notification_id": "831663",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831663"
  },
  "2026.2419": {
    "notification_id": "832139",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832139"
  },
  "2026.2422": {
    "notification_id": "831494",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831494"
  },
  "2026.2423": {
    "notification_id": "830044",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830044"
  },
  "2026.2424": {
    "notification_id": "830082",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830082"
  },
  "2026.2425": {
    "notification_id": "830266",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/830266"
  },
  "2026.2426": {
    "notification_id": "832118",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832118"
  },
  "2026.2427": {
    "notification_id": "832156",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832156"
  },
  "2026.2428": {
    "notification_id": "832024",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832024"
  },
  "2026.2429": {
    "notification_id": "832135",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832135"
  },
  "2026.2430": {
    "notification_id": "832106",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832106"
  },
  "2026.2431": {
    "notification_id": "831846",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831846"
  },
  "2026.2432": {
    "notification_id": "832134",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832134"
  },
  "2026.2433": {
    "notification_id": "832050",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/832050"
  },
  "2026.2434": {
    "notification_id": "831146",
    "notification_url": "https://webgate.ec.europa.eu/rasff-window/screen/notification/831146"
  },
};
