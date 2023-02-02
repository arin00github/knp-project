/**
 * @name checkCommonPassword
 * @function
 * @description 문자,숫자,특수기호가 혼합된 9자리 이상으로 조합되어야 함
 * @param {string} str 확인 대상 문자열
 * @return {boolean}
 */
export const checkCommonPassword = (str: string): boolean => {
    const reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{9,}$/);
    return reg.exec(str) !== null;
};

/**
 * @name checkWithIDPassword
 * @function
 * @description 아이디를 포함할 수 없음
 * @param {string} str 확인 대상 문자열
 * @param {string} id 사용자 아이디
 * @return {boolean}
 */
export const checkWithIDPassword = (str: string, id: string): boolean => {
    if (!str.trim()) {
        return false;
    }
    if (!id.trim()) {
        return false;
    }
    return str.indexOf(id) === -1;
};

/**
 * @name checkContinuePassword
 * @function
 * @description 3자 이상 연속된 문자는 패스워드에 사용할 수 없음
 * @param {string} str 확인 대상 문자열
 * @param {number} max 최대 연속가능 회수
 * @return {boolean}
 */
export const checkContinuePassword = (str: string, max = 3): boolean => {
    if (!str.trim()) {
        return false;
    }

    const chrStr = str.split("").map((v) => v.charCodeAt(0));
    let preChr = -1;
    let chrCnt = 1;

    for (let i = 0, e = chrStr.length; i < e; i++) {
        if (i !== 0) {
            // 첫번째 문자는 무시
            if (preChr - chrStr[i] === 0) {
                chrCnt++;
            } else {
                chrCnt = 1;
            }
        }
        preChr = chrStr[i];
        if (chrCnt >= max) {
            return false;
        }
    }
    return true;
};

/**
 * @name checkOrderingPassword
 * @function
 * @description 3자 이상 연속된 문자는 (오름차순, 내림차순) 패스워드에 사용할 수 없음
 * @param {string} str 확인 대상 문자열
 * @param {number} max 최대 연속가능 회수
 * @return {boolean}
 */
export const checkOrderingPassword = (str: string, max = 3): boolean => {
    if (!str.trim()) {
        return false;
    }

    const chrStr = str.split("").map((v) => v.charCodeAt(0));
    let preChr = -1;
    let chrCnt = 0;
    let order = "";
    for (let i = 0, e = chrStr.length; i < e; i++) {
        if (i !== 0) {
            // 첫번째 문자는 무시
            if (preChr - chrStr[i] === 1) {
                if (order !== "ASC") {
                    order = "ASC";
                    chrCnt = 2;
                } else {
                    chrCnt++;
                }
            } else if (chrStr[i] - preChr === 1) {
                if (order !== "DESC") {
                    order = "DESC";
                    chrCnt = 2;
                } else {
                    chrCnt++;
                }
            } else {
                order = "";
                chrCnt = 0;
            }
        }
        preChr = chrStr[i];
        if (chrCnt >= max) {
            return false;
        }
    }
    return true;
};
