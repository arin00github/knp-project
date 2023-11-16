import React, { useCallback, useEffect, useState } from "react";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import styled from "styled-components";

import { NewTmsKnpNoticeInterface } from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeApi";
import { GetSituationNoticeFile } from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import { base64ToImageSrc } from "../../../../../services/utils";
import {
    StyledDialogBody,
    StyledDialogHeader,
    StyledDialogWrapper,
} from "../../../../../styles/components/Dialog.styles";
import { LoadingSpinner } from "../../../common";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledImageCarouselWrap = styled.div`
    position: relative;
    height: 450px;
`;
export const StyledImageCarouselLoading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
`;

interface ImageCarouselDialogProps {
    fileImageInfoList: GetSituationNoticeFile[];
    isOpen: boolean;
    onClose: () => void;
}

export const ImageCarouselDialog = (props: ImageCarouselDialogProps) => {
    const { fileImageInfoList, isOpen, onClose } = props;

    const [images, setImages] = useState<ReactImageGalleryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @name downloadSituationNoticeFile
     * @function
     * @description 상황 전파 or 대응 SOP 파일 다운로드 요청
     */
    const downloadSituationNoticeFile = useCallback(async (fileId): Promise<File> => {
        const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
        const downloadNoticeFileRes = await tmsKnpNoticeService.downloadSituationNoticeFile({
            situation_file_uuid: fileId,
        });
        return new Promise((resolve, reject) => {
            if (downloadNoticeFileRes) {
                resolve(downloadNoticeFileRes as File);
            } else {
                reject();
            }
        });
    }, []);

    const handleThumbnailClick = useCallback(
        (index: number) => {
            const _images = [...images];
            const fileId = _images[index].originalAlt;
            if (fileId) {
                downloadSituationNoticeFile(fileId).then((downloadNoticeRes) => {
                    _images[index].original = URL.createObjectURL(downloadNoticeRes);
                    (_images[index].originalAlt = ""), setImages(_images);
                });
            }
        },
        [downloadSituationNoticeFile, images]
    );

    useEffect(() => {
        if (isOpen) {
            if (fileImageInfoList && fileImageInfoList.length > 0) {
                const newImages: ReactImageGalleryItem[] = fileImageInfoList.map((fileInfo) => ({
                    original: base64ToImageSrc(fileInfo.situation_file_preview_data),
                    originalAlt: fileInfo.situation_file_uuid,
                    originalHeight: 340,
                    thumbnail: base64ToImageSrc(fileInfo.situation_file_preview_data),
                    thumbnailHeight: 100,
                }));
                const fileId = fileImageInfoList[0].situation_file_uuid;
                downloadSituationNoticeFile(fileId).then((downloadNoticeRes) => {
                    newImages[0].original = URL.createObjectURL(downloadNoticeRes);
                    newImages[0].originalAlt = "";
                    setImages(newImages);
                });
            }
        } else {
            setImages([]);
            setLoading(true);
        }
    }, [downloadSituationNoticeFile, fileImageInfoList, isOpen]);

    /**
     * @name handleCloseButtonClick
     * @function
     * @description 닫기 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleCloseButtonClick = useCallback(() => {
        onClose();
    }, [onClose]);
    return (
        <StyledDialogWrapper isOpen={isOpen} onClose={handleCloseButtonClick} size="lg">
            <StyledDialogHeader>이미지</StyledDialogHeader>
            <StyledDialogBody style={{ position: "relative" }}>
                <StyledImageCarouselWrap>
                    <ImageGallery
                        items={images}
                        infinite={false}
                        lazyLoad={true}
                        showNav={false}
                        showIndex={true}
                        showPlayButton={false}
                        onImageLoad={() => {
                            setLoading(false);
                        }}
                        onThumbnailClick={(e, index) => {
                            handleThumbnailClick(index);
                        }}
                    />
                </StyledImageCarouselWrap>
                {loading && (
                    <StyledImageCarouselLoading>
                        <LoadingSpinner />
                    </StyledImageCarouselLoading>
                )}
            </StyledDialogBody>
        </StyledDialogWrapper>
    );
};
