/**
 * @name isBase64
 * @function
 * @description 데이터 URL 이 base64 인코딩 문자열인지 확인
 * @param {string} url 데이터 URL
 * @return {boolean}
 */
export const isBase64 = (url: string): boolean => {
    return url.includes("base64");
};

/**
 * @name base64MimeType
 * @function
 * @description base64 인코딩 문자열의 mime 타입을 반환
 * @param {string} encoded base64 인코딩 문자열
 * @return {string}
 */
export const base64MimeType = (encoded: string): string => {
    let result = "image/png";
    const mime = encoded.match(/data:([a-zA-Z\d]+\/[a-zA-Z\d-.+]+).*,.*/);
    if (mime && mime.length) {
        result = mime[1];
    }
    return result;
};

/**
 * @name dataURLtoFile
 * @async
 * @function
 * @description 데이터 URL 조회 결과를 파일로 변환
 * @param {string} url 데이터 URL
 * @return {Promise<File | null>}
 */
export const dataURLtoFile = async (url: string): Promise<File | null> => {
    if (!isBase64(url)) {
        return null;
    }

    const res: Response = await fetch(url);
    const blob: Blob = await res.blob();
    const fileName = "image.png";
    const mimeType = base64MimeType(url);
    return new File([blob], fileName, { type: mimeType });
};

/**
 * @name base64ToImageSrc
 * @function
 * @description base64 문자열을 img 요소의 src 속성 타입으로 변환
 * @param {string} base64String base64 문자열
 * @return {string}
 */
export const base64ToImageSrc = (base64String: string): string => {
    return `data:image/png;base64,${base64String}`;
};
