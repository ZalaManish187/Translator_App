const countries = {
  "af": "Afrikaans",
  "sq": "Albanian",
  "am": "Amharic",
  "ar": "Arabic",
  "hy": "Armenian",
  "az": "Azerbaijani",
  "eu": "Basque",
  "be": "Belarusian",
  "bn": "Bengali",
  "bs": "Bosnian",
  "bg": "Bulgarian",
  "ca": "Catalan",
  "ceb": "Cebuano",
  "ny": "Chichewa",
  "zh": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  "co": "Corsican",
  "hr": "Croatian",
  "cs": "Czech",
  "da": "Danish",
  "nl": "Dutch",
  "en": "English",
  "eo": "Esperanto",
  "et": "Estonian",
  "tl": "Filipino",
  "fi": "Finnish",
  "fr": "French",
  "fy": "Frisian",
  "gl": "Galician",
  "ka": "Georgian",
  "de": "German",
  "el": "Greek",
  "gu": "Gujarati",
  "ht": "Haitian Creole",
  "ha": "Hausa",
  "haw": "Hawaiian",
  "iw": "Hebrew",
  "hi": "Hindi",
  "hmn": "Hmong",
  "hu": "Hungarian",
  "is": "Icelandic",
  "ig": "Igbo",
  "id": "Indonesian",
  "ga": "Irish",
  "it": "Italian",
  "ja": "Japanese",
  "jw": "Javanese",
  "kn": "Kannada",
  "kk": "Kazakh",
  "km": "Khmer",
  "ko": "Korean",
  "ku": "Kurdish (Kurmanji)",
  "ky": "Kyrgyz",
  "lo": "Lao",
  "la": "Latin",
  "lv": "Latvian",
  "lt": "Lithuanian",
  "lb": "Luxembourgish",
  "mk": "Macedonian",
  "mg": "Malagasy",
  "ms": "Malay",
  "ml": "Malayalam",
  "mt": "Maltese",
  "mi": "Maori",
  "mr": "Marathi",
  "mn": "Mongolian",
  "my": "Myanmar (Burmese)",
  "ne": "Nepali",
  "no": "Norwegian",
  "ps": "Pashto",
  "fa": "Persian",
  "pl": "Polish",
  "pt": "Portuguese",
  "pa": "Punjabi",
  "ro": "Romanian",
  "ru": "Russian",
  "sm": "Samoan",
  "gd": "Scots Gaelic",
  "sr": "Serbian",
  "st": "Sesotho",
  "sn": "Shona",
  "sd": "Sindhi",
  "si": "Sinhala",
  "sk": "Slovak",
  "sl": "Slovenian",
  "so": "Somali",
  "es": "Spanish",
  "su": "Sundanese",
  "sw": "Swahili",
  "sv": "Swedish",
  "tg": "Tajik",
  "ta": "Tamil",
  "te": "Telugu",
  "th": "Thai",
  "tr": "Turkish",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "ug": "Uyghur",
  "uz": "Uzbek",
  "vi": "Vietnamese",
  "cy": "Welsh",
  "xh": "Xhosa",
  "yi": "Yiddish",
  "yo": "Yoruba",
  "zu": "Zulu",
};



const selectTag = document.querySelectorAll("select");




selectTag.forEach( (tag , id) => {
    for (const country_code in countries){
        
        console.log(countries[country_code]);
        let option = document.createElement('option');
        option.value = country_code;
        option.textContent = countries[country_code];
        if((id == 0 && country_code == "en") || (id == 1 && country_code == "hi")){
            option.selected = true;
        }
        tag.appendChild(option);
    }
});

const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".To-Text");
const exchange = document.getElementById("exchangeIcon");
exchange.addEventListener("click",()=>{
    let tempText = fromText.value;
   let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})



translateBtn.addEventListener("click",() =>{
    let text = fromText.value;
    if(!text)return 0;
   
   let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    console.log(text, translateFrom, translateTo);

    let api_url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    async function getText(api_url) {
        const response = await fetch (api_url);
        const data = await response.json();
        toText.value = data.responseData.translatedText;

        console.log(data);
    }

    getText(api_url)
});
const icons = document.querySelectorAll("i");


icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
                alert("copy text");
            }
            else{
                navigator.clipboard.writeText(toText.value);


            }
        }
        else{

            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);

            }
            speechSynthesis.speak(utterance);
        }
    })
})
