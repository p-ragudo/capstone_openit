export const DAYS_LABELS = ["SU", "M", "T", "W", "TH", "F", "S"];

export const SEARCH_LABELS = {
  AIRCON:   "Search Aircons",
  FRIDGE:   "Search Fridges",
  TV:       "Search TVs",
  WASHER:   "Search Washers",
  OVEN:     "Search Ovens",
  COMPUTER: "Search Computers",
  LIGHTS:   "Search Lights",
};

export const CATEGORIES = [
  { key: "AIRCON",   label: "AIRCON"   },
  { key: "FRIDGE",   label: "FRIDGE"   },
  { key: "TV",       label: "TV"       },
  { key: "WASHER",   label: "WASHER"   },
  { key: "OVEN",     label: "OVEN"     },
  { key: "COMPUTER", label: "COMPUTER" },
  { key: "LIGHTS",   label: "LIGHTS"   },
];

export const APPLIANCE_DATA = {
  AIRCON: [
    { name: "Air Conditioner - Split Type, Inverter (1.00 HP)", watts: 1450 },
    { name: "Air Conditioner - Split Type, Inverter (1.50 HP)", watts: 2150 },
    { name: "Air Conditioner - Split Type, Inverter (2.00 HP)", watts: 2900 },
    { name: "Air Conditioner - Window Type (1.00 HP)",          watts: 900  },
    { name: "Air Conditioner - Window Type (1.50 HP)",          watts: 1350 },
    { name: "Portable Air Conditioner (1.00 HP)",               watts: 1200 },
  ],
  FRIDGE: [
    { name: "Refrigerator - Single Door (3 cu ft)", watts: 60  },
    { name: "Refrigerator - Single Door (5 cu ft)", watts: 80  },
    { name: "Refrigerator - Two Door (7 cu ft)",    watts: 120 },
    { name: "Refrigerator - Two Door (10 cu ft)",   watts: 160 },
    { name: "Side-by-Side Refrigerator (16 cu ft)", watts: 200 },
    { name: "Chest Freezer (5 cu ft)",              watts: 100 },
  ],
  TV: [
    { name: "LED TV 24\"",   watts: 25  }, { name: "LED TV 32\"",   watts: 40  },
    { name: "LED TV 43\"",   watts: 80  }, { name: "LED TV 55\"",   watts: 130 },
    { name: "OLED TV 55\"",  watts: 100 }, { name: "Smart TV 32\"", watts: 45  },
    { name: "Smart TV 43\"", watts: 85  },
  ],
  WASHER: [
    { name: "Washing Machine - Top Load (6 kg)",   watts: 350 },
    { name: "Washing Machine - Top Load (8 kg)",   watts: 500 },
    { name: "Washing Machine - Front Load (7 kg)", watts: 350 },
    { name: "Washing Machine - Front Load (8 kg)", watts: 400 },
    { name: "Washing Machine - Twin Tub (6 kg)",   watts: 300 },
  ],
  OVEN: [
    { name: "Microwave Oven (20L)", watts: 1000 }, { name: "Microwave Oven (30L)", watts: 1200 },
    { name: "Electric Oven (25L)",  watts: 1200 }, { name: "Electric Oven (42L)",  watts: 1800 },
    { name: "Toaster Oven (15L)",   watts: 800  }, { name: "Air Fryer (3L)",       watts: 1200 },
    { name: "Air Fryer (5L)",       watts: 1500 },
  ],
  COMPUTER: [
    { name: "Desktop Computer (Office Use)", watts: 150 }, { name: "Desktop Computer (Mid Range)", watts: 250 },
    { name: "Desktop Computer (Gaming)",     watts: 600 }, { name: "Laptop (Budget)",              watts: 45  },
    { name: "Laptop (Standard)",             watts: 60  }, { name: "Gaming Laptop",                watts: 150 },
    { name: "All-in-One PC",                 watts: 100 },
  ],
  LIGHTS: [
    { name: "LED Bulb (5W)",          watts: 5  }, { name: "LED Bulb (9W)",          watts: 9  },
    { name: "LED Bulb (14W)",         watts: 14 }, { name: "LED Tube Light (18W)",   watts: 18 },
    { name: "LED Downlight (12W)",    watts: 12 }, { name: "Fluorescent Lamp (20W)", watts: 20 },
    { name: "Fluorescent Lamp (40W)", watts: 40 },
  ],
};

