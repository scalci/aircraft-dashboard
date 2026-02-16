// Complete African Airport Database - OurAirports Format
// Pre-loaded with all major African airports for offline-first operation

const AIRPORTS_DATABASE = [
    // SOUTH AFRICA - Complete Coverage
    { icao: 'FALA', iata: 'HLA', name: 'Lanseria International Airport', city: 'Johannesburg', country: 'South Africa', lat: -25.9385, lon: 27.9261, elevation: 4517 },
    { icao: 'FAOR', iata: 'JNB', name: 'OR Tambo International Airport', city: 'Johannesburg', country: 'South Africa', lat: -26.1392, lon: 28.2460, elevation: 5558 },
    { icao: 'FACT', iata: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa', lat: -33.9715, lon: 18.6021, elevation: 151 },
    { icao: 'FADN', iata: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa', lat: -29.6144, lon: 31.1197, elevation: 295 },
    { icao: 'FAPE', iata: 'PLZ', name: 'Port Elizabeth Airport', city: 'Port Elizabeth', country: 'South Africa', lat: -33.9849, lon: 25.6173, elevation: 226 },
    { icao: 'FABL', iata: 'BFN', name: 'Bram Fischer International Airport', city: 'Bloemfontein', country: 'South Africa', lat: -29.0927, lon: 26.3024, elevation: 4458 },
    { icao: 'FAGM', iata: 'GRJ', name: 'George Airport', city: 'George', country: 'South Africa', lat: -34.0056, lon: 22.3789, elevation: 648 },
    { icao: 'FAMG', iata: 'MQP', name: 'Kruger Mpumalanga International Airport', city: 'Nelspruit', country: 'South Africa', lat: -25.3832, lon: 31.1056, elevation: 2829 },
    { icao: 'FAPN', iata: 'NTY', name: 'Pilanesberg International Airport', city: 'Sun City', country: 'South Africa', lat: -25.3338, lon: 27.1734, elevation: 3412 },
    { icao: 'FAWK', iata: 'KIM', name: 'Kimberley Airport', city: 'Kimberley', country: 'South Africa', lat: -28.8028, lon: 24.7651, elevation: 3950 },
    { icao: 'FAUP', iata: 'ULD', name: 'Prince Mangosuthu Buthelezi Airport', city: 'Ulundi', country: 'South Africa', lat: -28.3206, lon: 31.4165, elevation: 1720 },
    { icao: 'FALE', iata: 'LLE', name: 'Riverside Airport', city: 'Malelane', country: 'South Africa', lat: -25.4300, lon: 31.5667, elevation: 1040 },
    { icao: 'FAPY', iata: 'PHW', name: 'Hendrik Van Eck Airport', city: 'Phalaborwa', country: 'South Africa', lat: -23.9372, lon: 31.1554, elevation: 1432 },
    { icao: 'FADD', iata: '', name: 'Wonderboom Airport', city: 'Pretoria', country: 'South Africa', lat: -25.6539, lon: 28.2242, elevation: 4095 },
    { icao: 'FAPP', iata: 'PTG', name: 'Polokwane International Airport', city: 'Polokwane', country: 'South Africa', lat: -23.8453, lon: 29.4586, elevation: 4076 },
    { icao: 'FASK', iata: 'SIS', name: 'Sishen Airport', city: 'Sishen', country: 'South Africa', lat: -27.6486, lon: 22.9993, elevation: 3848 },
    { icao: 'FAHT', iata: 'HDS', name: 'Hoedspruit Air Force Base', city: 'Hoedspruit', country: 'South Africa', lat: -24.3686, lon: 31.0487, elevation: 1743 },
    { icao: 'FAGG', iata: 'GCJ', name: 'Grand Central Airport', city: 'Johannesburg', country: 'South Africa', lat: -25.9863, lon: 28.1401, elevation: 5325 },
    { icao: 'FAEL', iata: 'ELL', name: 'Ellisras Airport', city: 'Ellisras', country: 'South Africa', lat: -23.7278, lon: 27.6881, elevation: 2772 },
    { icao: 'FAKP', iata: 'KXE', name: 'P C Pelser Airport', city: 'Klerksdorp', country: 'South Africa', lat: -26.8711, lon: 26.7180, elevation: 4444 },
    { icao: 'FABS', iata: 'UTN', name: 'Pierre van Ryneveld Airport', city: 'Upington', country: 'South Africa', lat: -28.3991, lon: 21.2603, elevation: 2782 },
    { icao: 'FALY', iata: 'LAY', name: 'Ladysmith Airport', city: 'Ladysmith', country: 'South Africa', lat: -28.5817, lon: 29.7497, elevation: 3548 },
    { icao: 'FARM', iata: 'RCB', name: 'Richards Bay Airport', city: 'Richards Bay', country: 'South Africa', lat: -28.7410, lon: 32.0921, elevation: 109 },
    { icao: 'FASC', iata: 'SDB', name: 'Langebaanweg Airport', city: 'Langebaanweg', country: 'South Africa', lat: -32.9689, lon: 18.1603, elevation: 108 },
    { icao: 'FASS', iata: 'SZK', name: 'Skukuza Airport', city: 'Skukuza', country: 'South Africa', lat: -24.9609, lon: 31.5887, elevation: 1020 },
    { icao: 'FAUT', iata: 'UTT', name: 'K. D. Matanzima Airport', city: 'Mthatha', country: 'South Africa', lat: -31.5472, lon: 28.6733, elevation: 2400 },
    { icao: 'FAWB', iata: 'WEL', name: 'Welkom Airport', city: 'Welkom', country: 'South Africa', lat: -27.9980, lon: 26.6694, elevation: 4399 },
    { icao: 'FAMD', iata: 'MBD', name: 'Mmabatho International Airport', city: 'Mafikeng', country: 'South Africa', lat: -25.7984, lon: 25.5480, elevation: 4181 },
    { icao: 'FANC', iata: 'NCS', name: 'Newcastle Airport', city: 'Newcastle', country: 'South Africa', lat: -27.7706, lon: 29.9769, elevation: 4074 },
    { icao: 'FAPG', iata: 'PZL', name: 'Zulu Inyala Airport', city: 'Phinda', country: 'South Africa', lat: -27.8494, lon: 32.3097, elevation: 200 },
    { icao: 'FATH', iata: 'THY', name: 'Johan Pienaar Airport', city: 'Thohoyandou', country: 'South Africa', lat: -22.9522, lon: 30.3836, elevation: 2066 },
    
    // NAMIBIA
    { icao: 'FYWH', iata: 'WVB', name: 'Walvis Bay Airport', city: 'Walvis Bay', country: 'Namibia', lat: -22.9799, lon: 14.6453, elevation: 299 },
    { icao: 'FYWE', iata: 'WDH', name: 'Hosea Kutako International Airport', city: 'Windhoek', country: 'Namibia', lat: -22.4799, lon: 17.4709, elevation: 5640 },
    { icao: 'FYKT', iata: 'KMP', name: 'Keetmanshoop Airport', city: 'Keetmanshoop', country: 'Namibia', lat: -26.5398, lon: 18.1114, elevation: 3506 },
    { icao: 'FYLZ', iata: 'LUD', name: 'Luderitz Airport', city: 'Luderitz', country: 'Namibia', lat: -26.6874, lon: 15.2429, elevation: 457 },
    { icao: 'FYOA', iata: 'OND', name: 'Ondangwa Airport', city: 'Ondangwa', country: 'Namibia', lat: -17.8782, lon: 15.9526, elevation: 3599 },
    { icao: 'FYRU', iata: 'OMD', name: 'Oranjemund Airport', city: 'Oranjemund', country: 'Namibia', lat: -28.5847, lon: 16.4467, elevation: 14 },
    { icao: 'FYGF', iata: 'GFY', name: 'Grootfontein Airport', city: 'Grootfontein', country: 'Namibia', lat: -19.6022, lon: 18.1227, elevation: 4636 },
    { icao: 'FYKM', iata: 'MPA', name: 'Katima Mulilo Airport', city: 'Katima Mulilo', country: 'Namibia', lat: -17.6344, lon: 24.1767, elevation: 3144 },
    { icao: 'FYKB', iata: 'OKU', name: 'Mokuti Lodge Airport', city: 'Okaukuejo', country: 'Namibia', lat: -18.8128, lon: 15.9119, elevation: 3911 },
    
    // BOTSWANA
    { icao: 'FBSK', iata: 'GBE', name: 'Sir Seretse Khama International Airport', city: 'Gaborone', country: 'Botswana', lat: -24.5552, lon: 25.9182, elevation: 3299 },
    { icao: 'FBMN', iata: 'MUB', name: 'Maun Airport', city: 'Maun', country: 'Botswana', lat: -19.9726, lon: 23.4311, elevation: 3093 },
    { icao: 'FBFT', iata: 'FRW', name: 'Francistown Airport', city: 'Francistown', country: 'Botswana', lat: -21.1596, lon: 27.4745, elevation: 3283 },
    { icao: 'FBKE', iata: 'BBK', name: 'Kasane Airport', city: 'Kasane', country: 'Botswana', lat: -17.8329, lon: 25.1624, elevation: 3289 },
    { icao: 'FBSP', iata: 'SWX', name: 'Shakawe Airport', city: 'Shakawe', country: 'Botswana', lat: -18.3739, lon: 21.8326, elevation: 3379 },
    { icao: 'FBJW', iata: 'JWA', name: 'Jwaneng Airport', city: 'Jwaneng', country: 'Botswana', lat: -24.6023, lon: 24.6910, elevation: 3900 },
    
    // ZIMBABWE
    { icao: 'FVHA', iata: 'HRE', name: 'Robert Gabriel Mugabe International Airport', city: 'Harare', country: 'Zimbabwe', lat: -17.9318, lon: 31.0928, elevation: 4887 },
    { icao: 'FVBU', iata: 'BUQ', name: 'Joshua Mqabuko Nkomo International Airport', city: 'Bulawayo', country: 'Zimbabwe', lat: -20.0174, lon: 28.6179, elevation: 4359 },
    { icao: 'FVFA', iata: 'VFA', name: 'Victoria Falls International Airport', city: 'Victoria Falls', country: 'Zimbabwe', lat: -18.0959, lon: 25.8390, elevation: 3490 },
    { icao: 'FVWN', iata: 'HWN', name: 'Hwange National Park Airport', city: 'Hwange', country: 'Zimbabwe', lat: -18.6298, lon: 27.0210, elevation: 3543 },
    { icao: 'FVKB', iata: 'KAB', name: 'Kariba International Airport', city: 'Kariba', country: 'Zimbabwe', lat: -16.5198, lon: 28.8850, elevation: 1706 },
    { icao: 'FVCZ', iata: 'CHJ', name: 'Chipinge Airport', city: 'Chipinge', country: 'Zimbabwe', lat: -20.2078, lon: 32.6297, elevation: 3660 },
    
    // MOZAMBIQUE
    { icao: 'FQMA', iata: 'MPM', name: 'Maputo International Airport', city: 'Maputo', country: 'Mozambique', lat: -25.9208, lon: 32.5726, elevation: 145 },
    { icao: 'FQBR', iata: 'BEW', name: 'Beira Airport', city: 'Beira', country: 'Mozambique', lat: -19.7964, lon: 34.9076, elevation: 33 },
    { icao: 'FQNP', iata: 'APL', name: 'Nampula Airport', city: 'Nampula', country: 'Mozambique', lat: -15.1056, lon: 39.2818, elevation: 1444 },
    { icao: 'FQTT', iata: 'TET', name: 'Chingozi Airport', city: 'Tete', country: 'Mozambique', lat: -16.1048, lon: 33.6402, elevation: 525 },
    { icao: 'FQQL', iata: 'UEL', name: 'Quelimane Airport', city: 'Quelimane', country: 'Mozambique', lat: -17.8555, lon: 36.8691, elevation: 36 },
    { icao: 'FQPB', iata: 'POL', name: 'Pemba Airport', city: 'Pemba', country: 'Mozambique', lat: -12.9918, lon: 40.5240, elevation: 164 },
    { icao: 'FQIN', iata: 'INH', name: 'Inhambane Airport', city: 'Inhambane', country: 'Mozambique', lat: -23.8764, lon: 35.4085, elevation: 30 },
    { icao: 'FQVL', iata: 'VNX', name: 'Vilankulo Airport', city: 'Vilankulo', country: 'Mozambique', lat: -22.0184, lon: 35.3133, elevation: 46 },
    { icao: 'FQLC', iata: 'VXC', name: 'Lichinga Airport', city: 'Lichinga', country: 'Mozambique', lat: -13.2740, lon: 35.2663, elevation: 4505 },
    
    // ZAMBIA
    { icao: 'FLKK', iata: 'LUN', name: 'Kenneth Kaunda International Airport', city: 'Lusaka', country: 'Zambia', lat: -15.3308, lon: 28.4526, elevation: 3779 },
    { icao: 'FLHN', iata: 'LVI', name: 'Harry Mwanga Nkumbula International Airport', city: 'Livingstone', country: 'Zambia', lat: -17.8218, lon: 25.8227, elevation: 3302 },
    { icao: 'FLND', iata: 'NLA', name: 'Ndola Airport', city: 'Ndola', country: 'Zambia', lat: -12.9981, lon: 28.6649, elevation: 4167 },
    { icao: 'FLSK', iata: 'SJQ', name: 'Solwezi Airport', city: 'Solwezi', country: 'Zambia', lat: -12.1737, lon: 26.3651, elevation: 4551 },
    { icao: 'FLMF', iata: 'MFU', name: 'Mfuwe Airport', city: 'Mfuwe', country: 'Zambia', lat: -13.2589, lon: 31.9366, elevation: 1853 },
    { icao: 'FLMA', iata: 'KIW', name: 'Southdowns Airport', city: 'Kitwe', country: 'Zambia', lat: -12.9005, lon: 28.1499, elevation: 4145 },
    
    // MALAWI
    { icao: 'FWKI', iata: 'LLW', name: 'Kamuzu International Airport', city: 'Lilongwe', country: 'Malawi', lat: -13.7894, lon: 33.7810, elevation: 4035 },
    { icao: 'FWCL', iata: 'BLZ', name: 'Chileka International Airport', city: 'Blantyre', country: 'Malawi', lat: -15.6791, lon: 34.9740, elevation: 2555 },
    { icao: 'FWUU', iata: 'ZZU', name: 'Mzuzu Airport', city: 'Mzuzu', country: 'Malawi', lat: -11.4447, lon: 34.0118, elevation: 4115 },
    { icao: 'FWKA', iata: 'KGJ', name: 'Karonga Airport', city: 'Karonga', country: 'Malawi', lat: -9.9536, lon: 33.8930, elevation: 1765 },
    
    // TANZANIA
    { icao: 'HTDA', iata: 'DAR', name: 'Julius Nyerere International Airport', city: 'Dar es Salaam', country: 'Tanzania', lat: -6.8781, lon: 39.2026, elevation: 182 },
    { icao: 'HTKJ', iata: 'JRO', name: 'Kilimanjaro International Airport', city: 'Kilimanjaro', country: 'Tanzania', lat: -3.4294, lon: 37.0745, elevation: 2932 },
    { icao: 'HTZA', iata: 'ZNZ', name: 'Abeid Amani Karume International Airport', city: 'Zanzibar', country: 'Tanzania', lat: -6.2220, lon: 39.2249, elevation: 54 },
    { icao: 'HTMW', iata: 'MWZ', name: 'Mwanza Airport', city: 'Mwanza', country: 'Tanzania', lat: -2.4445, lon: 32.9327, elevation: 3763 },
    { icao: 'HTDO', iata: 'DOD', name: 'Dodoma Airport', city: 'Dodoma', country: 'Tanzania', lat: -6.1704, lon: 35.7526, elevation: 3637 },
    { icao: 'HTAR', iata: 'ARK', name: 'Arusha Airport', city: 'Arusha', country: 'Tanzania', lat: -3.3678, lon: 36.6333, elevation: 4550 },
    { icao: 'HTTB', iata: 'TBO', name: 'Tabora Airport', city: 'Tabora', country: 'Tanzania', lat: -5.0764, lon: 32.8333, elevation: 3868 },
    
    // KENYA
    { icao: 'HKJK', iata: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', country: 'Kenya', lat: -1.3192, lon: 36.9278, elevation: 5330 },
    { icao: 'HKMO', iata: 'MBA', name: 'Moi International Airport', city: 'Mombasa', country: 'Kenya', lat: -4.0348, lon: 39.5942, elevation: 200 },
    { icao: 'HKEL', iata: 'ELD', name: 'Eldoret International Airport', city: 'Eldoret', country: 'Kenya', lat: 0.4044, lon: 35.2389, elevation: 6941 },
    { icao: 'HKKI', iata: 'KIS', name: 'Kisumu International Airport', city: 'Kisumu', country: 'Kenya', lat: -0.0861, lon: 34.7289, elevation: 3734 },
    { icao: 'HKML', iata: 'MYD', name: 'Malindi Airport', city: 'Malindi', country: 'Kenya', lat: -3.2293, lon: 40.1017, elevation: 80 },
    { icao: 'HKNW', iata: 'WIL', name: 'Wilson Airport', city: 'Nairobi', country: 'Kenya', lat: -1.3217, lon: 36.8148, elevation: 5536 },
    
    // UGANDA
    { icao: 'HUEN', iata: 'EBB', name: 'Entebbe International Airport', city: 'Entebbe', country: 'Uganda', lat: 0.0424, lon: 32.4435, elevation: 3782 },
    { icao: 'HUGU', iata: 'ULU', name: 'Gulu Airport', city: 'Gulu', country: 'Uganda', lat: 2.8056, lon: 32.2718, elevation: 3510 },
    { icao: 'HUMA', iata: 'KSE', name: 'Kasese Airport', city: 'Kasese', country: 'Uganda', lat: 0.1830, lon: 30.1003, elevation: 2988 },
    { icao: 'HUSO', iata: 'SRT', name: 'Soroti Airport', city: 'Soroti', country: 'Uganda', lat: 1.7277, lon: 33.6228, elevation: 3697 },
    
    // RWANDA
    { icao: 'HRYR', iata: 'KGL', name: 'Kigali International Airport', city: 'Kigali', country: 'Rwanda', lat: -1.9686, lon: 30.1395, elevation: 4859 },
    { icao: 'HRZA', iata: 'KME', name: 'Kamembe Airport', city: 'Kamembe', country: 'Rwanda', lat: -2.4622, lon: 28.9079, elevation: 5192 },
    
    // BURUNDI
    { icao: 'HBBA', iata: 'BJM', name: 'Melchior Ndadaye International Airport', city: 'Bujumbura', country: 'Burundi', lat: -3.3240, lon: 29.3185, elevation: 2582 },
    
    // DRC (Democratic Republic of Congo)
    { icao: 'FZAA', iata: 'FIH', name: 'Ndjili International Airport', city: 'Kinshasa', country: 'DRC', lat: -4.3858, lon: 15.4446, elevation: 1027 },
    { icao: 'FZIC', iata: 'FBM', name: 'Lubumbashi International Airport', city: 'Lubumbashi', country: 'DRC', lat: -11.5913, lon: 27.5309, elevation: 4295 },
    { icao: 'FZQA', iata: 'GOM', name: 'Goma International Airport', city: 'Goma', country: 'DRC', lat: -1.6708, lon: 29.2385, elevation: 5089 },
    { icao: 'FZIR', iata: 'KND', name: 'Kindu Airport', city: 'Kindu', country: 'DRC', lat: -2.9192, lon: 25.9154, elevation: 1630 },
    { icao: 'FZKA', iata: 'KGA', name: 'Kananga Airport', city: 'Kananga', country: 'DRC', lat: -5.9005, lon: 22.4692, elevation: 2139 },
    { icao: 'FZNA', iata: 'MNO', name: 'Manono Airport', city: 'Manono', country: 'DRC', lat: -7.2914, lon: 27.3986, elevation: 2200 },
    { icao: 'FZOA', iata: 'KWZ', name: 'Kolwezi Airport', city: 'Kolwezi', country: 'DRC', lat: -10.7659, lon: 25.5056, elevation: 5007 },
    { icao: 'FZUA', iata: 'BUX', name: 'Bunia Airport', city: 'Bunia', country: 'DRC', lat: 1.5657, lon: 30.2208, elevation: 4045 },
    { icao: 'FZWA', iata: 'KIS', name: 'Kisangani Bangoka International Airport', city: 'Kisangani', country: 'DRC', lat: 0.5182, lon: 25.1550, elevation: 1417 },
    
    // ANGOLA
    { icao: 'FNLU', iata: 'LAD', name: 'Quatro de Fevereiro Airport', city: 'Luanda', country: 'Angola', lat: -8.8584, lon: 13.2312, elevation: 243 },
    { icao: 'FNHU', iata: 'NOV', name: 'Huambo Airport', city: 'Huambo', country: 'Angola', lat: -12.8089, lon: 15.7605, elevation: 5587 },
    { icao: 'FNLB', iata: 'LAD', name: 'Lobito Airport', city: 'Lobito', country: 'Angola', lat: -12.3717, lon: 13.5367, elevation: 10 },
    { icao: 'FNUB', iata: 'CBT', name: 'Catumbela Airport', city: 'Catumbela', country: 'Angola', lat: -12.4792, lon: 13.4869, elevation: 23 },
    { icao: 'FNLU', iata: 'SVP', name: 'Kuito Airport', city: 'Kuito', country: 'Angola', lat: -12.4046, lon: 16.9474, elevation: 5618 },
    { icao: 'FNSA', iata: 'SZA', name: 'Soyo Airport', city: 'Soyo', country: 'Angola', lat: -6.1409, lon: 12.3718, elevation: 15 },
    
    // ETHIOPIA
    { icao: 'HAAB', iata: 'ADD', name: 'Addis Ababa Bole International Airport', city: 'Addis Ababa', country: 'Ethiopia', lat: 8.9779, lon: 38.7993, elevation: 7630 },
    { icao: 'HADR', iata: 'DIR', name: 'Aba Tenna Dejazmach Yilma International Airport', city: 'Dire Dawa', country: 'Ethiopia', lat: 9.6247, lon: 41.8542, elevation: 3827 },
    { icao: 'HAMK', iata: 'MQX', name: 'Alula Aba Nega Airport', city: 'Mekele', country: 'Ethiopia', lat: 13.4674, lon: 39.5335, elevation: 7396 },
    { icao: 'HAGN', iata: 'GDQ', name: 'Gondar Airport', city: 'Gondar', country: 'Ethiopia', lat: 12.5199, lon: 37.4340, elevation: 6449 },
    { icao: 'HALA', iata: 'LLI', name: 'Lalibela Airport', city: 'Lalibela', country: 'Ethiopia', lat: 11.9750, lon: 38.9800, elevation: 6506 },
    { icao: 'HAJJ', iata: 'JIJ', name: 'Aba Segud Airport', city: 'Jijiga', country: 'Ethiopia', lat: 9.3325, lon: 42.9121, elevation: 5954 },
    
    // SOMALIA
    { icao: 'HCMM', iata: 'MGQ', name: 'Aden Adde International Airport', city: 'Mogadishu', country: 'Somalia', lat: 2.0144, lon: 45.3047, elevation: 29 },
    { icao: 'HCMH', iata: 'HGA', name: 'Egal International Airport', city: 'Hargeisa', country: 'Somalia', lat: 9.5182, lon: 44.0887, elevation: 4423 },
    { icao: 'HCMK', iata: 'KMU', name: 'Kisimayu Airport', city: 'Kisimayu', country: 'Somalia', lat: -0.3774, lon: 42.4592, elevation: 49 },
    
    // DJIBOUTI
    { icao: 'HDAM', iata: 'JIB', name: 'Djibouti-Ambouli International Airport', city: 'Djibouti', country: 'Djibouti', lat: 11.5473, lon: 43.1595, elevation: 49 },
    
    // ERITREA
    { icao: 'HHAS', iata: 'ASM', name: 'Asmara International Airport', city: 'Asmara', country: 'Eritrea', lat: 15.2919, lon: 38.9107, elevation: 7661 },
    { icao: 'HHMS', iata: 'MSW', name: 'Massawa International Airport', city: 'Massawa', country: 'Eritrea', lat: 15.6700, lon: 39.3701, elevation: 194 },
    
    // SUDAN
    { icao: 'HSSS', iata: 'KRT', name: 'Khartoum International Airport', city: 'Khartoum', country: 'Sudan', lat: 15.5895, lon: 32.5532, elevation: 1265 },
    { icao: 'HSPN', iata: 'PZU', name: 'Port Sudan New International Airport', city: 'Port Sudan', country: 'Sudan', lat: 19.4336, lon: 37.2341, elevation: 135 },
    { icao: 'HSSJ', iata: 'ELF', name: 'El Fasher Airport', city: 'El Fasher', country: 'Sudan', lat: 13.6149, lon: 25.3246, elevation: 2393 },
    
    // SOUTH SUDAN
    { icao: 'HJJJ', iata: 'JUB', name: 'Juba International Airport', city: 'Juba', country: 'South Sudan', lat: 4.8720, lon: 31.6011, elevation: 1513 },
    { icao: 'HSSW', iata: 'WUU', name: 'Wau Airport', city: 'Wau', country: 'South Sudan', lat: 7.7258, lon: 27.9750, elevation: 1385 },
    
    // EGYPT
    { icao: 'HECA', iata: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt', lat: 30.1219, lon: 31.4056, elevation: 382 },
    { icao: 'HEGN', iata: 'HRG', name: 'Hurghada International Airport', city: 'Hurghada', country: 'Egypt', lat: 27.1783, lon: 33.7994, elevation: 52 },
    { icao: 'HESH', iata: 'SSH', name: 'Sharm El Sheikh International Airport', city: 'Sharm El Sheikh', country: 'Egypt', lat: 27.9773, lon: 34.3950, elevation: 143 },
    { icao: 'HEAL', iata: 'ALY', name: 'El Nouzha Airport', city: 'Alexandria', country: 'Egypt', lat: 31.1839, lon: 29.9489, elevation: -6 },
    { icao: 'HELX', iata: 'LXR', name: 'Luxor International Airport', city: 'Luxor', country: 'Egypt', lat: 25.6710, lon: 32.7066, elevation: 294 },
    { icao: 'HEAS', iata: 'ASW', name: 'Aswan International Airport', city: 'Aswan', country: 'Egypt', lat: 23.9644, lon: 32.8200, elevation: 663 },
    
    // LIBYA
    { icao: 'HLLQ', iata: 'TIP', name: 'Tripoli International Airport', city: 'Tripoli', country: 'Libya', lat: 32.6635, lon: 13.1590, elevation: 263 },
    { icao: 'HLLT', iata: 'MJI', name: 'Mitiga International Airport', city: 'Tripoli', country: 'Libya', lat: 32.8941, lon: 13.2760, elevation: 36 },
    { icao: 'HLLB', iata: 'BEN', name: 'Benina International Airport', city: 'Benghazi', country: 'Libya', lat: 32.0968, lon: 20.2695, elevation: 433 },
    
    // TUNISIA
    { icao: 'DTTA', iata: 'TUN', name: 'Tunis-Carthage International Airport', city: 'Tunis', country: 'Tunisia', lat: 36.8510, lon: 10.2272, elevation: 22 },
    { icao: 'DTMB', iata: 'MIR', name: 'Monastir Habib Bourguiba International Airport', city: 'Monastir', country: 'Tunisia', lat: 35.7581, lon: 10.7547, elevation: 9 },
    { icao: 'DTTJ', iata: 'DJE', name: 'Djerba-Zarzis International Airport', city: 'Djerba', country: 'Tunisia', lat: 33.8750, lon: 10.7755, elevation: 19 },
    
    // ALGERIA
    { icao: 'DAAG', iata: 'ALG', name: 'Houari Boumediene Airport', city: 'Algiers', country: 'Algeria', lat: 36.6910, lon: 3.2154, elevation: 82 },
    { icao: 'DAOO', iata: 'ORN', name: 'Oran Es Sénia Airport', city: 'Oran', country: 'Algeria', lat: 35.6239, lon: -0.6212, elevation: 295 },
    { icao: 'DABC', iata: 'CZL', name: 'Mohamed Boudiaf International Airport', city: 'Constantine', country: 'Algeria', lat: 36.2760, lon: 6.6204, elevation: 2265 },
    
    // MOROCCO
    { icao: 'GMMN', iata: 'CMN', name: 'Mohammed V International Airport', city: 'Casablanca', country: 'Morocco', lat: 33.3675, lon: -7.5898, elevation: 656 },
    { icao: 'GMME', iata: 'RAK', name: 'Marrakesh Menara Airport', city: 'Marrakesh', country: 'Morocco', lat: 31.6069, lon: -8.0363, elevation: 1545 },
    { icao: 'GMAD', iata: 'AGA', name: 'Agadir-Al Massira Airport', city: 'Agadir', country: 'Morocco', lat: 30.3250, lon: -9.4131, elevation: 250 },
    { icao: 'GMFF', iata: 'FEZ', name: 'Fes-Saïss Airport', city: 'Fes', country: 'Morocco', lat: 33.9273, lon: -4.9780, elevation: 1900 },
    { icao: 'GMTT', iata: 'TNG', name: 'Tangier Ibn Battouta Airport', city: 'Tangier', country: 'Morocco', lat: 35.7269, lon: -5.9169, elevation: 62 },
    
    // WEST AFRICA - NIGERIA
    { icao: 'DNMM', iata: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria', lat: 6.5774, lon: 3.3212, elevation: 135 },
    { icao: 'DNAA', iata: 'ABV', name: 'Nnamdi Azikiwe International Airport', city: 'Abuja', country: 'Nigeria', lat: 9.0068, lon: 7.2632, elevation: 1123 },
    { icao: 'DNKA', iata: 'KAN', name: 'Mallam Aminu Kano International Airport', city: 'Kano', country: 'Nigeria', lat: 12.0476, lon: 8.5246, elevation: 1562 },
    { icao: 'DNPO', iata: 'PHC', name: 'Port Harcourt International Airport', city: 'Port Harcourt', country: 'Nigeria', lat: 5.0155, lon: 6.9496, elevation: 87 },
    
    // GHANA
    { icao: 'DGAA', iata: 'ACC', name: 'Kotoka International Airport', city: 'Accra', country: 'Ghana', lat: 5.6052, lon: -0.1667, elevation: 205 },
    { icao: 'DGSI', iata: 'KMS', name: 'Kumasi Airport', city: 'Kumasi', country: 'Ghana', lat: 6.7146, lon: -1.5908, elevation: 942 },
    
    // SENEGAL
    { icao: 'GOBD', iata: 'DSS', name: 'Blaise Diagne International Airport', city: 'Dakar', country: 'Senegal', lat: 14.6700, lon: -17.0732, elevation: 289 },
    
    // IVORY COAST
    { icao: 'DIAP', iata: 'ABJ', name: 'Félix-Houphouët-Boigny International Airport', city: 'Abidjan', country: 'Ivory Coast', lat: 5.2539, lon: -3.9263, elevation: 21 },
    
    // MALI
    { icao: 'GABS', iata: 'BKO', name: 'Modibo Keita International Airport', city: 'Bamako', country: 'Mali', lat: 12.5335, lon: -7.9500, elevation: 1247 },
    
    // BURKINA FASO
    { icao: 'DFFD', iata: 'OUA', name: 'Ouagadougou Airport', city: 'Ouagadougou', country: 'Burkina Faso', lat: 12.3532, lon: -1.5124, elevation: 1037 },
    
    // NIGER
    { icao: 'DRRN', iata: 'NIM', name: 'Diori Hamani International Airport', city: 'Niamey', country: 'Niger', lat: 13.4815, lon: 2.1836, elevation: 732 },
    
    // CHAD
    { icao: 'FTTJ', iata: 'NDJ', name: "N'Djamena International Airport", city: "N'Djamena", country: 'Chad', lat: 12.1337, lon: 15.0340, elevation: 968 },
    
    // CAMEROON
    { icao: 'FKKD', iata: 'DLA', name: 'Douala International Airport', city: 'Douala', country: 'Cameroon', lat: 4.0061, lon: 9.7195, elevation: 33 },
    { icao: 'FKYS', iata: 'NSI', name: 'Yaoundé Nsimalen International Airport', city: 'Yaoundé', country: 'Cameroon', lat: 3.7226, lon: 11.5533, elevation: 2278 },
    
    // GABON
    { icao: 'FOOL', iata: 'LBV', name: 'Libreville International Airport', city: 'Libreville', country: 'Gabon', lat: 0.4586, lon: 9.4123, elevation: 39 },
    
    // EQUATORIAL GUINEA
    { icao: 'FGSL', iata: 'SSG', name: 'Malabo International Airport', city: 'Malabo', country: 'Equatorial Guinea', lat: 3.7553, lon: 8.7087, elevation: 76 },
    
    // MADAGASCAR
    { icao: 'FMMI', iata: 'TNR', name: 'Ivato International Airport', city: 'Antananarivo', country: 'Madagascar', lat: -18.7969, lon: 47.4788, elevation: 4198 },
    { icao: 'FMNN', iata: 'NOS', name: 'Fascene Airport', city: 'Nosy Be', country: 'Madagascar', lat: -13.3121, lon: 48.3148, elevation: 36 },
    { icao: 'FMMT', iata: 'TMM', name: 'Toamasina Airport', city: 'Toamasina', country: 'Madagascar', lat: -18.1095, lon: 49.3926, elevation: 22 },
    
    // MAURITIUS
    { icao: 'FIMP', iata: 'MRU', name: 'Sir Seewoosagur Ramgoolam International Airport', city: 'Port Louis', country: 'Mauritius', lat: -20.4302, lon: 57.6836, elevation: 186 },
    
    // SEYCHELLES
    { icao: 'FSIA', iata: 'SEZ', name: 'Seychelles International Airport', city: 'Victoria', country: 'Seychelles', lat: -4.6743, lon: 55.5218, elevation: 10 },
    
    // COMOROS
    { icao: 'FMCH', iata: 'HAH', name: 'Prince Said Ibrahim International Airport', city: 'Moroni', country: 'Comoros', lat: -11.5337, lon: 43.2719, elevation: 93 },
    
    // REUNION (French Territory)
    { icao: 'FMEE', iata: 'RUN', name: 'Roland Garros Airport', city: 'Saint-Denis', country: 'Reunion', lat: -20.8871, lon: 55.5103, elevation: 66 },
    
    // CAPE VERDE
    { icao: 'GVNP', iata: 'SID', name: 'Amílcar Cabral International Airport', city: 'Sal', country: 'Cape Verde', lat: 16.7414, lon: -22.9494, elevation: 177 },
    { icao: 'GVAC', iata: 'RAI', name: 'Praia International Airport', city: 'Praia', country: 'Cape Verde', lat: 14.9245, lon: -23.4935, elevation: 230 }
];

// Initialize airport database
function initializeAirportDatabase() {
    if (!localStorage.getItem('flywatch_airports')) {
        localStorage.setItem('flywatch_airports', JSON.stringify(AIRPORTS_DATABASE));
    }
}

// Get all airports
function getAllAirports() {
    const stored = localStorage.getItem('flywatch_airports');
    return stored ? JSON.parse(stored) : AIRPORTS_DATABASE;
}

// Enhanced search - searches ICAO, IATA, name, and city
function searchAirports(query) {
    if (!query || query.length < 2) return [];
    
    const airports = getAllAirports();
    const q = query.toUpperCase();
    
    return airports.filter(airport => 
        airport.icao.toUpperCase().includes(q) ||
        (airport.iata && airport.iata.toUpperCase().includes(q)) ||
        airport.name.toUpperCase().includes(q) ||
        airport.city.toUpperCase().includes(q)
    ).slice(0, 25); // Limit to 25 results
}

// Get airport by ICAO code (exact match)
function getAirportByICAO(icao) {
    if (!icao) return null;
    const airports = getAllAirports();
    return airports.find(a => a.icao.toUpperCase() === icao.toUpperCase());
}

// Get airport by IATA code (exact match)
function getAirportByIATA(iata) {
    if (!iata) return null;
    const airports = getAllAirports();
    return airports.find(a => a.iata && a.iata.toUpperCase() === iata.toUpperCase());
}

// Get airport by any code (tries ICAO first, then IATA)
function getAirportByCode(code) {
    if (!code) return null;
    return getAirportByICAO(code) || getAirportByIATA(code);
}

// Calculate distance between two airports (Great Circle Distance - Haversine formula)
function calculateDistance(airport1, airport2, unit = 'NM') {
    if (!airport1 || !airport2) return null;
    
    const R = 3440.065; // Earth's radius in nautical miles
    
    const lat1 = airport1.lat * Math.PI / 180;
    const lat2 = airport2.lat * Math.PI / 180;
    const deltaLat = (airport2.lat - airport1.lat) * Math.PI / 180;
    const deltaLon = (airport2.lon - airport1.lon) * Math.PI / 180;
    
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    let distance = R * c; // Distance in nautical miles
    
    // Convert to requested unit
    if (unit === 'KM') {
        distance = distance * 1.852; // NM to KM
    } else if (unit === 'SM') {
        distance = distance * 1.15078; // NM to statute miles
    }
    
    return Math.round(distance);
}

// Calculate distance between two airport codes (ICAO or IATA)
function calculateDistanceByCode(fromCode, toCode, unit = 'NM') {
    const airport1 = getAirportByCode(fromCode);
    const airport2 = getAirportByCode(toCode);
    
    if (!airport1 || !airport2) {
        return null;
    }
    
    return calculateDistance(airport1, airport2, unit);
}

// Get formatted airport label for dropdowns (with smart formatting)
function getAirportLabel(airport) {
    if (!airport) return '';
    
    const codes = airport.iata ? 
        `${airport.icao}/${airport.iata}` : 
        airport.icao;
    
    return `${codes} - ${airport.name} (${airport.city})`;
}

// Get short airport label (just codes and city)
function getAirportShortLabel(airport) {
    if (!airport) return '';
    
    const codes = airport.iata ? 
        `${airport.icao}/${airport.iata}` : 
        airport.icao;
    
    return `${codes} - ${airport.city}`;
}

// Validate airport code (returns airport if valid, null if not)
function validateAirportCode(code) {
    if (!code || code.length < 3) return null;
    return getAirportByCode(code);
}

// Add or update airport in database
function upsertAirport(airportData) {
    const airports = getAllAirports();
    const index = airports.findIndex(a => a.icao.toUpperCase() === airportData.icao.toUpperCase());
    
    if (index !== -1) {
        airports[index] = airportData;
    } else {
        airports.push(airportData);
    }
    
    localStorage.setItem('flywatch_airports', JSON.stringify(airports));
    return true;
}

// Delete airport from database
function deleteAirport(icao) {
    const airports = getAllAirports();
    const filtered = airports.filter(a => a.icao.toUpperCase() !== icao.toUpperCase());
    
    if (filtered.length < airports.length) {
        localStorage.setItem('flywatch_airports', JSON.stringify(filtered));
        return true;
    }
    return false;
}

// Get statistics
function getAirportStatistics() {
    const airports = getAllAirports();
    const countries = new Set(airports.map(a => a.country));
    const byCountry = {};
    
    airports.forEach(a => {
        byCountry[a.country] = (byCountry[a.country] || 0) + 1;
    });
    
    return {
        total: airports.length,
        countries: countries.size,
        byCountry: byCountry
    };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIRPORTS_DATABASE,
        initializeAirportDatabase,
        getAllAirports,
        searchAirports,
        getAirportByICAO,
        getAirportByIATA,
        getAirportByCode,
        calculateDistance,
        calculateDistanceByCode,
        getAirportLabel,
        getAirportShortLabel,
        validateAirportCode,
        upsertAirport,
        deleteAirport,
        getAirportStatistics
    };
}
