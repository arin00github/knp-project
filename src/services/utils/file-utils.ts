import { AxiosResponse } from "axios";

export const utf8ToBase64 = (utf8String: string): string => {
    return window.btoa(window.unescape(encodeURIComponent(utf8String)));
};

export const base64ToUtf8 = (base64String: string): string => {
    return decodeURIComponent(window.escape(window.atob(base64String)));
};

export const downloadFileWithBase64FileName = (response: AxiosResponse): void => {
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    const contentDisposition = response.headers["content-disposition"]; // 파일 이름
    let fileName = "unknown";
    if (contentDisposition) {
        const [fileNameMatch] = contentDisposition.split(";").filter((str) => str.includes("filename"));
        if (fileNameMatch) {
            const base64FileName = fileNameMatch.split('"')[1];
            fileName = base64ToUtf8(base64FileName);
        }
    }

    link.href = url;
    link.setAttribute("download", `${fileName}`);
    link.style.cssText = "display:none";
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const downloadFile = (response: AxiosResponse): void => {
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    const contentDisposition = response.headers["content-disposition"]; // 파일 이름
    let fileName = "unknown";
    if (contentDisposition) {
        const [fileNameMatch] = contentDisposition.split(";").filter((str) => str.includes("filename"));
        if (fileNameMatch) [, fileName] = fileNameMatch.split('"');
    }

    link.href = url;
    link.setAttribute("download", `${fileName}`);
    link.style.cssText = "display:none";
    document.body.appendChild(link);
    link.click();
    link.remove();
};
