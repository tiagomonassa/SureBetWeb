const BOOKMAKER_URLS = {

    "1xbet": "https://1xbet.com",

    "888sport": "https://www.888sport.com",

    "betonline.ag": "https://www.betonline.ag",

    "betclic": "https://www.betclic.fr",

    "betfair": "https://www.betfair.com",

    "betsson": "https://www.betsson.com",

    "codere": "https://www.codere.it",

    "coolbet": "https://www.coolbet.com",

    "everygame": "https://www.everygame.eu",

    "leovegas": "https://www.leovegas.com",

    "marathon": "https://www.marathonbet.com",

    "nordic bet": "https://www.nordicbet.com",

    "pmu": "https://paris-sportifs.pmu.fr",

    "pinnacle": "https://www.pinnacle.com",

    "tipico": "https://www.tipico.com",

    "unibet": "https://www.unibet.com",

    "william hill": "https://www.williamhill.com",

    "winamax": "https://www.winamax.fr",

    // casas comuns no Brasil

    "betano": "https://www.betano.com",

    "bet365": "https://www.bet365.com",

    "superbet": "https://www.superbet.com",

    "sportingbet": "https://www.sportingbet.com",

    "kto": "https://www.kto.com",

    "novibet": "https://www.novibet.com",

    "estrelabet": "https://www.estrelabet.com"

};



export function obterLinkBookmaker(nome) {


    if(!nome)

        return null;



    const nomeNormalizado = nome

        .toLowerCase()

        .trim();



    for(const chave in BOOKMAKER_URLS){


        if(nomeNormalizado.includes(chave)){


            return BOOKMAKER_URLS[chave];

        }


    }



    return null;


}