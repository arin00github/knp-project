/**
 * 다국어 설정 파일
 * @file src/i18n/i18n.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-10-14, 최초 작성
 */
import i18n from "i18next";
import moment from "moment";
import { initReactI18next } from "react-i18next";

import TranslationEn from "./translation.en.json";
import TranslationKo from "./translation.ko.json";

const resource = {
    en: {
        translations: TranslationEn,
    },
    ko: {
        translations: TranslationKo,
    },
};

i18n.use(initReactI18next).init({
    resources: resource,
    // 초기 설정 언어
    lng: sessionStorage.getItem("currentLang") || "ko", // 기본 언어
    fallbackLng: "ko", // detected lng이 불가능 할때 en을 사용하겠다.
    debug: true,
    defaultNS: "translations", // 'messages.welcome' 와 같은 키 형식의 form을 사용할지 여부
    ns: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

i18n.on("languageChanged", (lng) => {
    moment.locale(lng.toLowerCase());
});

export default i18n;
